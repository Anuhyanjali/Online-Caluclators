document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.innerText;

            // Handle number and decimal input
            if (!isNaN(parseFloat(value)) || value === '.') {
                currentInput += value;
                display.innerText = currentInput;
            }
            // Handle AC (All Clear) button
            else if (value === 'AC') {
                currentInput = '';
                operator = '';
                firstOperand = '';
                secondOperand = '';
                display.innerText = '0';
            }
            // Handle equal button
            else if (value === '=') {
                if (currentInput && firstOperand && operator) {
                    secondOperand = currentInput;
                    const result = calculate(firstOperand, operator, secondOperand);
                    display.innerText = result;
                    currentInput = result;
                    firstOperand = '';
                    operator = '';
                    secondOperand = '';
                }
            }
            // Handle operator buttons
            else if (['+', '-', '*', '/', '%', '^'].includes(value)) {
                if (currentInput) {
                    if (firstOperand && operator && currentInput) {
                        secondOperand = currentInput;
                        const result = calculate(firstOperand, operator, secondOperand);
                        firstOperand = result;
                        display.innerText = result;
                    } else {
                        firstOperand = currentInput;
                    }
                    operator = value;
                    currentInput = '';
                }
            }
        });
    });

    function calculate(first, operator, second) {
        const num1 = parseFloat(first);
        const num2 = parseFloat(second);

        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            case '%':
                return num1 % num2;
            case '^':
                return Math.pow(num1, 2);
            default:
                return 0;
        }
    }
});
