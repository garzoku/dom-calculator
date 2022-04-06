
const allButtons = document.querySelectorAll("span")
const $numberButtons = getNumberButtons()
const $operatorButtons = document.querySelectorAll(".operator")
const $screen = document.querySelector("#screen")
const $clearButton = document.querySelector("#clear")
const $equalsButton = document.querySelector("#equals")
let isError = false
let currentValue
let savedValue
let operator
let result

const operation = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    'x': function (x, y) { return x * y },
    '÷': function (x, y) { return x / y },
}

$numberButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (result) {
            clearValues()
            $screen.textContent = ""
        }
        setCurrentValue(event)
        setScreenValue(event.target.textContent)
    })
})
// Add listeners to +, -, /, *
$operatorButtons.forEach(button => {
    if (result) {
        clearValues()
        $screen.textContent = ""
    }
    if (!button.id)
        button.addEventListener("click", (event) => {
            setOperator(event)
            saveCurrentValue()
            setScreenValue(event.target.textContent)
        })
})


$equalsButton.addEventListener("click", (event) => {
    if (isError)
        return
    if (operator === "÷" && currentValue === "0") {
        error()
        return
    }
    if (operator === undefined
        || savedValue === undefined
        || currentValue === undefined) {
        error()
        return
    }
    $screen.textContent = ""
    result = operation[operator](+savedValue, +currentValue)
    setScreenValue(result)
    console.log(currentValue)
    console.log(savedValue)
})

$clearButton.addEventListener("click", (event) => {
    clearValues()
    $screen.textContent = ""
})

// functions
function getNumberButtons() {
    let buttons = []
    for (const button of allButtons) {
        if (!button.classList.contains("operator"))
            buttons.push(button)
    }
    return buttons
}

function setCurrentValue(event) {
    if (isError)
        return
    if (!currentValue)
        currentValue = event.target.textContent
    else
        currentValue = currentValue + event.target.textContent
    return currentValue
}

function saveCurrentValue() {
    if (isError)
        return
    savedValue = currentValue
    currentValue = undefined
}

function setScreenValue(value) {
    if (!isError) {
        if (!$screen.textContent)
            $screen.textContent = value
        else
            $screen.textContent = $screen.textContent + value
    } else
        $screen.textContent = "Error"
}

function setOperator(event) {
    if (!operator)
        operator = event.target.textContent
    else
        error()
}

function clearValues() {
    currentValue = undefined
    savedValue = undefined
    isError = false;
    operator = undefined
    result = undefined

}

function error() {
    isError = true
    $screen.textContent = "Error"
}


/*const allButtons = document.querySelectorAll("span")
const divideButton = document.querySelector("span:nth-child(2)")
const multiplyButton = document.querySelector("span:nth-child(3)")
const subtractButton = document.querySelector("span:nth-child(7)")
const addButton = document.querySelector("span:nth-child(11)")
const equalsButton = document.querySelector("#equals")
const $screen = document.querySelector("#screen")
const clearButton = document.querySelector("#clearValues")
const operatorButtons = getOperatorButtons()

const numberButtons = getNumberButtons()
let operatorChosen = false;
let isError = false
let operator
let currentNumber
let savedNumber
let result

clearButton.addEventListener("click", (event) => clearValues())
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
    let buttons = []
    for (const button of allButtons) {
        if (!button.classList.contains("operator"))
            buttons.push(button)
    }
    return buttons
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
    const operationButtons = document.querySelectorAll(".operator")
    const buttons = []
    for (const button of operationButtons) {
        if (!button.id)
            buttons.push(button)
    }
    return buttons
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

function clearValues() {
    $screen.textContent = ""
    currentNumber = undefined
    savedNumber = undefined
    operatorChosen = false
    operator = undefined
    isError = false;

}
function error() {
    clearValues()
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
}*/

