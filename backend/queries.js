const Pool = require('pg').Pool
const pool = new Pool({
  user: 'adate',
  host: 'localhost',
  database: 'adate',
  password: '123',
  port: 5432,
})

// const query = `
// CREATE TABLE entity (
//     id int,
//     entity varchar,
//     details varchar    
// );
// `;

// pool.query(query, (err, res) => {
//   if (err) {
//       console.error(err);
//       return;
//   }
//   console.log('Table is successfully created');  
// });

const getAllCustomers = (request, response) => {
  pool.query('SELECT * FROM customer ORDER BY Custid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAllOrders = (request, response) => {
  pool.query('SELECT * FROM ORDERS ORDER BY orderId ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deleteCustomerById = (request, response) => {

  const custid = request.body.custid;
  console.log(custid)

  pool.query('delete FROM customer WHERE custid = $1', [custid], (error, results) => {
    if (error) {
      response.status(200).json({ 'process': false, message: `Something went wrong` });
      throw error
    }
    response.status(200).json({ 'process': true, message: `Data deleted of id ${custid}` })
  })
}

const deleteOrderById = (request, response) => {
  const orderid = request.body.orderid;
  pool.query('delete FROM  orders WHERE orderid = $1', [orderid], (error, results) => {
    if (error) {
      response.status(200).json({ 'process': false, message: `Something went wrong` });
      throw error
    }
    response.status(200).json({ 'process': true, message: `Data deleted of id ${orderid}` })
  })
}

const addCustomer = (request, response) => {
  // console.log(request.body)
  const { Custid, custFirstName, custSecondName, custEmail, custPhone, custAddress } = request.body
  pool.query('select exists(select 1 from customer where custid = $1)', [Custid], (error, results) => {
    if (error) {
      throw error
    }
    // console.log(results.rows[0].exists)
    if (results.rows[0].exists) {
      response.status(200).json({ 'process': false, message: 'duplicate' })
    } else {
      pool.query('INSERT INTO customer (Custid, custFirstName, custSecondName ,custEmail, custPhone, custAddress) VALUES ($1, $2, $3, $4, $5, $6)', [Custid, custFirstName, custSecondName, custEmail, custPhone, custAddress], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send({ 'process': true, message: `Customer added with ID: ${Custid}` })
      })
    }
  })

  // return
  // pool.query('INSERT INTO customer (Custid, custFirstName, custSecondName ,custEmail, custPhone, custAddress) VALUES ($1, $2, $3, $4, $5, $6)', [Custid, custFirstName, custSecondName, custEmail, custPhone, custAddress], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   response.status(200).send(`Customer added with ID: ${Custid}`)
  // })
}

const addOrder = (request, response) => {
  const { Custid, orderId, Ordername, Orderprice, orderDate, deliveryDate } = request.body
  pool.query('select exists(select 1 from orders where orderid = $1)', [orderId], (error, results) => {
    if (error) {
      throw error
    }
    // console.log(results.rows[0].exists)
    if (results.rows[0].exists) {
      response.status(200).json({ 'process': false, message: 'duplicate' })
    } else {
      pool.query('INSERT INTO orders (Custid, orderId, Ordername ,Orderprice, orderDate, deliveryDate) VALUES ($1, $2, $3, $4, $5, $6)', [Custid, orderId, Ordername, Orderprice, orderDate, deliveryDate], (error, results) => {
        if (error) {
          response.status(200).send({ 'process': false, message: 'something went wrong' })
          throw error
        }
        response.status(200).send({ 'process': true, message: `orders added with customer ID: ${Custid}` })
      })
    }
  })
}

const addExpense = (request, response) => {
  const { expense_type, amount, expenseDate } = request.body

  pool.query('INSERT INTO expense (expense_type, amount, expenseDate) VALUES ($1, $2, $3)', [expense_type, amount, expenseDate], (error, results) => {
    if (error) {
      response.status(200).send({ 'process': false, message: 'something went wrong' })
      throw error
    }
    response.status(201).send({ 'process': true, message: `expenses added with expense_type: ${expense_type}` })
  })
}


module.exports = {
  getAllCustomers,
  getAllOrders,
  deleteCustomerById,
  deleteOrderById,
  addOrder,
  addCustomer,
  addExpense
  // updateUser,
  // deleteUser,
}
