var newOrderId;
var newCustomerId;

const getOrders = async () => {
    const response = await fetch('http://localhost:3000/getAllOrders');
    const orders = await response.json();
    return orders;
}

const getcustomers = async () => {
    const response = await fetch('http://localhost:3000/getAllCustomers');
    const customers = await response.json();
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
    const genrateOrderId = await response.json();
    return genrateOrderId;
}

const addOrders = async () => {
    const orderPackage = {
        Custid: $('#customer-name').val(),
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
    const addExpense = await fetch('http://localhost:3000/addExpenses', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "expense_type": "abc",
            "amount": "abc",
            "expenseDate": "12-12-2022"
        })
    }).catch(err => console.log(err));
    const content = await addExpense.json();
    if (content.process) {
        console.log('process done')
    } else {
        console.log('something ')
    }
}

const deleteOrder = async () => {
    const deleteOrder = await fetch('http://localhost:3000/deleteOrders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "orderid": "abcd"
        })
    }).then(data => {
        if (data['status'] == 200) {
            console.log('Data deleted')
        } else {
            console.log('duplicate value')
        }
    }).catch(err => console.log(err));
}

const deleteCustomer = async () => {
    const deleteCustomer = await fetch('http://localhost:3000/deleteCustomer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "custid": "1223"
        })
    }).then(data => {
        if (data['status']) {
            console.log('Data deleted')
        } else {
            console.log('duplicate value')
        }
    }).catch(err => console.log(err));
}


window.addEventListener('load', async function () {
    // console.log( $('customer-first-name'))
    // Autofill details
    newOrderId = await genrateOrderId();
    newCustomerId = await genrateCustomerId();
    $('#order-id').val(newOrderId);
    $('#customer-id').val(newCustomerId);

    if (sessionStorage.getItem('login') !== 'admin') {
        window.location.href = '../login.html';
    }
    if (sessionStorage.getItem('navigate') !== null) {
        $(".iframe_main").attr('src', sessionStorage.getItem('navigate'));
    }

    const getOrderData = await getOrders();

    getOrderData.forEach(e => {
        $('.order-table-fill').append(`<tbody>
    <tr>
        <th scope="row">${e.orderid}</th>
        <td>${e.ordername}</td>
        <td>${e.orderprice}</td>
        <td>${e.custid}</td>
        <td>${formatDate(e.orderdate)}</td>
        <td>

            <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
        </td>
    </tr>
</tbody>`)
    });

    const getCustomerData = await getcustomers();

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

                <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
            </td>
        </tr></tbody>`)
    });

    const getFinanceData = await getFinance();

    getFinanceData.forEach(e => {
        $('.finanse-fill').append(`<tbody>
        <tr>
            <th scope="row">${e.expense_type}</th>
            <td>${e.amount}</td>
            <td>${formatDate(e.expensedate)}</td>
            <td>

                <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
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