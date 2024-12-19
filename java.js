function submit() {
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var number = document.getElementById("number").value;
  var cpass = document.getElementById("cpassword").value;
  var lpass = document.getElementById("lpassword").value;

  if (!fname || !lname || !email || !number || !cpass || !lpass) {
    alert("please SinUp First");
    return;
  }
  if (cpass != lpass) {
    document.getElementById(
      "root"
    ).innerHTML = `<p class='wrong'>*Wrong PassWord</p>`;
    document.getElementById(
      "root1"
    ).innerHTML = `<p class='wrong'>*Wrong PassWord</p>`;
    return;
  }

  var TotalData = [];
  TotalData.push(fname, lname, email, number, cpass, lpass);
  window.localStorage.setItem("TotalData", JSON.stringify(TotalData));

  window.location.href = "./login.html";
}
function log() {
  var lemail = document.getElementById("lemail").value;
  var lapass = document.getElementById("lapassword").value;
  var Data = window.localStorage.getItem("TotalData");
  UserData = JSON.parse(Data);
  console.log(UserData);
  if (UserData[2] === lemail && UserData[5] === lapass) {
    window.location.href = "./ecommerce.html";
    console.log(UserData);
  } else {
    alert("Invalid Email and Password");
  }
}
function logout() {
  window.location.href = "./login.html";
}
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
var nav = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    nav.style.position = "fixed";
    nav.style.background = "white";
    nav.style.top = "0";
    nav.style.zIndex = "999";
    nav.style.boxShadow = "#bbbbbb 3px 2px 20px 0px";
    nav.style.width = "100% ";

    console.log((nav.style.background = "white !important"));
  } else if (window.scrollY <= 10) {
    nav.style.position = "relative";
    nav.style.top = "0";
    nav.style.background = "white !important";
    nav.style.zIndex = "999";
    nav.style.boxShadow = "#bbbbbb 0px 0px 0px 0px";
    nav.style.overflow = "hidden !important"
    nav.style.width = "100%"

  }
});

// Get the current page path
var currentPage = window.location.pathname;

if (currentPage.includes("ecommerce.html")) {
  document.querySelectorAll(".cart").forEach(cart => {
    cart.addEventListener("click", (event) => {
      if (event.target.classList.contains("cart-design")) {
        var Productparent = event.target.closest(".add-cart");
        if (Productparent) {
          var productidget = Productparent.dataset.id;
          var productname = Productparent.dataset.name;
          var productprice = Productparent.dataset.price;
          var product = {
            id: productidget,
            name: productname,
            price: productprice,
          };

          // Get current cart data from localStorage
          var cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];

          // Add new product to cart
          cartItems.push(product);

          // Save updated cart to localStorage
          window.localStorage.setItem("cart", JSON.stringify(cartItems));
          console.log("Product added to localStorage:", product);

          alert("Added to Cart");
        }
      }
    });
  });
}


// **CHECKOUT PAGE FUNCTIONALITY**
else if (currentPage.includes("check.html")) {
  // Fetch cart data from localStorage
  var cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];

  if (cartItems.length > 0) {
    var cartContainer = document.querySelector(".cart-container");

    if (cartContainer) {
      // Render all products in the cart
      cartContainer.innerHTML = cartItems.map((product, index) => `
        <div class="cart-item">
          <p class='p-java'>Product ID: ${product.id}</p>
          <p class='p-java'>Product Name: ${product.name}</p>
          <p class='p-java'>Product Price: ${product.price}</p>
          <button class='btn-js' onclick='Deletedata(${index})'>Delete</button>
        </div>
      `).join("");
    } else {
      console.error("Element '.cart-container' not found");
    }
  } else {
    console.log("No products in the cart");
  }
}

function Deletedata(index) {
  // Fetch cart data
  var cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];

  // Remove product at the given index
  cartItems.splice(index, 1);

  // Update localStorage
  window.localStorage.setItem("cart", JSON.stringify(cartItems));

  // Refresh the page or re-render cart
  location.reload();
}
