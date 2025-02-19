function checkLoginState() {
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("Login State:", isLoggedIn); // Debugging
    if (isLoggedIn === "true") {
      // Hide sinup element if it exists
      var sinupElement = document.getElementById("sinup");
      if (sinupElement) {
        sinupElement.style.display = "none";
      }
  
      // Hide login element if it exists
      var loginElement = document.getElementById("login");
      if (loginElement) {
        loginElement.style.display = "none";
      }
  
      return true;
    }
    return false;
  }

// Handle Add to Cart Click
function handleAddToCart() {
  // Check if user is logged in
  if (checkLoginState()) {
    // User is logged in, proceed with cart functionality
        alert("Add to cart")
    // Your cart logic here
  } else {
    // User is not logged in, show SignUp popup
    document.getElementById("sinup").style.display = "block";
  }
  

}

// SignUp Function
function Sinup() {
  var fname = document.getElementById("fname").value;
  var email = document.getElementById("email").value;
  var cpass = document.getElementById("cpassword").value;
  var lpass = document.getElementById("lpassword").value;
  var role = document.getElementById("role").value;

  // Validate Fields
  if (!fname || !email || !cpass || !lpass || !role) {
    alert("Please fill all fields for SignUp.");
    return;
  }

  if (cpass !== lpass) {
    alert("Passwords do not match!");
    return;
  }

  var userData = {
    userName: fname,
    email: email,
    password: lpass,
    role: role,
  };

  var TotalData = JSON.parse(localStorage.getItem("TotalData")) || [];
  TotalData.push(userData); // Push userData object into TotalData array

  // Save to LocalStorage
  localStorage.setItem("TotalData", JSON.stringify(TotalData));
  alert("SignUp Successful!");

  // Set login state after signup
  localStorage.setItem("isLoggedIn", "true");

  // Hide Signup Popup and Show Login Popup
  document.getElementById("sinup").style.display = "none";
  document.getElementById("login").style.display = "block";
}

// Login Function
function log() {
    var lemail = document.getElementById("Email").value;
    var lapass = document.getElementById("Password").value;
    var role = document.getElementById("role").value;
    var ShowData = document.getElementById("activityList");
  
    console.log("ShowData Element:", ShowData); // Debugging
  
    // Admin Login
    if (role === "admin" && lemail === "admin@gmail.com" && lapass === "admin123") {
      alert("Admin Login Successful!");
      localStorage.setItem("isLoggedIn", "true"); // Set login state
      ShowData.innerHTML = `
        <li>${"Name : Admin"}</li>
        <li>${lemail}</li>
        <li>${lapass}</li>
      `;
      document.getElementById("login").style.display = "none"; // Hide login popup
      // window.location.href = "dashboard.html"; // Redirect to dashboard after login
    }
    // User Login
    else if (role === "user") {
      var userData = JSON.parse(localStorage.getItem("TotalData")) || [];
      var user = userData.find((u) => u.email === lemail && u.password === lapass);
  
      console.log("User Object:", user); // Debugging
  
      if (user) {
        alert("User Login Successful!");
        localStorage.setItem("isLoggedIn", "true");
         // Set login state
         console.log("pro");
         
        ShowData.innerHTML = `
          <li>${user.userName}</li>
          <li>${lemail}</li>
          <li>${lapass}</li>
        `;
        document.getElementById("login").style.display = "none"; // Hide login popup
        // window.location.href = "dashboard.html"; // Redirect to dashboard after login
      } else {
        alert("Invalid Email or Password!");
      }
    } else {
      alert("Invalid Role or Credentials!");
    }
  }
// Check Login State on Page Load
checkLoginState();

// My Account Function - Checks login status and redirects
function MyAccount() {
  // Check if the user is logged in by checking sessionStorage or localStorage
  if (!localStorage.getItem("isLoggedIn")) {
    // Agar user logged in nahi hai, to login/signup page pe redirect karo
    document.getElementById("sinup").style.display = "block";
  } else {
    // Agar user logged in hai, to dashboard pe redirect karo
    window.location.href = "dashboard.html";
    console.log("Welcome Dashboard");
  }
}

// Close Modal Function
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}
function logout() {
  // Session ya cookies ko clear karna
  sessionStorage.clear(); // Agar aap sessionStorage use kar rahe ho
  localStorage.clear(); // Agar aap localStorage use kar rahe ho
  // Ya specific cookie ko delete kar sakte ho:

  // User ko home.html ya login page pe redirect karna
  window.location.href = "home.html"; // Yahan login.html ya aapke login page ka URL ho
}
//  yeh check kr rha he ky men html ky page pr reh kr yeh kaam kr rha hun yah nhi
var currentPage = window.location.pathname ;
if (currentPage.includes("home.html")) {
    document.querySelectorAll(".cart").forEach((cart) => {
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
              console.log(cartItems);
           
            }
          }
        });
      });
       }
      
      // Check for cart data and render it when the checkout page loads
      
      var currentPage = window.location.pathname;
      console.log("Current Page:", currentPage); // Debugging
      
      if (currentPage.includes("output.html")) {
        console.log("Rendering cart items..."); // Debugging
        var cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];
        console.log("Cart Items:", cartItems); // Debugging
      
        if (cartItems.length > 0) {
          var cartContainer = document.querySelector(".cart-product");
      
          if (cartContainer) {
            // Render all products in the cart
            cartContainer.innerHTML = cartItems
              .map(
                (product) => `
                              <div class="cart-item">
                                  <p class='p-java'>Product ID: ${product.id}</p>
                                  <p class='p-java'>Product Name: ${product.name}</p>
                                  <p class='p-java'>Product Price: ${product.price}</p>
                                  <button class='btn-js' onclick='checkout()'>Procced to check out</button>
                              </div>
                          `
              )
              .join("");
          } else {
            console.error("Element '.cart-product' not found.");
          }
        } else {
          console.log("No products in the cart");
        }
      }
      
// Show Popup for Checkout
function checkout() {
  document.getElementById("checkoutPopup").style.display = "flex";
}

// Close the Popup
function closePopup() {
  document.getElementById("checkoutPopup").style.display = "none";
}

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get form data
  var fullName = document.getElementById("fullName").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var email = document.getElementById("address").value;

  // Get cart items from localStorage
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Save checkout data to localStorage
  var checkoutData = {
    fullName: fullName,
    phoneNumber: phoneNumber,
    email: email,
    products: cartItems, // Include the cart items
  };

  // Save to localStorage
  localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

  // Clear the cart
  localStorage.removeItem("cart");

  // Redirect to dashboard
});
document.addEventListener("DOMContentLoaded", function () {
  // Fetch checkout data from localStorage
  var checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || [];
  var showProducts = document.getElementById("showProducts");
console.log(checkoutData)
  if (checkoutData.products && checkoutData.products.length > 0) {
    // Render products
    showProducts.innerHTML = checkoutData.products
      .map(
        (product) => `
          <div class="product-item">
            <p>Product ID: ${product.id}</p>
            <p>Product Name: ${product.name}</p>
            <p>Product Price: $${product.price}</p>
          </div>
        `
      )
      .join("");

    // Display user details
    showProducts.innerHTML += `
      <div class="user-details">
        <h3>User Details</h3>
        <p>Name: ${checkoutData.fullName}</p>
        <p>Phone: ${checkoutData.phoneNumber}</p>
        <p>Email: ${checkoutData.email}</p>
      </div>
    `;
  } else {
    // showProducts.innerHTML = "<p>No products available.</p>";
  }
});