// Get the form
const form = document.getElementById('main-form');

// Listen for submit event on form and run generate password function
form.addEventListener('submit', (e) => {
  // Dont refresh the page when form is submitted
  e.preventDefault();

  // Call get passwords function
  getPasswords();
});
