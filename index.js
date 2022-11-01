function showCalculationsGradeInputs(div) {
    let gradeInput = div.getElementsByClassName('gradeInput')[0]
    let pointInput = div.getElementsByClassName('pointInput')[0]
    let numberValue = div.getElementsByClassName('numberValue').length !== 0 ? div.getElementsByClassName('numberValue')[0] : undefined
    let pointValue = div.getElementsByClassName('pointValue').length !== 0 ? div.getElementsByClassName('pointValue')[0] : undefined

    if (gradeInput.checkValidity() && pointInput.checkValidity()) {
        if (gradeInput.value !== '') {
            if (!numberValue) {
                let p = document.createElement('P')
                p.setAttribute('class', 'numberValue')
                p.innerHTML = (gradeInput.value.toUpperCase().charCodeAt(0) / -1) + 70
                div.appendChild(p)
                numberValue = p
            } else {
                numberValue.innerHTML = (gradeInput.value.toUpperCase().charCodeAt(0) / -1) + 70
            }
        } else {
            if (numberValue) {
                numberValue.remove()
                numberValue = undefined
            }
        }
    
        if (pointInput.value !== '' && numberValue) {
            if (!pointValue) {
                let p = document.createElement('P')
                p.setAttribute('class', 'pointValue')
                p.innerHTML = pointInput.value * numberValue.innerHTML
                div.appendChild(p)
            } else {
                pointValue.innerHTML = pointInput.value * numberValue.innerHTML
            }
        } else {
            if (pointValue) {
                pointValue.remove()
                pointValue = undefined
            }
        }
    }
}

function showCalculationsGradePoints() {
    
}

function addGradeInput(div) {
    clone = div.cloneNode(true)

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
        element.remove()
    }

    div.insertAdjacentElement('afterend', clone)
}

function handleGradeInput(element) {
    element.addEventListener('input', () => {
        element.value.toUpperCase()

        if (element.checkValidity() && element.value !== '') {
            let nextInput = element.nextSibling
            while(nextInput && nextInput.tagName !== 'INPUT') {
                nextInput = nextInput.nextSibling
            }
            nextInput.focus()

            if (element.parentElement.getElementsByClassName('pointInput')[0].value !== '') {
                if (document.getElementsByClassName('gradeInput')[document.getElementsByClassName('gradeInput').length - 1] === element) {
                    addGradeInput(element.parentElement)
                }
            }
        }
        showCalculationsGradeInputs(element.parentElement)
    })

    element.addEventListener('blur', () => {
        element.reportValidity()
    })
}

function handlePointInput(element) {
    element.addEventListener('input', () => {
        if (element.checkValidity() && element.value !== '') {
            if (element.parentElement.getElementsByClassName('gradeInput')[0].value !== '') {
                if (document.getElementsByClassName('pointInput')[document.getElementsByClassName('pointInput').length - 1] === element) {
                    addGradeInput(element.parentElement)
                }
            }
        }
        showCalculationsGradeInputs(element.parentElement)
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