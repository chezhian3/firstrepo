const mysql = require('mysql');
const excel = require('exceljs');
const { query } = require('express');

// Create a connection to the database
const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: '',
 database: 'test'
});


db.connect((err) => {
	if (err) throw err;
    

	db.query("SELECT * FROM customer WHERE name!='muthu'", function (err, customer, fields) {
        
		const jsoncustomers = JSON.parse(JSON.stringify(customer));
        
        
		console.log(jsoncustomers);
        
		
		let workbook = new excel.Workbook(); 
		let worksheet = workbook.addWorksheet('customers'); 
	 
	
		worksheet.columns = [
			{ header: 'Id', key: 'id', width: 10 },
			{ header: 'Address', key: 'address', width: 30 },
			{ header: 'Name', key: 'name', width: 30},
			{ header: 'age', key: 'age', width: 10,outlineLevel: 1},
		
		];
	 
		
		worksheet.addRows(jsoncustomers);
	 
		
		workbook.xlsx.writeFile("export2.xlsx")
		.then(function() {
			console.log("success");
		});
		
		
		db.end(function(err) {
		  if (err) {
			return console.log('error:' + err.message);
		  }
		  console.log('data base uploading');
		});
		
		
	});
});