// Import the Monad SDK
const Monad = require("@monad-labs/sdk");

// Create a Monad instance with the default configuration
const monad = new Monad();

// Define a smart contract for the calculator
const calculatorContract = `
pragma solidity ^0.8.0;

contract Calculator {
    // A public variable to store the result
    uint public result;

    // A constructor to initialize the result
    constructor() {
        result = 0;
    }

    // A function to add a number to the result
    function add(uint x) public {
        result += x;
    }

    // A function to subtract a number from the result
    function subtract(uint x) public {
        result -= x;
    }

    // A function to multiply the result by a number
    function multiply(uint x) public {
        result *= x;
    }

    // A function to divide the result by a number
    function divide(uint x) public {
        result /= x;
    }

    // A function to reset the result to zero
    function reset() public {
        result = 0;
    }
}
`;

// Deploy the smart contract to the Monad network
monad.deployContract(calculatorContract)
    .then(contract => {
        // Get the contract address
        const address = contract.address;
        console.log("Contract deployed at", address);

        // Create a web page for the calculator
        const html = `
        <html>
            <head>
                <title>Calculator on the Monad</title>
            </head>
            <body>
                <h1>Calculator on the Monad</h1>
                <p>The result is: <span id="result">0</span></p>
                <input type="number" id="input" value="0">
                <button id="add">+</button>
                <button id="subtract">-</button>
                <button id="multiply">*</button>
                <button id="divide">/</button>
                <button id="reset">C</button>
                <script>
                    // Get the HTML elements
                    const result = document.getElementById("result");
                    const input = document.getElementById("input");
                    const add = document.getElementById("add");
                    const subtract = document.getElementById("subtract");
                    const multiply = document.getElementById("multiply");
                    const divide = document.getElementById("divide");
                    const reset = document.getElementById("reset");

                    // Define a function to update the result
                    function updateResult() {
                        // Call the contract's result function
                        contract.result()
                            .then(value => {
                                // Update the result element
                                result.textContent = value;
                            })
                            .catch(error => {
                                // Handle the error
                                console.error(error);
                            });
                    }

                    // Define a function to perform an operation
                    function operate(operation) {
                        // Get the input value
                        const x = parseInt(input.value);

                        // Call the contract's operation function
                        contractoperation
                            .then(() => {
                                // Update the result
                                updateResult();
                            })
                            .catch(error => {
                                // Handle the error
                                console.error(error);
                            });
                    }

                    // Add event listeners to the buttons
                    add.addEventListener("click", () => operate("add"));
                    subtract.addEventListener("click", () => operate("subtract"));
                    multiply.addEventListener("click", () => operate("multiply"));
                    divide.addEventListener("click", () => operate("divide"));
                    reset.addEventListener("click", () => operate("reset"));

                    // Update the result initially
                    updateResult();
                </script>
            </body>
        </html>
        `;

        // Serve the web page on a local server
        monad.serve(html)
            .then(url => {
                // Print the URL of the web page
                console.log("Web page available at", url);
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });
    })
    .catch(error => {
        // Handle the error
        console.error(error);
    });
