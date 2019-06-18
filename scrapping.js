'use strict'
var request = require('request');
var cheerio = require('cheerio');

var rutas=[];
const rutaPrincipal = process.env.RUTA_PRINCIPAL;
//const rutaPrincipal = "https://www.plazavea.com.pe/cuidado-del-bebe/panales-y-toallitas-humedas/panales-para-bebe";

async function scrapeRutas() {
    return new Promise(function (resolve,reject) {
        request(rutaPrincipal, function(err, resp, html) {
            if (!err){
                const $ = cheerio.load(html);            
                $('.g-img-prod').each(function(i,elem){
                    if($(this).attr('href')){
                        var ruta = $(this).attr('href');
                        console.log(ruta);
                        rutas.push(ruta);
                    }
                });                         
            }
            else
                reject(err);
            resolve(rutas);
        });      
    });
};

module.exports = {
    scrapeRutas
}