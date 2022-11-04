/*
todo: 
sletting av rader logiken er ikke ferdig lagt
*/

/*
questions/considerations:
create html in js instead of index.html?
use 0-5 in bokstavkarakter input og konverter til bokstavkarakter (0-5 = F-A)
use enter in inputs to move to next input as an alternative to tab
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

            if (pointInput.value !== '' || pointValue.innerHTML !== '') {
                sumPointsValue += parseInt(pointInput.value)
                sumNumxPointsValue += parseInt(pointValue.innerHTML)
                sumPoints.innerHTML = `Sum studiepoeng: ${sumPointsValue}`
                sumNumxPoints.innerHTML = `Sum tallverdi x studiepoeng: ${sumNumxPointsValue}`
            }
        }
    }

    if (sumPointsValue !== 0 || sumNumxPointsValue !== 0) {
        gradeAvg.innerHTML = `Karaktersnitt: ${parseFloat((sumNumxPointsValue / sumPointsValue).toFixed(3))}`
        gradePoints.innerHTML = `Karakterpoeng: ${parseFloat((sumNumxPointsValue / sumPointsValue * 10).toFixed(2))}`
    } else {
        sumPoints.innerHTML = 'Sum studiepoeng: '
        sumNumxPoints.innerHTML = 'Sum tallverdi x studiepoeng: '
        gradeAvg.innerHTML = 'Karaktersnitt: '
        gradePoints.innerHTML = 'Karakterpoeng: '
    }
}

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

    for (let index = 0; index < clone.getElementsByTagName('P').length; index++) {
        const element = clone.getElementsByTagName('P')[index];
        element.innerHTML = ''
    }

    row.insertAdjacentElement('afterend', clone)
}

function removeEmptyGradeInput() {
    const activeElementClass = document.activeElement.classList.contains('gradeInput') ? 'gradeInput' : document.activeElement.classList.contains('pointInput') ? 'pointInput' : undefined
    for (let index = document.getElementsByClassName('gradeInputsRow').length - 2; index > 0; index--) {
        const section = document.getElementsByClassName('gradeInputsRow')[index];
        
        if (section.getElementsByTagName('INPUT').length !== 0) {
            const gradeInput = section.getElementsByClassName('gradeInput')[0]
            const pointInput = section.getElementsByClassName('pointInput')[0]

            if (gradeInput.value === '' && pointInput.value === '') {
                if (document.activeElement.parentElement.parentElement === section) {
                    document.getElementsByClassName('gradeInputsRow')[document.getElementsByClassName('gradeInputsRow').length - 1].getElementsByClassName(activeElementClass)[0].focus()
                }
                section.remove()
            } else if (gradeInput.value === '' || pointInput.value === '') {
                console.log(section)
                document.getElementsByClassName('gradeInputsRow')[document.getElementsByClassName('gradeInputsRow').length - 1].remove()
                return
            } else {
                return
            }
        }
    }
}

function handleGradeInput(element) {
    element.addEventListener('input', () => {
        const pointInput = element.parentElement.parentElement.getElementsByClassName('pointInput')[0]
        
        element.value = element.value.toUpperCase()

        if (element.checkValidity() && element.value !== '') {
            pointInput.focus()

            if (pointInput.value !== '') {
                if (document.getElementsByClassName('gradeInput')[document.getElementsByClassName('gradeInput').length - 1] === element) {
                    addGradeInput(element.parentElement.parentElement)
                }
            }
        }
        showCalculationsGradeInputs(element.parentElement.parentElement)
        showCalculationsGradePoints()
        removeEmptyGradeInput()
    })

    element.addEventListener('blur', () => {
        element.reportValidity()
    })
}

function handlePointInput(element) {
    element.addEventListener('input', () => {
        const gradeInput = element.parentElement.parentElement.getElementsByClassName('gradeInput')[0]

        if (element.checkValidity() && element.value !== '') {
            if (gradeInput.value !== '') {
                if (document.getElementsByClassName('pointInput')[document.getElementsByClassName('pointInput').length - 1] === element) {
                    addGradeInput(element.parentElement.parentElement)
                }
            }
        }
        showCalculationsGradeInputs(element.parentElement.parentElement)
        showCalculationsGradePoints()
        removeEmptyGradeInput()
    })

    element.addEventListener('blur', () => {
        element.reportValidity()
    })
}

//Handle already existing inputs
for (let index = 0; index < document.getElementsByClassName('gradeInput').length; index++) {
    const element = document.getElementsByClassName('gradeInput')[index];
    handleGradeInput(element)
}

for (let index = 0; index < document.getElementsByClassName('pointInput').length; index++) {
    const element = document.getElementsByClassName('pointInput')[index];
    handlePointInput(element)
}