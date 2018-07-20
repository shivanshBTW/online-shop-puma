window.addEventListener('load', adminInit);
var counter;
var id;
var isRunFlag;
var loginID;
var carouselActiveFlag;

function adminInit() {
    adminBindEvents();

    isRunFlag = false;
    carouselActiveFlag = false;
    var prom = adminOperations.getId();
    prom.then(data => {
        // counter = autoGen(parseInt(productOperations.get));
        if (data) {
            counter = autoGen(data);
        } else {
            counter = autoGen(1);
        }
        // console.log(counter);
        countIncrease();
    });
    printObject();
    printBanner();
    printCarouselTable();



}

const countIncrease = () => {
    // console.log(    counter.next().value)
    id = counter.next().value;
    // console.log(id);
    adminOperations.setId(id);
    document.querySelector('#itemID').innerText = id;
}


function adminBindEvents() {
    toggleViewAdmin();
    document.querySelector('#admin-toggle').addEventListener('change', toggleViewAdmin);
    // console.log(document.querySelector('#admin-toggle'));
    document.querySelector('#addBtn').addEventListener('click', addProduct);
    document.querySelector('#bannerSubmitButton').addEventListener('click', createBanner);
    document.querySelector('#carouselAddButton').addEventListener('click', addCarouselItem);
}



function toggleViewAdmin() {
    document.querySelectorAll('.admin-operation').forEach((operation) => {
        operation.className = 'admin-operation hide';
    });
    var value = document.querySelector('#admin-toggle').value;
    if (value == 'manageProducts') {
        document.querySelector('#manageProducts').className = 'admin-operation show';
    } else if (value == 'topHeader') {
        document.querySelector('#topHeader').className = 'admin-operation show';
    } else if (value == 'carouselItem') {
        document.querySelector('#carouselItem').className = 'admin-operation show';
    } else if (value == 'featuredCards') {
        document.querySelector('#featuredCards').className = 'admin-operation show';
    }

}



function addProduct() {
    isRunFlag = true;

    var id = document.querySelector('#itemID').innerText;
    var name = document.querySelector('#name').value;
    var price = document.querySelector('#price').value;
    var color = document.querySelector('#color1').value;
    var description = document.querySelector('#description').value;
    var url = document.querySelector('#image').value;
    var productObject = new Product(id, name, color, price, description, url);

    adminOperations.addProducts(productObject);
    printObject();
    countIncrease();
    
    document.querySelector('#name').value = "";
    document.querySelector('#price').value = "";
    document.querySelector('#description').value = "";
    document.querySelector('#image').value = '';
}









function printObject() {
    document.querySelector('#itemTable').innerHTML = "";
    // productOperations.searchAll
    var pr = productOperations.searchAll();
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
            tr.insertCell(0).innerText = product['pid'];
            tr.insertCell(1).innerText = product['name'];
            tr.insertCell(2).innerHTML = `<div style="width: 40px; height: 40px; background-color:` + product['color'] + `; border-radius: 30px;"></div>`
            tr.insertCell(3).innerText = product['price'];
            tr.insertCell(4).innerText = product['description'];
            tr.insertCell(5).innerHTML = `<img style="height:100px;width:200px" src=` + product['image'] + ` alt="no image available">`;
            buttonFlag = true;
            // for (let key in product) {
            //     tr.insertCell(i).innerText = product[key];
            //     i++;
            //     buttonFlag = true;
            // }
            // console.log(createOperation());
            if (buttonFlag) {
                let gg = tr.insertCell(6);
                gg.appendChild(createOperation(product.pid));
            }
            // console.log('gg', gg)

        }
    })


}

function createOperation(id) {
    var button = document.createElement('button');
    button.className = 'btn btn-danger fas fa-times operationButton';
    button.addEventListener('click', deleteEntry);
    button.setAttribute('pid', id);
    // button.innerHTML= '<i class="fa fa-close" aria-hidden="true"></i>';
    // console.log(button);
    return button;
}

function deleteEntry() {
    var id = this.getAttribute("pid");
    adminOperations.delete(id);
    // console.log('id is ', id);
    // isRunFlag=false;
    printObject();
}

