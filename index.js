const express = require('express')
const { post, put } = require('got')
const morgan = require('morgan')
const mysql = require('mysql')

// Initializations
const app = express()

// Settings
app.set('port', process.env.port || 3000)

// Middlewares
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('Home Page ... Hello World!')
})

app.get('/razas', (req, res) => {
    const sql = 'select * from razas'
    connection.query(sql, (err, results) => {
        if(err) throw err
        if(results.length > 0){
            res.json(results)
        }else{
            res.send('Not results')
        }
    })
    //res.send('List of Breeds')
})

app.get('/razas/:id', (req, res) => {
    const {id} = req.params
    const sql = `select * from razas where id_raza = '${id}'`
    connection.query(sql, (err, result) => {
        if(err) throw err
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('Not results!')
        }

    })
    //res.send('Get breed by id')
})

app.post('/add', (req, res) => {
    const {name, power} = req.body
    const sql = 'insert into razas set ?'
    const razaObject = {
        name : name,
        power : power
    }
    connection.query(sql, razaObject, (err) => {
        if(err) throw err
        res.send('Successfully Registered Breed!')
    })
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params
    const {name, power} = req.body
    const sql = `update razas set name = '${name}', power = '${power}' where id_raza = '${id}'`
    connection.query(sql, (err) => {
        if(err) throw err
        res.send(`Successfully Updated Breed! reg= ${id}`)
    })
})

app.delete('/delete/:id', (req, res) => {
    const{id} = req.params
    const sql = `delete from razas where id_raza = '${id}'`
    connection.query(sql, (err) => {
        if(err) throw err
        res.send(`Successfully Removed Breed! reg= ${id}`)
    })
})

// Starting the server
app.listen(app.get('port'), (err) => {
    if(err) throw err
    console.log(`Server on port ${app.get('port')}`)
})

// mysql
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "starcraft"
})

connection.connect(err => {
    if(err) throw err
    console.log('Databse server running!')
})