window.addEventListener('load', init);
var counter;
var id;
var isRunFlag;
var loginID;
var carouselActiveFlag;

function init() {

    bindEvents();
    localStorage.loginFlag = false;
    localStorage.adminLoginFlag = false;
    carouselActiveFlag = false;
    printBanner();
    createCarousel();
    // console.log('gg')
    // console.log(document.querySelector('#admin-toggle'));
}

function bindEvents() {

    document.querySelector('#adminLoginButton').addEventListener('click', loginAdmin);
    document.querySelector('#createAccountButton').addEventListener('click', addUser);
    document.querySelector('#loginButton').addEventListener('click', loginUser);
    userBindEvents();
    // adminInit();
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
function printBanner(){
    var pr = adminOperations.getBanner();
    pr.then(bannerObject=>{
        // bannerObject = data;
        
        document.querySelector('#bannerh1').innerText = bannerObject['h1'];
        document.querySelector('#bannerh61').innerText = bannerObject['h61'];
        document.querySelector('#bannerh62').innerText = bannerObject['h62'];
        document.querySelector('#bannerh63').innerText = bannerObject['h63'];
        var bgImage = bannerObject['backgroundImage']
        document.querySelector('.banner').setAttribute('style',"background-image : url("+bannerObject['backgroundImage']+")!important;");

    })
}


function createCard(productObject) {
    var div1 = `<div class="card">
    <h5 class="card-header">Featured</h5>
    <div style="height: 250px">
        <img class="card-img-top" src="${productObject['image']}" alt="Card image cap">
    </div>
    <div class="card-body">
        <h5 class="card-title">${productObject['name']}</h5>
        <p class="card-text">${productObject['description']}</p>
        <p>₹${productObject['price']}</p>

    </div>    
    <div class="card-body">
        <a href="#" class="card-link btn btn-primary">Buy Now</a>
    </div>
</div>`
    return div1;
}

function createCarousel() {
    var mainContainer = document.querySelector('#carousel-card-container');
    var pr1 = adminOperations.getCarouselItems();
    pr1.then(data => {
        for (let key in data) {
            let productPr = productOperations.searchByID(key);

            if (productPr) {
                productPr.then(product => {
                    let card = createCard(product);
                    let containerDiv = document.createElement('div');
                    containerDiv.className = 'carousel-item col-md-4 ';
                    if (!carouselActiveFlag) {
                        containerDiv.className += 'active';
                        carouselActiveFlag = true;
                    }
                    containerDiv.innerHTML = card;
                    // console.log(containerDiv)
                    mainContainer.appendChild(containerDiv);
                })
            }

        }
    })
}