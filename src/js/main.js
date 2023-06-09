document.body.style.width = '750px';

// Get the loading overlay
const overlay = document.getElementsByClassName('loading-overlay')[0];

// Sets the width of the extension
document.body.style.width = '750px';

// Get the password boxes
const passwords = document.getElementsByClassName('password-content');
const passwordContentBoxes = Array.from(passwords);

// Listen for click on password boxes and run copy function
passwordContentBoxes.forEach((passwordBox) => {
  // Loop through all password boxes and listen for clicks on each
  passwordBox.addEventListener('click', (e) => {
    // Return the default styling for each password box
    removeStyling();

    // Get the password that is inside the password content box that was clicked
    const password = e.target.innerText;
    // Put the text in the password content box into the clipboard
    navigator.clipboard.writeText(password);

    // Change the styling of the password box to show which was copied
    let element = e.target;
    if (element.tagName.toLowerCase() === 'span') {
      element = element.parentElement;
    }

    element.classList.add('copied');
    displayNotification('Copied', 'positive');

    setTimeout(() => {
      removeStyling();
    }, 2800);
  });
});

// Function to get passwords from back end
async function getPasswords() {
  // Show loading screen
  toggleLoading();

  // Return the default styling for each password box
  removeStyling();

  // Get the parameters for creating the password
  const passwordParameters = getPasswordParameters();

  // Call make request function and pass the parameters for creating the password
  try {
    const { data } = await makePasswordRequest(passwordParameters);
    displayPasswords(data);
  } catch (e) {
    displayNotification(e.message, 'negative');
  }

  toggleLoading();
}

// Function to remove the styling from the password boxes after password is copied
function removeStyling() {
  passwordContentBoxes.forEach((box) => box.classList.remove('copied'));
}

// Function to get the password parameters for generating password
function getPasswordParameters() {
  // Call function from ./get-answers.js
  const answers = getAnswer();

  // Get if uppercase is switched on
  const uppercase = document.getElementById('uppercase').checked;

  // Get if lowercase is switched on
  const lowercase = document.getElementById('lowercase').checked;

  // Get if numbers is switched on
  const numbers = document.getElementById('numbers').checked;

  // Get if symbols is switched on
  const symbols = document.getElementById('symbols').checked;

  // Return the parameters
  return {
    numbers,
    symbols,
    uppercase,
    lowercase,
    ...answers,
  };
}

// Function to get the password strength and expected time to crack from the zxcvbn library
function getPasswordStrength(password) {
  // Get the details of the password and store in strength variable
  const strength = zxcvbn(password);

  // Extract the score and the time to crack if online with no throttling
  // Throttling or sometimes also called throttle function is a practice used in websites. Throttling is used to call a function after every millisecond or a particular interval of time only the first click is executed immediately.
  const { online_no_throttling_10_per_second: timeToCrack } =
    strength.crack_times_display;
  const { score } = strength;

  // Translate the score to words, which will be applied to the boxes to give it a border color
  const scoreCard = {
    0: 'poor',
    1: 'weak',
    2: 'ok',
    3: 'good',
    4: 'strong',
  };

  return {
    timeToCrack,
    score: scoreCard[score],
  };
}

// Function to display the passwords in the password boxes
function displayPasswords(passwords) {
  // Loop through the password boxes and for each password content box
  passwordContentBoxes.forEach((passwordBox, i) => {
    // Get the password from the passwords argument, eg, passwords.password1
    const password = passwords[`password${i + 1}`];
    // Get the strength by calling the getPasswordStrength function and passing it the password
    const strength = getPasswordStrength(password);

    // Add the score of the password strength as a class to the password box to give it a red, light red, yellow, green and sharp green border to signify the strength of the password
    passwordBox.classList.add(strength.score);
    // Put the time to crack in the span below the password
    document.getElementById(`password-strength-${i + 1}`).innerHTML = `
      <span>
        Time to crack: ${strength.timeToCrack}
      </span>
    `;

    // Create the span to put the password
    const passwordSpan = document.createElement('span');
    // Set the id of the span to password-content-1/2/3
    passwordSpan.setAttribute('id', `password-content-${i + 1}`);
    // Put the password inside the span
    passwordSpan.innerText = password;

    // Remove the current content from the password box
    passwordBox.innerHTML = '';
    // Put the password in the password box
    passwordBox.appendChild(passwordSpan);
  });
}

// Function to make the request to the back end
async function makePasswordRequest(passwordParameters) {
  try {
    // const URL = 'https://rural-bedroom-production.up.railway.app/password';
    const URL = 'http://localhost:5000/password';

    return await useRequest(URL, 'POST', passwordParameters);

    // .then((response) => {
    //   return response;
    // })
    // .catch(() => {
    //   displayNotification('Check your internet connection', 'dark');
    // });
  } catch (e) {
    throw e;
  }
  // const URL = 'https://rural-bedroom-production.up.railway.app/password';
  // const URL = 'http://localhost:5000/password';

  // useRequest(URL, 'POST', passwordParameters)
  //   .then((response) => {
  //     return response;
  //   })
  //   .catch(() => {
  //     displayNotification('Check your internet connection', 'dark');
  //   });

  return;
  // Return a new promise
  return new Promise((resolve, reject) => {
    // Change the password parameters object to a string
    const raw = JSON.stringify(passwordParameters);

    // Set the headers of the request
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // Create the request options object
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const URL = 'https://rural-bedroom-production.up.railway.app/password';
    // const URL = 'http://localhost:5000/password';

    // Use fetch to make HTTP POST request
    fetch(URL, requestOptions)
      .then(async (response) => {
        // If the response has a status code of 400::BAD REQUEST then reject with the response and return from the function
        if (response.status === 400) {
          reject(await response.json());
          return;
        }

        // Resolve the promise and pass the response as a json object
        resolve(await response.json());
      })
      .catch((e) => {
        // If the request throws an error, tell user to connect to the internet
        displayNotification('Check your internet connection', 'dark');
      });
  });
}

// Function to show/hide loading overlay
function toggleLoading() {
  // Add/remove is-active class
  overlay.classList.toggle('is-active');
}

// Get the passwords on initial page load.
// This function is called once
getPasswords();
