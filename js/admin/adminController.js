window.addEventListener('load', adminInit)

function adminInit() {
    adminBindEvents();

}

function adminBindEvents() {
    toggleViewAdmin();
    document.querySelector('#admin-toggle').addEventListener('change', toggleViewAdmin);
    console.log(document.querySelector('#admin-toggle'));

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