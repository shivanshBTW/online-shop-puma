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


function* autoGen(start) {
    var counter = start;
    while (true) {
        yield counter;
        counter++;
    }
}

$(document).ready(function () {
    $("#myCarousel").on("slide.bs.carousel", function (e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".carousel-item").length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $(".carousel-item")
                        .eq(i)
                        .appendTo(".carousel-inner");
                } else {
                    $(".carousel-item")
                        .eq(0)
                        .appendTo($(this).find(".carousel-inner"));
                }
            }
        }
    });
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})