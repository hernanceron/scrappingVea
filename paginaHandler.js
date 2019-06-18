'use strict'
var request = require('request');
var cheerio = require('cheerio');

async function readProductos(ruta ) {
  return new Promise(function(resolve,reject){
    request(ruta, function(err, resp, html) {
      if (!err){
        const $ = cheerio.load(html);
        var nombreProducto = $('.g-nombre-prod div').text();
        var marca = $('.g-brand-prod div a.brand').html();
        var codigoProducto = $('.g-code-prod div').text();
        var precioRegular = $('strong.skuListPrice').html();
        var precioOnline = $('strong.skuBestPrice').html();
        var imagen = $('#image-main').attr("src");
        let fecha = new Date();
        let strFecha = fecha.getFullYear().toString() + (fecha.getMonth()+1).toString() + fecha.getDate().toString();
        var obj = {fecha:strFecha,nombreProducto: nombreProducto, codigo: codigoProducto, marca: marca, rutaImagen : imagen,
                   precio : precioRegular, precioOferta: precioOnline};    
       
        resolve(obj);
      }
    });
  });
}
module.exports = {
  readProductos
}

//readProductos("https://www.plazavea.com.pe/panales-para-bebe-huggies-natural-care-talla-xg-paquete-42un/p");