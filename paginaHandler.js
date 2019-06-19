'use strict'
var request = require('request');
var cheerio = require('cheerio');

async function readProductos(ruta ) {
  //console.log("Antes de iniciar");
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
        let strFecha = fecha.getFullYear().toString() + (fecha.getMonth()+1).toString().padStart(2,0) + fecha.getDate().toString().padStart(2,0);
        var obj = {fecha:strFecha,nombreProducto: nombreProducto, codigo: codigoProducto, marca: marca, rutaImagen : imagen,
                   precio : precioRegular, precioOferta: precioOnline};    
        console.log(JSON.stringify(obj));
        resolve(obj);
      }
    });
  });
}
module.exports = {
  readProductos
}

//readProductos("https://www.plazavea.com.pe/panal-para-bebe-bambo-nature-talla-rn/p");