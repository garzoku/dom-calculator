
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
    '*': function (x, y) { return x * y },
    '÷': function (x, y) { return x / y },
    '/': function (x, y) { return x / y },
}

$numberButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (result) {
            clear()
            $screen.value = ""
        }
        setCurrentValue(event.target.textContent)
        setScreenValue(event.target.textContent)
    })
})
// Add listeners to +, -, /, *
$operatorButtons.forEach(button => {
    if (result) {
        clear()
        $screen.value = ""
    }
    if (!button.id)
        button.addEventListener("click", (event) => {
            setOperator(event.target.textContent)
            saveCurrentValue()
            setScreenValue(event.target.textContent)
        })
})

$equalsButton.addEventListener("click", (event) => {
    calculate()
})

$clearButton.addEventListener("click", (event) => {
    clear()
    $screen.value = ""
})

function getNumberButtons() {
    let buttons = []
    for (const button of allButtons) {
        if (!button.classList.contains("operator"))
            buttons.push(button)
    }
    return buttons
}

function setCurrentValue(value) {
    if (isError)
        return
    if (!currentValue)
        currentValue = value
    else
        currentValue = currentValue + value
}

function saveCurrentValue() {
    if (isError)
        return
    savedValue = currentValue
    currentValue = undefined
}

function setScreenValue(value) {
    if (!isError) {
        if (!$screen.value)
            $screen.value = value
        else
            $screen.value = $screen.value + value
    } else
        $screen.value = "Error"
}

function setOperator(value) {
    if (!operator)
        operator = value
    else
        error()
}

function clear() {
    currentValue = undefined
    savedValue = undefined
    isError = false;
    operator = undefined
    result = undefined

}

function error() {
    isError = true
    $screen.value = "Error"
}

function calculate() {
    if (isError)
        return
    if (operator === "÷"
        || operator === "/"
        && currentValue === "0") {
        error()
        return
    }
    if (operator === undefined
        || savedValue === undefined
        || currentValue === undefined) {
        error()
        return
    }
    $screen.value = ""
    result = operation[operator](+savedValue, +currentValue)
    setScreenValue(result)
}

//Keypress Map
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ("1"):
        case ("2"):
        case ("3"):
        case ("4"):
        case ("5"):
        case ("6"):
        case ("7"):
        case ("8"):
        case ("9"):
        case ("0"):
            if (result) {
                clear()
                $screen.value = ""
            }
            setCurrentValue(event.key)
            setScreenValue(event.key)
            break;
        case ("+"):
        case ("-"):
        case ("x"):
        case ("÷"):
        case ("*"):
        case ("/"):
            if (result) {
                clear()
                $screen.value = ""
            }
            setOperator(event.key)
            saveCurrentValue()
            setScreenValue(event.key)
            break;
        case ("="):
        case ("Enter"):
            calculate()
            break;
        case ("Escape"):
            clear()
            $screen.value = ""
            break;
        default:
            break;
    }
});