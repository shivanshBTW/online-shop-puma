var userOperations = {
    addUser(userObject) {
        var pr = new Promise((resolve, reject) => {
            var data = firebase.database().ref('users/' + userObject.username);
            data.on('value', snapshot => {
                var object = snapshot.val();
                // console.log(object);
                resolve(object);
            })
        })
        pr.then(data => {
            if (!data) {
                firebase.database().ref('users/' + userObject.username).set(userObject);
                alert('account created');
            }
            else{
                alert('username already exists');
            }
        }).catch(err => {
            console.log('err is ', err);
        })
    },
    loginUser(username,password){
        var pr = new Promise((resolve, reject) => {
            var data = firebase.database().ref('users/' +   username);
            data.on('value', snapshot => {
                var object = snapshot.val();
                // console.log(object);
                resolve(object);
            })
        })
        pr.then(data => {
            if (data) {
                var pwd = document.querySelector('#password').value;
                if(data.password == pwd ){
                    localStorage.loginFlag = true;
                    alert('logged in');
                }
                else{
                    alert('Wrong username or password ...')
                }
            }
            else{
                alert('account not found');
            }
        }).catch(err => {
            console.log('err is ', err);
        })
    }


}