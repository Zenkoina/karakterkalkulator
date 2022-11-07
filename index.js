function loadTable(data) {
    data = JSON.parse(data)

    if (data.karakterBeregning) {
        for (let index = 0; index < data.karakterBeregning.length; index++) {
            const value = data.karakterBeregning[index];
            const gradeInputValue = value[0]
            const pointInputValue = value[1]
            const lastGradeInputsRow = document.getElementsByClassName('gradeInputsRow')[document.getElementsByClassName('gradeInputsRow').length - 1]
    
            const row = addGradeInput(lastGradeInputsRow)
            row.getElementsByClassName('gradeInput')[0].value = gradeInputValue
            row.getElementsByClassName('pointInput')[0].value = pointInputValue
            showCalculationsGradeInputs(row)
    
            if (index === 0) {
                for (let index = document.getElementsByClassName('gradeInputsRow').length - 1; index >= 0; index--) {
                    const element = document.getElementsByClassName('gradeInputsRow')[index];
                    
                    if (element !== row) {
                        element.remove()
                    }
                }
            }
        }

        showCalculationsGradePoints()
    }
}

function saveTable() {
    // Create JSON for storage.
    const tableRows = document.querySelectorAll('#calculatorForm table tbody tr');
    const karakterBeregning = [];

    tableRows.forEach((row) => {
        const inputs = row.querySelectorAll('input');
        const v = [];
        inputs.forEach((inp) => {
            v.push(inp.value);
        });
        karakterBeregning.push(v);
    })

    const res = {karakterBeregning};
    document.getElementById('json').innerText = JSON.stringify(res,'','   ');
}

/**
 * Adds a clone of row below row
 * @param {object} row htmldomobject
 */
function addGradeInput(row) {
    clone = row.cloneNode(true)

    for (let index = 0; index < clone.getElementsByTagName('INPUT').length; index++) {
        const element = clone.getElementsByTagName('INPUT')[index];
        element.value = ''
        
        if (element.classList.contains('gradeInput')) {
            handleGradeInput(element)
        }

        if (element.classList.contains('pointInput')) {
            handlePointInput(element)
        }
    }

    for (let index = 0; index < clone.getElementsByTagName('TD').length; index++) {
        const element = clone.getElementsByTagName('TD')[index];
        if (element.children.length === 0) {
            element.innerHTML = ''
        }
    }

    row.insertAdjacentElement('afterend', clone)

    return clone
}

/**
 * calculates individual row and shows results
 * @param {object} row htmldomobject
 */
function showCalculationsGradeInputs(row) {
    const gradeInput = row.getElementsByClassName('gradeInput')[0]
    const pointInput = row.getElementsByClassName('pointInput')[0]
    const pointValue = row.getElementsByClassName('pointValue')[0]

    if (gradeInput.checkValidity() && pointInput.checkValidity() && gradeInput.value !== '' && pointInput.value !== '') {
        pointValue.innerHTML = pointInput.value * ((gradeInput.value.toUpperCase().charCodeAt(0) / -1) + 70)
    } else {
        pointValue.innerHTML = ''
    }
}

/**
 * calculates all rows and shows results
 */
function showCalculationsGradePoints() {
    const sumPoints = document.getElementById('sumPoints')
    const sumNumxPoints = document.getElementById('sumNumxPoints')
    const gradeAvg = document.getElementById('gradeAvg')
    const gradePoints = document.getElementById('gradePoints')
    let sumPointsValue = 0
    let sumNumxPointsValue = 0

    for (let index = 0; index < document.getElementsByClassName('gradeInputsRow').length; index++) {
        const row = document.getElementsByClassName('gradeInputsRow')[index];
        
        if (row.getElementsByTagName('INPUT').length !== 0) {
            const pointInput = row.getElementsByClassName('pointInput')[0]
            const pointValue = row.getElementsByClassName('pointValue')[0]

            if (pointInput.value !== '' && pointValue.innerHTML !== '') {
                sumPointsValue += parseInt(pointInput.value)
                sumNumxPointsValue += parseInt(pointValue.innerHTML)
                sumPoints.innerHTML = sumPointsValue
                sumNumxPoints.innerHTML = sumNumxPointsValue
            }
        }
    }

    if (sumPointsValue !== 0 || sumNumxPointsValue !== 0) {
        gradeAvg.innerHTML = parseFloat((sumNumxPointsValue / sumPointsValue).toFixed(3))
        gradePoints.innerHTML = parseFloat((sumNumxPointsValue / sumPointsValue * 10).toFixed(2))
    } else {
        sumPoints.innerHTML = ''
        sumNumxPoints.innerHTML = ''
        gradeAvg.innerHTML = ''
        gradePoints.innerHTML = ''
    }

    saveTable()
}

