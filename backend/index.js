const express=require('express');
const bodyParser = require('body-parser')
const { Client } = require('pg');
const client = new Client({
    user: 'test',
    host: 'localhost',
    database: 'test',
    password: '123',
    port: 5432,
});
client.connect(function(err){
  if (err) throw err;
  console.log('connected..');
});

const db = require('./queries')

const app=express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


 app.post('/addCustomers', db.addCustomer)
 app.post('/addOrders',db.addOrder)
 app.post('/addExpenses',db.addExpense)
 app.get('/getAllCustomers',db.getAllCustomers)
 app.get('/getAllOrders',db.getAllOrders)
 app.post('/deleteCustomer',db.deleteCustomerById)
 app.post('/deleteOrders',db.deleteOrderById)
 app.get('/getExpense',db.getAllExpense)
 app.get('/genrateOrderId',db.genrateOrderId)
 app.get('/genrateCustomerId',db.genrateCustomerId)
 app.get('/genrateExpenseId',db.genrateExpenseId)
 app.post('/deleteExpenseById',db.deleteExpenseById)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(3000, () => console.log('listening on port 3000...'));
