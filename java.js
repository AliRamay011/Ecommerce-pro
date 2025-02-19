function side() {
  var show = document.getElementById("list");
  show.style.display = "block";
}
function show() {
  var show = document.getElementById("none");
  if (show.style.display === "block") {
    show.style.display = "none";
  } else {
    show.style.display = "block";
  }
}

// yeh slider ka code hen
var slides = document.querySelectorAll(".slider");

var count = 0;
var TotalSlides = slides.length;
console.log(slides);

slides.forEach((slide, index) => {
  slide.style.left = `${index * 432}px`;
});
function Next() {
  count = (count + 1) % TotalSlides;
  SlideImage();
  //  console.log(count)
}
function Prev() {
  count = (count - 1 + TotalSlides) % TotalSlides;
  SlideImage();
  // console.log(count)
}
var SlideImage = () => {
  slides.forEach((slide) => {
    slide.style.transform = `TranslateX(-${count * 150}%)`;
  });
};

var leftSlider = document.querySelectorAll(".cate");
var counter = 0;
var ImagesLength = leftSlider.length;

// console.log(leftSlider)
leftSlider.forEach((left, index) => {
  left.style.left = `${index * 21}%`;
});
function left() {
  counter = (counter + ImagesLength) % ImagesLength;
  RightSlider();
}
function rigth() {
  counter = (counter - 1 + ImagesLength) % ImagesLength;
  RightSlider();
}
var RightSlider = () => {
  leftSlider.forEach((left) => {
    left.style.transform = `TranslateX(-${counter * 30}%)`;
  });
};


// yeh navbar ka code hen 
var nav = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    nav.style.position = "fixed";
    nav.style.background = "white";
    nav.style.top = "0";
    nav.style.zIndex = "99";
    nav.style.boxShadow = "#bbbbbb 3px 2px 20px 0px";
    nav.style.width = "100% ";

    console.log((nav.style.background = "white !important"));
  } else if (window.scrollY <= 10) {
    nav.style.position = "relative";
    nav.style.top = "0";
    nav.style.background = "white !important";
    nav.style.zIndex = "999";
    nav.style.boxShadow = "#bbbbbb 0px 0px 0px 0px";
    nav.style.overflow = "hidden !important";
    nav.style.width = "100%";
  }
});



















