var http = require('http');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sql=require("./db");

http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('hello world');
}).listen(8080);


// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", (req, res) => {
    res.json({
        message: "Welcome to web  example ."
    });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

//  route for getting all customers 
app.get("/customers", function(req, res) {
    sql.query("SELECT * FROM customers", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in getting all customers: " + err });
            return;
        }
        console.log("get all customers...");
        res.send(mysqlres);
        return;
    });
});
 
