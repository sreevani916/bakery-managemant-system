var newOrderId;
var newCustomerId;
var newExpenseId;
var customerMain;

const getOrders = async () => {
    const response = await fetch('http://localhost:3000/getAllOrders');
    const orders = await response.json();
    return orders;
}

const getcustomers = async () => {
    const response = await fetch('http://localhost:3000/getAllCustomers');
    const customers = await response.json();
    customerMain = customers;
    return customers;
}

const getFinance = async () => {
    const response = await fetch('http://localhost:3000/getExpense');
    const customers = await response.json();
    return customers;
}

const genrateOrderId = async () => {
    const response = await fetch('http://localhost:3000/genrateOrderId');
    const genrateOrderId = await response.json();
    return genrateOrderId;
}

const genrateCustomerId = async () => {
    const response = await fetch('http://localhost:3000/genrateCustomerId');
    const genrateCustomerId = await response.json();
    return genrateCustomerId;
}

const genrateExpenseId = async () => {
    const response = await fetch('http://localhost:3000/genrateExpenseId');
    const genrateExpenseId = await response.json();
    return genrateExpenseId;
}


const addOrders = async () => {
    const orderPackage = {
        Custid: $('#customer-name-load').children(":selected").attr("id"),
        orderId: newOrderId.toString(),
        Ordername: $('#order-name').val(),
        Orderprice: $('#order-price').val(),
        orderDate: $('#order-date').val(),
        deliveryDate: $('#delivary-date').val()
    }

    if (orderPackage.Custid && orderPackage.Ordername && orderPackage.Orderprice && orderPackage.orderDate && orderPackage.deliveryDate) {
        const addOrders = await fetch('http://localhost:3000/addOrders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Custid": orderPackage.Custid,
                "orderId": orderPackage.orderId,
                "Ordername": orderPackage.Ordername,
                "Orderprice": orderPackage.Orderprice,
                "orderDate": orderPackage.orderDate,
                "deliveryDate": orderPackage.deliveryDate
            })
        }).then(data => {
            if (data['status'] == 201) {
                prompt('Duplicate entry!')
            } else {
                prompt('Order added successfully!');
                location.reload();
                $('.order-modal').modal('toggle')
            }
        }).catch(err => console.log(err));

    } else {
        prompt('Please fill valid details');
    }

}

const addCustomer = async () => {
    const customerPackage = {
        Custid: newCustomerId.toString(),
        custFirstName: $('#customer-first-name').val(),
        custSecondName: $('#customer-last-name').val(),
        custEmail: $('#customer-email').val(),
        custPhone: $('#customer-phone').val(),
        custAddress: $('#customer-address').val()
    }

    if (customerPackage.custFirstName && customerPackage.custSecondName && customerPackage.custEmail && customerPackage.custPhone && customerPackage.custAddress) {
        const addCustomer = await fetch('http://localhost:3000/addCustomers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Custid": customerPackage.Custid,
                "custFirstName": customerPackage.custFirstName,
                "custSecondName": customerPackage.custSecondName,
                "custEmail": customerPackage.custEmail,
                "custPhone": customerPackage.custPhone,
                "custAddress": customerPackage.custAddress

            })
        }).then(data => {
            if (data['status'] == 201) {
                prompt('Duplicate entry!')
            } else {
                prompt('Customer added successfully!');
                location.reload();
                $('.customer-modal').modal('toggle')
            }
        }).catch(err => console.log(err));
    } else {
        prompt('Please fill valid details');
    }
}

const addExpense = async () => {
    const expensePackage = {
        exp_id: newExpenseId.toString(),
        expense_type: $('#expense-type').val(),
        amount: $('#amount').val(),
        expenseDate: $('#expense-date').val()
    }

    if (expensePackage.expense_type && expensePackage.amount && expensePackage.expenseDate) {
        const addExpense = await fetch('http://localhost:3000/addExpenses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "exp_id": expensePackage.exp_id,
                "expense_type": expensePackage.expense_type,
                "amount": expensePackage.amount,
                "expenseDate": expensePackage.expenseDate
            })
        }).then(data => {
            if (data['status'] == 201) {
                prompt('Duplicate entry!')
            } else {
                prompt('Expense added successfully!');
                location.reload();
                $('.expense-modal').modal('toggle')
            }
        }).catch(err => console.log(err));

    } else {
        prompt('Please fill valid details');
    }

}

