// Function to make the request to the back end
function useRequest(url, method, data) {
  // Return a new promise
  return new Promise((resolve, reject) => {
    // Change the data to be sent object to a string
    const raw = JSON.stringify(data);

    // Set the headers of the request
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // Create the request options object
    const requestOptions = {
      method,
      mode: 'cors',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    // Use fetch to make HTTP POST request
    fetch(url, requestOptions)
      .then(async (response) => {
        // If the response has a status code of 400::BAD REQUEST then reject with the response and return from the function
        if (response.status === 400) {
          reject(await response.json());
          return;
        }

        // Resolve the promise and pass the response as a json object
        resolve(await response.json());
      })
      .catch(reject);
  });
}
