var productOperations = {
    searchAll() {
        var pr = new Promise((resolve, reject) => {
            var data = firebase.database().ref('products/');
            data.on('value', snapshot => {
                var object = snapshot.val();
                // console.dlog(object);
                resolve(object);
            })
        })
        return pr;
    },
    searchByID(id) {
        var pr = new Promise((resolve, reject) => {
            var data = firebase.database().ref('products/' + id);
            data.on('value', snapshot => {
                var object = snapshot.val();
                // console.log(object);
                resolve(object);
            })
        })
        return pr;
    },
}