function createBanner() {
    var h1 = document.querySelector('#bannerh1Input').value;
    var h61 = document.querySelector('#bannerh61Input').value;
    var h62 = document.querySelector('#bannerh62Input').value;
    var h63 = document.querySelector('#bannerh63Input').value;
    var image = document.querySelector('#bannerBackgroundImage').value;
    var bannerObject = {
        h1: h1,
        h61: h61,
        h62: h62,
        h63: h63,
        backgroundImage: image
    }
    adminOperations.setBanner(bannerObject);
    printBanner();
}

function printBanner() {
    var pr = adminOperations.getBanner();
    pr.then(bannerObject => {
        // bannerObject = data;

        document.querySelector('#bannerh1').innerText = bannerObject['h1'];
        document.querySelector('#bannerh61').innerText = bannerObject['h61'];
        document.querySelector('#bannerh62').innerText = bannerObject['h62'];
        document.querySelector('#bannerh63').innerText = bannerObject['h63'];
        var bgImage = bannerObject['backgroundImage']
        document.querySelector('.banner').setAttribute('style', "background-image : url(" + bannerObject['backgroundImage'] + ")!important;");

    })
}

// function createCard(productObject) {
//     var div1 = document.createElement('div');
//     div1.className = 'card';
//     var h5 = document.createElement('h5');
//     h5.className = "card-img-top";
//     h5.innerText = productObject['name'];
//     var img = document.createElement('img');
//     img.className = 'card-img-top img-fluid'
//     img.src = productObject['image'];
//     img.alt = 'Card image cap';
//     div1.appendChild(img);
//     var bodyDiv = document.createElement('div');
//     bodyDiv.className = 'card-body';
//     div1.appendChild(bodyDiv);
//     var h51 = document.createElement('h5');
//     h51.className = 'card-title';
//     h51.innerHTML = `<div style="width: 40px; height: 40px; background-color:` + productObject['color'] + `; border-radius: 30px;"></div>`;
//     bodyDiv.appendChild(h51);
//     var p1 = document.createElement('p');
//     p1.className = 'card-text';
//     // p1.innerText = productObject['description'];
//     bodyDiv.appendChild(p1);
//     var p2 = document.createElement('p');
//     p2.className = 'card-text';
//     bodyDiv.appendChild(p2);
//     p2.innerHTML = `<small class="text-muted">` + productObject['color'] + `</small>`;
//     var bodyDiv1 = document.createElement('div');
//     bodyDiv1.className = 'card-body';
//     div1.appendChild(bodyDiv1);
//     var a = document.createElement('a');
//     a.setAttribute('href', '#');
//     a.className = 'card-link btn btn-primary';
//     a.innerText = productObject['price'];

//     return div1;

// }

function createCard(productObject) {
    var div1 = `<div class="card">
    <h5 class="card-header">Featured</h5>

    <img class="card-img-top" src="${productObject['image']}" alt="Card image cap">
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

function addCarouselItem() {
    var pid = document.querySelector('#carouselIDInput').value;
    adminOperations.addCarouselItem(pid);
    printCarouselTable();

}

function printCarouselTable() {
    document.querySelector('#carouselTable').innerHTML = "";
    // productOperations.searchAll
    var pr = adminOperations.getCarouselItems();
    pr.then(products => {
        // console.log(products);
        carouselTable = document.querySelector('#carouselTable');
        for (let key in products) {
            let productPr = productOperations.searchByID(key);

            if (productPr) {
                productPr.then(product => {
                    var tr = carouselTable.insertRow();
                    let i = 0;
                    tr.insertCell(0).innerText = product['pid'];
                    tr.insertCell(1).innerText = product['name'];
                    
                        let gg = tr.insertCell(2);
                        gg.appendChild(createCarouselOperation(product.pid));
                    
                })
            }

        }
        createCarousel();
    })
}

function createCarouselOperation(id) {

    var button = document.createElement('button');
    button.className = 'btn btn-danger fas fa-times operationButton';
    button.addEventListener('click', deleteCarouselEntry);
    button.setAttribute('pid', id);
    // button.innerHTML= '<i class="fa fa-close" aria-hidden="true"></i>';
    // console.log(button);
    return button;

}

function deleteCarouselEntry() {
    var id = this.getAttribute("pid");
    adminOperations.deleteCarouselItem(id);
    // console.log('id is ', id);
    // isRunFlag=false;
    printCarouselTable();
}