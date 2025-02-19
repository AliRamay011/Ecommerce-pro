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
    alert("Add to cart");
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

  // Store logged-in user data
  localStorage.setItem("loggedInUser", JSON.stringify(userData));

  // Hide Signup Popup and Show Login Popup
  document.getElementById("sinup").style.display = "none";
  document.getElementById("login").style.display = "block";
}

// // Login Function
function log() {
  var lemail = document.getElementById("Email").value;
  var lapass = document.getElementById("Password").value;
  var role = document.getElementById("role").value;
  var ShowData = document.getElementById("AdminData");
  var UserData = document.getElementById("UserInfo");

  console.log("ShowData Element:", ShowData); // Debugging

  // Admin Login
  if (
    role === "admin" &&
    lemail === "admin@gmail.com" &&
    lapass === "admin123"
  ) {
    alert("Admin Login Successful!");
    localStorage.setItem("isLoggedIn", "true");

    // Store admin data in localStorage
    var adminData = {
      userName: "Admin",
      email: lemail,
      password: lapass,
      role: "admin",
    };
    localStorage.setItem("loggedInUser", JSON.stringify(adminData));

    // Display admin data
    ShowData.innerHTML = `
      <ul>
        <li>Name: Admin</li>
        <li>Email: ${lemail}</li>
        <li>Password: ${lapass}</li>
      </ul>
    `;

    document.getElementById("login").style.display = "none"; // Hide login popup
    // window.location.href = "dashboard.html"; // Redirect to dashboard after login
  }
  // User Login
  else if (role === "user") {
    var userData = JSON.parse(localStorage.getItem("TotalData")) || [];
    var user = userData.find(
      (u) => u.email === lemail && u.password === lapass
    );

    console.log("User Object:", user); // Debugging

    if (user) {
      alert("User Login Successful!");
      localStorage.setItem("isLoggedIn", "true");

      // Store user data in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Display user data
      ShowData.innerHTML = `
        <ul>
          <li>Name: ${user.userName}</li>
          <li>Email: ${user.email}</li>
          <li>Password: ${user.password}</li>
        </ul>
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

document.addEventListener("DOMContentLoaded", function () {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  var userDataElement = document.getElementById("AdminData");

  if (loggedInUser && userDataElement) {
    // Display user data
    userDataElement.innerHTML = `
      <ul>
        <li>Name: ${loggedInUser.userName}</li>
        <li>Email: ${loggedInUser.email}</li>
        <li>Role: ${loggedInUser.role}</li>
      </ul>
    `;
  } else {
    // userDataElement.innerHTML = "<p>No user data found. Please log in.</p>";
  }
});
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
var currentPage = window.location.pathname;

if (currentPage.includes("home.html")) {
  document.querySelectorAll(".cart").forEach((cart) => {
    cart.addEventListener("click", (event) => {
      if (event.target.classList.contains("cart-design")) {
        var Productparent = event.target.closest(".add-cart");
        if (Productparent) {
          var productidget = Productparent.dataset.id;
          var productname = Productparent.dataset.name;
          var productprice = Productparent.dataset.price;

          // Create product object
          var product = {
            id: productidget,
            name: productname,
            price: productprice,
            quantity: 1, // Default quantity is 1
          };

          // Get current cart data from localStorage
          var cartItems = JSON.parse(window.localStorage.getItem("cart")) || [];

          // Check if the product already exists in the cart
          var existingProduct = cartItems.find(
            (item) => item.id === product.id
          );

          if (existingProduct) {
            // If the product exists, increment its quantity
            existingProduct.quantity += 1;
          } else {
            // If the product does not exist, add it to the cart
            cartItems.push(product);
          }

          // Save updated cart to localStorage
          window.localStorage.setItem("cart", JSON.stringify(cartItems));
          console.log(cartItems);
        }
      }
    });
  });
}

// Check for cart data and render it when the checkout page loads
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
              <p class='p-java'>Quantity: ${product.quantity}</p>
              <button class='btn-js' onclick='checkout()'>Proceed to check out</button>
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
// Prevent form submission
function clickdata() {
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

  // Redirect to dashboard (add your URL here)
  window.location.href = "product.html"; // Update with your actual dashboard URL
}

// Display checkout data when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Fetch checkout data from localStorage
  var checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || {
    products: [],
  };
  var showProducts = document.getElementById("showProducts");

  console.log(checkoutData); // Debugging: Check the structure of checkoutData

  if (showProducts) {
    if (checkoutData.products && checkoutData.products.length > 0) {
      // Render products
      showProducts.innerHTML = checkoutData.products
        .map(
          (product) => `
            <div class="product-item">
              <p> ${product.id}</p>
              <p>${product.name}</p>
              <p>${product.price}</p>
              <p>${product.quantity}</p>
              <div className="parent-div">
              <button class="delete-btn" >  <img class="delete" src="images/edit.png" alt=""></button>
              <button class="delete-btn" onclick='deleteProduct()'>  <img class="delete" src="images/delete.png" alt="" ></button>
              </div>
            </div>
          `
        )
        .join("");
    } else {
      showProducts.innerHTML = "<p>No products available.</p>";
    }
  } else {
    // console.log("Element with id 'showProducts' not found.");
  }
});
function deleteProduct() {
  console.log("Deleting product data...");

  // Remove product data from localStorage
  localStorage.removeItem("cart"); // Remove cart data
  localStorage.removeItem("checkoutData"); // Remove checkout data
  // Remove Data from innerHtml
  showProducts.innerHTML = "";
}
// document.addEventListener("DOMContentLoaded", function () {
//   var UserInfo = document.getElementById("UserInfo");
//   var userData = JSON.parse(localStorage.getItem("TotalData")) || [];
//   var user = userData.find(
//     (u) =>
//       u.email === "admin@gmail.com" &&
//       u.password === "admin123" &&
//       u.role === "admin"
//   );

//   console.log("User Object:", user); // Debugging
//   if (user) {
//     console.log(user);
//     UserInfo.innerHTML = `
//              <div class="flex-user">
//               <li class="userinfo">John Doe</li>
//               <li class="userinfo">JohnDoe@gmail.com</li>
//                <button class="delete-btn" onclick='editUser()' >  <img class="delete" src="images/edit.png" alt=""></button>
//                <button class="delete-btn" onclick='deleteUser()'>  <img class="delete" src="images/delete.png" alt="" ></button>

//               </div>
//            `;
//   } else {
//     console.log("Admin Login and see User data");
//   }
// });
function deleteUser() {
  localStorage.removeItem("cart"); // Remove cart data
  localStorage.removeItem("checkoutData"); // Remove checkout data
  // Remove Data from innerHtml
  UserInfo.innerHTML = "";
}
// function editUser() {
//   var userData = JSON.parse(localStorage.getItem("TotalData")) || [];
//   var user = userData.find(
//     (u) =>
//       u.email === "admin@gmail.com" &&
//       u.password === "admin123" &&
//       u.role === "admin"
//   );

//   console.log("User Object:", user); // Debugging
//   UserInfo.innerHTML =`
//   <div class="flex-user">
//   <li class="userinfo" contenteditabel='true'>John Doe</li>
//   <li class="userinfo" contenteditabel='true'>JohnDoe@gmail.com</li>
//    <button class="delete-btn" onclick='editUser()' >  <img class="delete" src="images/edit.png" alt=""></button>
//    <button class="delete-btn" onclick='deleteUser()'>  <img class="delete" src="images/delete.png" alt="" ></button>

//   </div>
//   `

// }
document.addEventListener("DOMContentLoaded", function () {
  var UserInfo = document.getElementById("UserInfo");
  var userData = JSON.parse(localStorage.getItem("TotalData")) || [];
  var user = userData.find(
    (u) =>
      u.email === "admin@gmail.com" &&
      u.password === "admin123" &&
      u.role === "admin"
  );

  console.log("User Object:", user); // Debugging
  if (user) {
    console.log(user);
    UserInfo.innerHTML = `
             <div class="flex-user">
              <li class="userinfo">John Doe</li>
              <li class="userinfo">JohnDoe@gmail.com</li>
               <button class="delete-btn" onclick='editUser()' >  <img class="delete" src="images/edit.png" alt=""></button>
               <button class="delete-btn" onclick='deleteUser()'>  <img class="delete" src="images/delete.png" alt="" ></button>
              </div>
           `;
  } else {
    console.log("Admin Login and see User data");
  }
});

function editUser() {
  var UserInfo = document.getElementById("UserInfo");
  UserInfo.innerHTML = `
  <div class="flex-user">
    <li class="userinfo" contenteditable='true'>John Doe</li>
    <li class="userinfo" contenteditable='true'>JohnDoe@gmail.com</li>
    <button class="delete-btn" onclick='saveUser()'><img class="save" src="images/check.png" alt=""></button>
    <button class="delete-btn" onclick='cancelEdit()'><img class="cancel" src="images/close.png" alt=""></button>
  </div>
  `;
}

function saveUser() {
  var UserInfo = document.getElementById("UserInfo");
  var name = UserInfo.querySelector(".userinfo:nth-child(1)").innerText;
  var email = UserInfo.querySelector(".userinfo:nth-child(2)").innerText;

  // Update the user data in localStorage
  var userData = JSON.parse(localStorage.getItem("TotalData")) || [];
  var userIndex = userData.findIndex(
    (u) =>
      u.email === "admin@gmail.com" &&
      u.password === "admin123" &&
      u.role === "admin"
  );

  if (userIndex !== -1) {
    userData[userIndex].name = name;
    userData[userIndex].email = email;
    localStorage.setItem("TotalData", JSON.stringify(userData));
    alert("User data updated successfully!");
  }

  // Revert back to the normal view
  UserInfo.innerHTML = `
  <div class="flex-user">
    <li class="userinfo">${name}</li>
    <li class="userinfo">${email}</li>
    <button class="delete-btn" onclick='editUser()'><img class="delete" src="images/edit.png" alt=""></button>
    <button class="delete-btn" onclick='deleteUser()'><img class="delete" src="images/delete.png" alt=""></button>
  </div>
  `;
}

function cancelEdit() {
  var UserInfo = document.getElementById("UserInfo");
  // Revert back to the original data without saving
  UserInfo.innerHTML = `
  <div class="flex-user">
    <li class="userinfo">John Doe</li>
    <li class="userinfo">JohnDoe@gmail.com</li>
    <button class="delete-btn" onclick='editUser()'><img class="delete" src="images/edit.png" alt=""></button>
    <button class="delete-btn" onclick='deleteUser()'><img class="delete" src="images/delete.png" alt=""></button>
  </div>
  `;
}
