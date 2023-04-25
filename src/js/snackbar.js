// Function to display notifications in snackbar
function displayNotification(msg, color) {
  // Get the snackbar DIV
  var snackbar = document.getElementById('snackbar');
  // Set the content of the notification
  snackbar.innerText = msg;

  // Modify the color of the snackbar to describe the type of notification
  // Can be negative, positive or default
  snackbar.className = color;

  // Add the "show" class to DIV
  snackbar.className = 'show' + ' ' + color;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    snackbar.className = snackbar.className = '';
  }, 3000);
}
