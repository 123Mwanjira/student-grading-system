const prompt = require("prompt-sync")();

while (true) {
  // Ask user for input
  let input = prompt("Enter your marks (or type 'exit' to quit): ");

  // Exit condition
  if (input === "exit") {
    console.log("Goodbye 👋");
    break;
  }

  // Convert input to number
  let marks = Number(input);

  // Validate input
  if (isNaN(marks)) {
    console.log("Invalid input! Please enter a number.");
  } else if (marks < 0 || marks > 100) {
    console.log("Marks should be between 0 and 100.");
  } else if (marks >= 80) {
    console.log("A - Excellent");
  } else if (marks >= 60) {
    console.log("B - Good");
  } else if (marks >= 50) {
    console.log("C - Average");
  } else {
    console.log("F - Fail");
  }
}