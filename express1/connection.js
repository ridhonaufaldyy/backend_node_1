const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    // port: 8080,
    user: "root",
    password: "",
    database: "kampus2"
})


module.exports = db