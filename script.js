//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");

    // Initially, add the loading row
    const loadingRow = document.createElement("tr");
    loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
    output.appendChild(loadingRow);

    // Function to create a promise that resolves after a random delay (1-3 seconds)
    const createPromise = (id) => {
        const delay = Math.random() * 2 + 1; // Random delay between 1 and 3 seconds
        return new Promise((resolve) => {
            setTimeout(() => resolve({ id, time: delay.toFixed(3) }), delay * 1000);
        });
    };

    // Create three promises
    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    // Wait for all promises to resolve
    Promise.all(promises).then((results) => {
        // Remove loading row
        output.innerHTML = "";

        // Append resolved promise results to the table
        results.forEach((result) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>Promise ${result.id}</td><td>${result.time}</td>`;
            output.appendChild(row);
        });

        // Calculate the total time (maximum time taken)
        const totalTime = Math.max(...results.map((res) => parseFloat(res.time)));

        // Append the total time row
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${totalTime.toFixed(3)}</strong></td>`;
        output.appendChild(totalRow);
    });
});
