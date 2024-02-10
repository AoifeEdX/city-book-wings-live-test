let slideIndex = 0;

function showSlides() {
    const imageSlides = document.getElementsByClassName("mySlides");
    const textSlides = document.getElementsByClassName("mySlidesText");

    for (let i = 0; i < imageSlides.length; i++) {
        imageSlides[i].style.display = "none";
        textSlides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > imageSlides.length) {
        slideIndex = 1;
    }

    imageSlides[slideIndex - 1].style.display = "block";
    textSlides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
    showSlides();
});
