//your JS code here. If required.
const output = document.getElementById("output");

// Ensure loading message appears before promises execute
output.innerHTML = `<tr id="loading"><td colspan="2">Loading...</td></tr>`;

// Function to generate a random delay between 1 to 3 seconds
const randomDelay = () => Math.floor(Math.random() * 2000) + 1000; 

// Create 3 promises with different delays
const promises = [1, 2, 3].map((num) =>
  new Promise((resolve) => {
    const delay = randomDelay();
    setTimeout(() => resolve({ name: `Promise ${num}`, time: (delay / 1000).toFixed(3) }), delay);
  })
);

// Execute all promises in parallel and update the table once they resolve
Promise.all(promises).then((results) => {
  output.innerHTML = ""; // Remove loading row

  results.forEach(({ name, time }) => {
    const row = `<tr><td>${name}</td><td>${time}</td></tr>`;
    output.innerHTML += row;
  });

  // Calculate and display the total time taken (longest resolving promise)
  const total = Math.max(...results.map((res) => parseFloat(res.time))).toFixed(3);
  output.innerHTML += `<tr><td>Total</td><td>${total}</td></tr>`;
});
