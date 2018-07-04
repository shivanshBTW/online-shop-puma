// Initialize Firebase
var config = {
    apiKey: "AIzaSyBRpTQ4-TsxVF1rA36gtL_wVxceRwefn7I",
    authDomain: "puma-99e7e.firebaseapp.com",
    databaseURL: "https://puma-99e7e.firebaseio.com",
    projectId: "puma-99e7e",
    storageBucket: "",
    messagingSenderId: "651430775749"
  };
  firebase.initializeApp(config);


function* autoGen(start){
    counter = start;
    while(true){
        yield counter;
        counter++;
    }
}