/**
 * removes excess input rows
 */
function removeEmptyGradeInput() {
    const activeElementClass = document.activeElement.classList.contains('gradeInput') ? 'gradeInput' : document.activeElement.classList.contains('pointInput') ? 'pointInput' : undefined

    for (let index = document.getElementsByClassName('gradeInputsRow').length - 2; index >= 0; index--) {
        const section = document.getElementsByClassName('gradeInputsRow')[index];
        
        if (section.getElementsByTagName('INPUT').length !== 0) {
            const gradeInput = section.getElementsByClassName('gradeInput')[0]
            const pointInput = section.getElementsByClassName('pointInput')[0]

            if (gradeInput.value === '' && pointInput.value === '') {
                if (document.activeElement.parentElement.parentElement === section) {
                    document.getElementsByClassName('gradeInputsRow')[document.getElementsByClassName('gradeInputsRow').length - 1].getElementsByClassName(activeElementClass)[0].select()
                }
                section.remove()
            } else if (gradeInput.value === '' || pointInput.value === '') {
                document.getElementsByClassName('gradeInputsRow')[document.getElementsByClassName('gradeInputsRow').length - 1].remove()
                return
            } else {
                return
            }
        }
    }
}

/**
 * report the validity of the element on blur
 * @param {object} element htmldomobject
 */
function reportValidityBlur(element) {
    element.addEventListener('blur', () => {
        element.reportValidity()
    })
}

/**
 * If enter is pressed then selects next input in form
 * If shift + enter is pressed then selects previous input in form
 * @param {object} element htmldomobject
 */
function enterToNextInput(element) {
    element.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            const inputs = Array.from(document.getElementById('calculatorForm').getElementsByTagName('INPUT'))
            const next = event.shiftKey ? -1 : 1
            const input = inputs[inputs.indexOf(element) + next]
            if (input) {
                input.select()
            }
        }
    })
}

/**
 * Handles all the events for elements with the gradeInput class 
 * @param {object} element htmldomobject
 */
function handleGradeInput(element) {
    element.addEventListener('input', () => {
        const pointInput = element.parentElement.parentElement.getElementsByClassName('pointInput')[0]
        const lastGradeInput = document.getElementsByClassName('gradeInput')[document.getElementsByClassName('gradeInput').length - 1]

        if (parseInt(element.value) <= 5 || element.value === '0') {
            element.value = String.fromCharCode((element.value / -1) + 70)
        }

        if (element.checkValidity() && element.value !== '') {
            element.value = element.value.toUpperCase()
            pointInput.select()

            if (pointInput.value !== '') {
                if (lastGradeInput === element) {
                    addGradeInput(element.parentElement.parentElement)
                }
            }
        }
        showCalculationsGradeInputs(element.parentElement.parentElement)
        showCalculationsGradePoints()
        removeEmptyGradeInput()
    })

    reportValidityBlur(element)
    enterToNextInput(element)
}

/**
 * Handles all the events for elements with the pointInput class 
 * @param {object} element htmldomobject
 */
function handlePointInput(element) {
    element.addEventListener('input', () => {
        const gradeInput = element.parentElement.parentElement.getElementsByClassName('gradeInput')[0]
        const lastPointInput = document.getElementsByClassName('pointInput')[document.getElementsByClassName('pointInput').length - 1]

        if (element.checkValidity() && element.value !== '') {
            if (gradeInput.value !== '') {
                if (lastPointInput === element) {
                    addGradeInput(element.parentElement.parentElement)
                }
            }
        }
        showCalculationsGradeInputs(element.parentElement.parentElement)
        showCalculationsGradePoints()
        removeEmptyGradeInput()
    })

    reportValidityBlur(element)
    enterToNextInput(element)
}

//Add events to already existing inputs
for (let index = 0; index < document.getElementsByClassName('gradeInput').length; index++) {
    const element = document.getElementsByClassName('gradeInput')[index];
    handleGradeInput(element)
}

for (let index = 0; index < document.getElementsByClassName('pointInput').length; index++) {
    const element = document.getElementsByClassName('pointInput')[index];
    handlePointInput(element)
}