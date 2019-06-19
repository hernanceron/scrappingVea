var request = require('./scrapping');
var pagina = require('./paginaHandler');
var json2xls = require('json2xls');
var aws = require('aws-sdk');

var s3 = new aws.S3();

const BUCKET_NAME = process.env.BUCKET_NAME;

function putS3File(file,bucket, key) {
    var base64data = new Buffer(file,'binary');
    var params = {
        Body: base64data, 
        Bucket: bucket, 
        Key: key
       };
    s3.putObject(params, function(err, data) {
        if (err) console.log(err); // an error occurred
        else     console.log("Se cargo") ;         // successful response      
    });
}

async function cargarProductos() {
    var arrProductos = [];
    let rutas = await request.scrapeRutas();

    for (let index = 0; index < rutas.length; index++) {
        const rutaProducto = rutas[index];
        let producto = await pagina.readProductos(rutaProducto);
        arrProductos.push(producto);      
    }

    let fecha = new Date();
    let nomFile = fecha.getFullYear().toString() + (fecha.getMonth()+1).toString().padStart(2,0) + fecha.getDate().toString().padStart(2,0);
    
    var xls = json2xls(arrProductos);
    nomFile = nomFile + '-vea.xlsx';
    putS3File(xls,BUCKET_NAME,nomFile);

}

exports.handler = function(event, context, callback) {
    cargarProductos();
}