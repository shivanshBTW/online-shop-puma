var adminOperations = {
    addProducts(productObject) {
        // console.log(productObject)
        firebase.database().ref('products/' + productObject.pid).set(productObject);
        // console.log(productObject);
    },
    // sort(loginID, id) {
    //     var prodRef = firebase.database().ref('products/');
    //     // prodRef.orderByChild
    // },
    delete(id) {
        // var pr = new Promise((resolve, reject) => {
        var data = firebase.database().ref('products/' + id);
        data.on('value', snapshot => {
            data.remove();
        })
        // })
        // return pr;
    },
    getId() {
        var pr = new Promise((resolve, reject) => {
            var data = firebase.database().ref('productID');
            data.on('value', snapshot => {
                var object = snapshot.val();
                // console.log(object);
                resolve(object);
            })
        })
        return pr;
    },
    setId(id) {
        firebase.database().ref('productID').set(id);
    },
    setTopBanner(bannerObject) {
        firebase.database().ref('products/banner').set(bannerObject);
    },
    setFeaturedItems() {

    },
    adminLogin(username, password) {
        var pr = new Promise((resolve, reject) => {
            var data = firebase.database().ref('admin/' + username);
            data.on('value', snapshot => {
                var object = snapshot.val();
                // console.log(object);
                resolve(object);
            })
        })
        pr.then(data => {
            if (data) {
                var pwd = document.querySelector('#password').value;
                if (data.password == pwd) {
                    localStorage.adminLoginFlag = true;
                    alert(' admin logged in..... redirecting');
                    location.href = '../admin.html';
                } else {
                    alert('Wrong username or password ...')
                }
            } else {
                alert('account not found');
            }
        }).catch(err => {
            console.log('err is ', err);
        })

    },
    setBanner(bannerObject) {
        // console.log(productObject)
        firebase.database().ref('featuredItems/banner').set(bannerObject);
    },
    getBanner() {
        var pr = new Promise((resolve, reject) => {
            var data = firebase.database().ref('featuredItems/banner');
            data.on('value', snapshot => {
                var object = snapshot.val();
                // console.log(object);
                resolve(object);
            })
        })
        return pr;
    },
    addCarouselItem(id){
        firebase.database().ref('featuredItems/carousel/'+id).set(id);
    },
    getCarouselItems(){
        var pr = new Promise((resolve, reject) => {
            var data = firebase.database().ref('featuredItems/carousel/');
            data.on('value', snapshot => {
                var object = snapshot.val();
                // console.log(object);
                resolve(object);
            })
        })
        return pr;
    },
    deleteCarouselItem(id){
        var data = firebase.database().ref('featuredItems/carousel/' + id);
        data.on('value', snapshot => {
            data.remove();
        })
    }
}