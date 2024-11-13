const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const db = require('./connection')
const response = require('./response')

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello world kakak')
})

app.get('/mahasiswa', (req, res) => {
    const sql = 'select * from mahasiswa'

    db.query(sql, (err, result) => {
        if (err) {
            response(400, result, 'gagal', res)            
        } else {
            response(200, result, 'ambil seluruh data mahasiswa', res)            
        }
        // res.send(result)
    });
});

app.get('/mahasiswaByProdi/:prodi', (req, res) => {
    //jika filternya berupa teks maka harus dihapit "" sugan aing otomatis string
    const sql = `SELECT * FROM mahasiswa WHERE prodi = "${req.params.prodi}"`

    db.query(sql, (err, result) => {
        if (err) {
            response(400, result, 'gagal', res)            
        } else {
            response(200, result, 'berhasil', res)            
        }
    });
});

app.get('/find/:keyword', (req, res) => {
    const sql= 'select * from mahasiswa where nama like "%'+req.params.keyword+'%"'
    db.query(sql, (err, result) => {
        if (err) {
            response(400, result, 'gagal', res)            
        } else {
            response(200, result, 'berhasil', res)            
        }
    })
})

app.get('/dosen', (req, res) => {
    const sql = 'select * from dosen'
    db.query(sql, (err, result) => {
        if (err) {
            response(400, result, 'gagal', res)            
        } else {
            response(200, result, 'ambil seluruh data dosen', res)            
        }
    });
});


app.get('/mahasiswa/:nim', (req, res) => {
    const sql = `select * from mahasiswa where nim = ${req.params.nim}`
    db.query(sql, (err, result) => {
        if (err) {
            response(400, result, 'gagal', res)            
        } 
        else if (result.length == 0) {
            response(404, result, 'data tidak ditemukan', res)            
        }
        else {
            response(200, result, 'berhasil', res)            
        }
    })
})

app.get('/hello/:nama', (req, res) => {
    const name = req.params.nama
    console.log(`hello ${name}`)
    res.send(`hello ${name}`)
    // res.send('hello world')
})

app.post('/postMahasiswa', (req, res) => {
    const sql = `insert into mahasiswa (nim, nama, prodi) values (${req.body.nim}, '${req.body.nama}', '${req.body.prodi}')`
    db.query(sql, (err, result) => {
        if (err) {
            response(400, result, 'gagal', res)            
        } else {
            response(200, result, 'berhasil', res)            
        }
    })
})

app.delete('/deleteMahasiswaByNim', (req, res) => {
    const sql = `DELETE from mahasiswa where nim = "${req.body.nim}"`
    db.query(sql, (err, result) => {
        if (err) {
            response(400, result, 'gagal', res)            
        } else {
            response(200, result, 'berhasil', res)            
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})