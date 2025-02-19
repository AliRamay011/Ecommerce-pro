const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
});

// Dynamic Data Updates
const totalUsers = document.getElementById('totalUsers');
const totalRevenue = document.getElementById('totalRevenue');
const totalOrders = document.getElementById('totalOrders');
const growthRate = document.getElementById('growthRate');

setInterval(() => {
    totalUsers.textContent = Math.floor(Math.random() * 20000).toLocaleString();
    totalRevenue.textContent = `$${Math.floor(Math.random() * 100000).toLocaleString()}`;
    totalOrders.textContent = Math.floor(Math.random() * 5000).toLocaleString();
    growthRate.textContent = `+${Math.floor(Math.random() * 20)}%`;
}, 5000);

// Chart.js Configuration
const salesChartCtx = document.getElementById('salesChart').getContext('2d');
const trafficChartCtx = document.getElementById('trafficChart').getContext('2d');

const salesChart = new Chart(salesChartCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(26, 188, 156, 0.2)',
            borderColor: '#1abc9c',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const trafficChart = new Chart(trafficChartCtx, {
    type: 'doughnut',
    data: {
        labels: ['Direct', 'Referral', 'Social'],
        datasets: [{
            label: 'Traffic Sources',
            data: [55, 30, 15],
            backgroundColor: ['#1abc9c', '#3498db', '#9b59b6'],
            borderWidth: 0,
        }]
    },
    options: {
        responsive: true,
    }
});
function logout() {
  window.location.href = "home.html";
}
document.getElementById("uploadPic").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profilePic").src = e.target.result;
            // Optionally, save the updated profile picture to localStorage
            localStorage.setItem("profilePic", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

 // Event listener for the upload button click
    document.getElementById("uploadButton").addEventListener("click", () => {
      document.getElementById("fileInput").click(); // Trigger file input click
    });

    // Event listener for file input change (when the user selects a file)
    document.getElementById("fileInput").addEventListener("change", (event) => {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.getElementById("profilePic");
          img.src = e.target.result; // Set the uploaded image as the src
          localStorage.setItem("profilePic", e.target.result); // Save the image in localStorage
        };
        reader.readAsDataURL(file); // Read the image as data URL
      }
    });

   // Get references to the upload button and file input
   const uploadButton = document.getElementById("uploadButton");
   const fileInput = document.getElementById("fileInput");
   const profilePic = document.getElementById("profilePic");

   // Trigger file input when the button is clicked
   uploadButton.addEventListener("click", () => {
     fileInput.click(); // This triggers the file input dialog
   });

   // Handle the file input change event (when the user selects a file)
   fileInput.addEventListener("change", (event) => {
     const file = event.target.files[0]; // Get the selected file
     if (file) {
       const reader = new FileReader();
       reader.onload = function(e) {
         // Set the uploaded image as the src for the profile picture
         profilePic.src = e.target.result;
         // Save the image in localStorage
         localStorage.setItem("profilePic", e.target.result);
       };
       reader.readAsDataURL(file); // Read the file as a data URL
     }
   });





   