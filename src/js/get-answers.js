// Module to get the answers provided by the user

// This function is called in the web page
function getAnswers() {
  // Get all input boxes
  const info1Input = document.getElementById('info-1');
  const info2Input = document.getElementById('info-2');
  const info3Input = document.getElementById('info-3');

  // Get the information in the first input
  const first_input = info1Input.value;

  // Get the information in the second input
  const second_input = info2Input.value;

  // Get the information in the third input
  const third_input = info3Input.value;

  return {
    first_input,
    second_input,
    third_input,
  };
}

// This function is called in the browser extension
function getAnswer() {
  // Get input box
  const info1Input = document.getElementById('info-1');

  // Get the information in the first input
  const first_input = info1Input.value;

  return {
    first_input,
    second_input: first_input,
    third_input: first_input,
  };
}
