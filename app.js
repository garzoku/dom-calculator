const divideButton = document.querySelector("span:nth-child(2)")
const multiplyButton = document.querySelector("span:nth-child(3)")
const subtractButton = document.querySelector("span:nth-child(7)")
const addButton = document.querySelector("span:nth-child(11)")
const equalsButton = document.querySelector("#equals")
// const zero = document.querySelector("#zero")
const $screen = document.querySelector("#screen")
const clearButton = document.querySelector("#clear")
const operatorButtons = []
const numberButtons = []
getNumberButtons()
getOperatorButtons()
let operatorChosen = false;
let isError = false
let operator
let currentNumber
let savedNumber
let result

clearButton.addEventListener("click", (event) => clear())
equalsButton.addEventListener("click", (event) => evaluate())
operatorButtons.forEach(button => {
    button.addEventListener("click", (event) => selectOperator(event))
})

numberButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        setValues(event)
    })
})

function getNumberButtons() {
    const buttons = document.querySelectorAll("span")
    for (const button of buttons) {
        if (!button.classList.contains("operator")) {
            numberButtons.push(button)
        }
    }
}

function setValues(event) {
    if (isError)
        return
    if (!$screen.textContent) {
        $screen.textContent = event.target.textContent
        currentNumber = event.target.textContent
    } else {
        $screen.textContent = $screen.textContent + event.target.textContent
        if (savedNumber) {
            currentNumber = event.target.textContent
        } else {
            currentNumber = currentNumber + event.target.textContent
        }
    }
}

function getOperatorButtons() {
    const buttons = document.querySelectorAll(".operator")
    for (const button of buttons) {
        if (!button.id) {
            operatorButtons.push(button)
        }
    }
}

function evaluate() {
    if (!savedNumber || isError) {
        error()
        return
    } else {
        savedNumber = +savedNumber
        currentNumber = +currentNumber
        console.log(currentNumber)
        switch (operator) {
            case "+":
                result = savedNumber + currentNumber
                $screen.textContent = `${result}`
                break;
            case "-":
                result = savedNumber + currentNumber
                $screen.textContent = `${result}`
                break;
            case "x":
                result = savedNumber + currentNumber
                $screen.textContent = `${result}`
                break;
            case "÷":
                if (currentNumber === 0) {
                    error()
                    return
                }
                result = savedNumber + currentNumber
                $screen.textContent = `${result}`
                break;
            default:
                //Statements executed when none of
                //the values match the value of the expression
                break;
        }
    }

}

function clear() {
    $screen.textContent = ""
    currentNumber = undefined
    savedNumber = undefined
    operatorChosen = false
    operator = undefined
    isError = false;

}
function error() {
    clear()
    isError = true
    $screen.textContent = "Error"
}

function selectOperator(event) {
    if (isError)
        return
    if (!operatorChosen) {
        savedNumber = currentNumber
        operator = event.target.textContent
        $screen.textContent = $screen.textContent + event.target.textContent
        currentNumber = undefined
        operatorChosen = true
    } else
        error()
}

