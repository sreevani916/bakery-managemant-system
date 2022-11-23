const getOrders = async () => {
    const response = await fetch('http://localhost:3000/getAllOrders');
    const orders = await response.json();
    return orders;
}

const getcustomers = async () => {
    const response = await fetch('http://localhost:3000/getAllCustomers');
    const customers = await response.json();
    console.log(customers)
}


const addOrders = async () => {
    const addOrders = await fetch('http://localhost:3000/addOrders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Custid": "8265",
            "orderId": "2342r",
            "Ordername": "abcd",
            "Orderprice": "abcd",
            "orderDate": "12-12-2022",
            "deliveryDate": "12-12-2022"
        })
    }).then(data=> {
        if(data['status']==201){
            console.log('duplicate')
        }else{
            console.log('order added')
        }
    }).catch(err => console.log(err));
}

const addCustomer = async () => {
     const addCustomer = await fetch('http://localhost:3000/addCustomers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Custid": "26tv",
            "custFirstName": "pqer",
            "custSecondName": "fghj",
            "custEmail": "ghjk",
            "custPhone": "1232334222",
            "custAddress": "bhjk"

        })
    }).then(data=> {
        if(data['status']==201){
            console.log('duplicate')
        }else{
            console.log('customer added')
        }
    }).catch(err => console.log(err));
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
    }).then(data=>{
        if (data['status']==200) {
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
    }).then(data=>{
        if (data['status']) {
            console.log('Data deleted')
        } else {
            console.log('duplicate value')
        }
    }).catch(err => console.log(err));
}