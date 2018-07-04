window.addEventListener('load', init);
var counter;
var id;
var isRunFlag;
var loginID;

function init() {

    bindEvents();
    localStorage.loginFlag = false;
    localStorage.adminLoginFlag = false;
    // console.log('gg')
    // console.log(document.querySelector('#admin-toggle'));
}

function bindEvents() {

    document.querySelector('#adminLoginButton').addEventListener('click', loginAdmin);
    document.querySelector('#createAccountButton').addEventListener('click', addUser);
    document.querySelector('#loginButton').addEventListener('click', loginUser);
    userBindEvents();
    adminInit();
}

function loginAdmin() {
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    adminOperations.adminLogin(username, password);
    if (localStorage.loginFlag) {
        console.log('login successful');
    } else {
        console.log('login failed')
    }
}


const countIncrease = () => {
    id = counter.next().value;
    // console.log(id);
    productOperations.setId(loginID, id);
    document.querySelector('#itemID').innerText = id;
}

function addUser() {
    var name = document.querySelector('#name').value;
    var username = document.querySelector('#usernameCreateAccount').value;
    var password = document.querySelector('#passwordCreateAccount').value;
    var age = document.querySelector('#age').value;
    var address = document.querySelector('#address').value;
    var pincode = document.querySelector('#pincode').value;
    var phoneNumber = document.querySelector('#phoneNumber').value;

    var userObject = new User(username, password, name, age, address, pincode, phoneNumber);
    userOperations.addUser(userObject);
}

function loginUser() {
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    userOperations.loginUser(username, password);
    if (localStorage.loginFlag) {
        console.log('login successful');
    } else {
        console.log('login failed')
    }
}

function add() {
    isRunFlag = true;
    var name = document.querySelector('#name').value;
    var price = document.querySelector('#price').value;
    var url = document.querySelector('#url').value;
    var productObject = new Product(id, name, price, url);
    productOperations.addProducts(loginID, productObject);
    printObject();
    countIncrease();
}

function printObject() {
    document.querySelector('#itemTable').innerHTML = "";

    var pr = productOperations.searchAll(loginID);
    pr.then(products => {
        // console.log(products);   
        itemTable = document.querySelector('#itemTable');
        for (let mainKey in products) {
            // var gg = product;
            var product = products[mainKey];
            var tr = itemTable.insertRow();
            // if (!isRunFlag) {
            //     // countIncrease();
            // }
            let buttonFlag = false;
            let i = 0;
            for (let key in product) {
                tr.insertCell(i).innerText = product[key];
                i++;
                buttonFlag = true;
            }
            // console.log(createOperation());
            if (buttonFlag) {
                let gg = tr.insertCell();
                gg.appendChild(createOperation(product.id));
            }
            // console.log('gg', gg)

        }
    })


}

function createOperation(id) {
    var button = document.createElement('button');
    button.className = 'btn btn-danger fa fa-close';
    button.addEventListener('click', deleteEntry);
    button.setAttribute('pid', id);
    // button.innerHTML= '<i class="fa fa-close" aria-hidden="true"></i>';
    // console.log(button);
    return button;
}

function deleteEntry() {
    var id = this.getAttribute("pid");
    productOperations.delete(loginID, id);
    // console.log('id is ', id);
    // isRunFlag=false;
    printObject();
}