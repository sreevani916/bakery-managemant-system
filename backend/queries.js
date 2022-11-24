const Pool = require('pg').Pool
const pool = new Pool({
  user: 'adate',
  host: 'localhost',
  database: 'adate',
  password: '123',
  port: 5432,
})
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

const genrateOrderId = (request, response) => {
  pool.query('SELECT orderid FROM orders ORDER BY orderId DESC LIMIT 1', (error, results) => {
    if (error) {
      throw error
    }
    const newOrderId = results && results.rows[0] && (parseInt(results.rows[0].orderid) + 1) || 1
    response.status(200).json(newOrderId)
  })
}

const genrateCustomerId = (request, response) => {
  pool.query('SELECT custid FROM customer ORDER BY custid DESC LIMIT 1', (error, results) => {
    if (error) {
      response.status(201).json('Customer ID not found')
      // throw error
    }
    const newCustomerId = results && results.rows[0] && (parseInt(results.rows[0].custid) + 1) || 1
    response.status(200).json(newCustomerId)
  })
}

const deleteCustomerById = (request, response) => {

  const custid = request.body.custid;

  pool.query('delete FROM customer WHERE custid = $1', [custid], (error, results) => {
    if (error) {
      response.status(201).json({ 'process': false, message: `Something went wrong` });
      throw error
    }
    response.status(200).json({ 'process': true, message: `Data deleted of id ${custid}` })
  })
}

const deleteOrderById = (request, response) => {
  const orderid = request.body.orderid;
  pool.query('delete FROM  orders WHERE orderid = $1', [orderid], (error, results) => {
    if (error) {
      response.status(201).json({ 'process': false, message: `Something went wrong` });
      throw error
    }
    response.status(200).json({ 'process': true, message: `Data deleted of id ${orderid}` })
  })
}

const addCustomer = (request, response) => {
  const { Custid, custFirstName, custSecondName, custEmail, custPhone, custAddress } = request.body
  const checkData = new Promise((res, rej) => {
    pool.query('select exists(select 1 from customer where custid = $1)', [Custid], (error, results) => {
      if (error) {
        rej(false)
        throw error
      }
      res(results.rows[0].exists)
    });
  })
  checkData.then(data => {
    if (data) {
      response.status(201).json({ 'process': false, message: 'duplicate' })
    } else {
      pool.query('INSERT INTO customer (Custid, custFirstName, custSecondName ,custEmail, custPhone, custAddress) VALUES ($1, $2, $3, $4, $5, $6)', [Custid, custFirstName, custSecondName, custEmail, custPhone, custAddress], (error, results) => {
        if (error) {
          response.status(200).send({ 'process': false, message: 'something went wrong' })
          throw error
        }
        response.status(200).send({ 'process': true, message: `Customer added with ID: ${Custid}` })
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

const addOrder = async (request, response) => {
  response.status({ 'process': true })
  const { Custid, orderId, Ordername, Orderprice, orderDate, deliveryDate } = request.body
  const checkData = new Promise((res, rej) => {
    pool.query('select exists(select 1 from orders where orderid = $1)', [orderId], (error, results) => {
      if (error) {
        rej(false)
        throw error
      }
      res(results.rows[0].exists)
    });
  })

  checkData.then(data => {
    if (data) {
      response.status(201).json({ 'process': false, message: 'duplicate' })
    } else {
      pool.query('INSERT INTO orders (Custid, orderId, Ordername ,Orderprice, orderDate, deliveryDate) VALUES ($1, $2, $3, $4, $5, $6)', [Custid, orderId, Ordername, Orderprice, orderDate, deliveryDate], (error, results) => {
        if (error) {
          response.status(200).send({ 'process': false, message: 'something went wrong' })
          throw error
        }
        response.status(200).send({ 'process': true, message: `orders added with customer ID: ${Custid}` })
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

const addExpense = (request, response) => {
  const { expense_type, amount, expenseDate } = request.body

  pool.query('INSERT INTO expense (expense_type, amount, expenseDate) VALUES ($1, $2, $3)', [expense_type, amount, expenseDate], (error, results) => {
    if (error) {
      response.status(201).send({ 'process': false, message: 'something went wrong' })
      throw error
    }
    response.status(200).send({ 'process': true, message: `expenses added with expense_type: ${expense_type}` })
  })
}

const getAllExpense = (request, response) => {
  pool.query('SELECT * FROM expense ORDER BY expense_type ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getAllCustomers,
  getAllOrders,
  deleteCustomerById,
  deleteOrderById,
  addOrder,
  addCustomer,
  addExpense,
  getAllExpense,
  genrateOrderId,
  genrateCustomerId
}