function loadCustomerData() {
    const customerMainFinal = customerMain;
    customerMainFinal.forEach(e => {
        $('#customer-name-load').append(`<option id="${e.custid}">${e.custfirstname + ' ' + e.custsecondname}</option>`)
    });
}

const deleteOrder = async (id) => {
    if (confirm('Are you sure you want to delete order ' + id + ' from database')) {
        const deleteOrder = await fetch('http://localhost:3000/deleteOrders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "orderid": id.toString()
            })
        }).then(data => {
            if (data['status'] == 201) {
                prompt('Data has not deleted because of server issue. Please check server connection')
            } else {
                prompt('Data deleted successfully!');
                location.reload();
            }
        }).catch(err => console.log(err));

    }
}

const deleteCustomer = async (id) => {
    if (confirm('Are you sure you want to delete customer ' + id + ' from database')) {
        const deleteCustomer = await fetch('http://localhost:3000/deleteCustomer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "custid": id.toString()
            })
        }).then(data => {
            if (data['status'] == 201) {
                prompt('Data has not deleted because of server issue. Please check server connection')
            } else {
                prompt('Data deleted successfully!');
                location.reload();
            }
        }).catch(err => console.log(err));
    }
}

const deleteExpense = async (id) => {
    if (confirm('Are you sure you want to delete expense ' + id + ' from database')) {
        const deleteCustomer = await fetch('http://localhost:3000/deleteExpenseById', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "exp_id": id.toString()
            })
        }).then(data => {
            if (data['status'] == 201) {
                prompt('Data has not deleted because of server issue. Please check server connection')
            } else {
                prompt('Data deleted successfully!');
                location.reload();
            }
        }).catch(err => console.log(err));
    }
}

window.addEventListener('load', async function () {
    newOrderId = await genrateOrderId();
    newCustomerId = await genrateCustomerId();
    newExpenseId = await genrateExpenseId();
    $('#order-id').val(newOrderId);
    $('#customer-id').val(newCustomerId);
    $('#expense-id').val(newExpenseId);

    if (sessionStorage.getItem('login') !== 'admin') {
        window.location.href = '../login.html';
    }
    if (sessionStorage.getItem('navigate') !== null) {
        $(".iframe_main").attr('src', sessionStorage.getItem('navigate'));
    }

    const getOrderData = await getOrders();
    const getCustomerData = await getcustomers();

    getOrderData.forEach(e => {
        $('.order-table-fill').append(`<tbody>
    <tr>
        <th scope="row">${e.orderid}</th>
        <td>${e.ordername}</td>
        <td>${e.orderprice}</td>
        <td>${getDetailsById(getCustomerData, e.custid) && (getDetailsById(getCustomerData, e.custid).custfirstname + ' ' + getDetailsById(getCustomerData, e.custid).custsecondname) || 'No Name'}</td>
        <td>${formatDate(e.orderdate)}</td>
        <td>
            <button type="button" class="btn btn-danger order-delete-button" id=${e.orderid} onclick='deleteOrder(${e.orderid})'><i class="far fa-trash-alt"></i></button>
        </td>
    </tr>
    </tbody>`)
    });



    getCustomerData.forEach(e => {
        $('.customer-table-fill').append(`<tbody>
        <tr>
            <th scope="row">${e.custid}</th>
            <td>${e.custfirstname}</td>
            <td>${e.custsecondname}</td>
            <td>${e.custemail}</td>
            <td>${e.custphone}</td>
            <td>${e.custaddress}</td>
            <td>

                <button type="button" class="btn btn-danger customer-delete-button" id="${e.custid}" onclick='deleteCustomer(${e.custid})'><i class="far fa-trash-alt"></i></button>
            </td>
        </tr></tbody>`)
    });

    const getFinanceData = await getFinance();

    getFinanceData.forEach(e => {
        $('.finanse-fill').append(`<tbody>
        <tr>
            <th scope="row">${e.exp_id}</th>
            <td>${e.expense_type}</td>
            <td>${e.amount}</td>
            <td>${formatDate(e.expensedate)}</td>
            <td>

                <button type="button" class="btn btn-danger" id="${e.exp_id}" onclick='deleteExpense(${e.exp_id})'><i class="far fa-trash-alt"></i></button>
            </td>
        </tr>
    </tbody>`)
    });


});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function navigate(event) {
    $(".iframe_main").attr('src', event);
    sessionStorage.setItem('navigate', event);
}

function logOut() {
    sessionStorage.clear();
    window.location = '../login.html'
}

function getDetailsById(arr, id) {
    return arr.find(e => e.custid === id);
}