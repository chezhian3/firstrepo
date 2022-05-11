const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')

app.use(express.static("./public"))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
extended: true
}))

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "test"
})
db.connect(function (err) {
if (err) {
return console.error('error: ' + err.message);
}
console.log('Connected to the MySQL server.');
})

const storage = multer.diskStorage({

destination: (req, file, cb) => {
cb(null, __dirname + '/uploads/')},

filename: (req, file, cb) => {
cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
}
});
const upload = multer({storage: storage});

app.get('', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
importExcelData2MySQL(__dirname + '/uploads/' + req.file.filename);
});

function importExcelData2MySQL(filePath){

readXlsxFile(filePath).then((rows) => {
  
do{
    var rowData = rows.shift().map(o => typeof o == 'string' ? "'"+o+"'" : o);
    // if(rowData.indexOf("'praveen'") != -1){
    //     continue;
    // }
let query = 'INSERT INTO customer (`id`, `address`, `name`, `age`) VALUES ('+rowData+');';

db.query(query, (error, response) => {
    if (error) console.log(error);
console.log(response);

});
} while(rows.length > 0);

})
}

app.listen(8080)