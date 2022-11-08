document.getElementById('karakterkalk').innerHTML = 
`
<style>
	#kalk {padding: 1.2rem 2.4rem;border-radius: 1rem;box-shadow: .4rem .4rem 1rem rgba(0,0,0,.3);width: clamp(20rem,100%,36rem);}
	#kalk summary {cursor: pointer;font-weight: bold; color: #004357;}
	#karakterkalk .descriptionCalculator {font-size: .8em;margin: 2rem 0;padding-bottom: 1rem;border-bottom: dotted 1px grey;}
	#karakterkalk .descriptionCalculator summary {cursor: pointer;font-weight: bold;}
	#calculatorForm table {margin-bottom: 2rem;}
	#calculatorForm table th {font-size: .8rem;color: #008aa5;vertical-align: top;padding-left: .2rem;border-left: dotted 1px #ddd;}
	#calculatorForm table th:first-child {border: none;}
	#calculatorForm table th:after {content: ":";}
	#calculatorForm table td {vertical-align: baseline;}
	#calculatorForm table td:last-child {text-align: right;}
	#calculatorForm table tbody tr td {border-bottom: dotted 1px #ddd;}
	#calculatorForm table tbody tr:last-child td {border-bottom: dotted 1px grey;}
	#calculatorForm table tbody tr td input {max-width: 8rem;margin: .3rem 0;text-align: center;font-weight: bold;color: #004357;}
	#calculatorForm table tfoot tr td, #gradeAvg, #gradePoints {border-bottom: dotted 1px grey;padding: .4rem 0;font-style: italic;color: #008aa5;}
	#utregning {padding-left: 1.2rem;border-left: dotted 1px #ddd;}
	#utregning p {margin: 0 0 .2 0;padding-top: 0;}
	#gradeAvg span, #gradePoints span {color: black;font-weight: bold;}
	#calculatorForm table tfoot tr:last-child td:last-child {font-weight: bold;font-style: normal;color: black;}

	#gradeAvg::before {
		content: "Karaktersnitt: ";
	}

	#gradeAvg::after {
		content: " (Sum tallverdi × studiepoeng / sum studiepoeng)";
	}
	
	#gradePoints::before {
		content: "Karakterpoeng: ";
	}

	#gradePoints::after {
		content: " (Karaktersnitt × 10)";
	}
</style>
<div class="descriptionCalculator">
	<details><summary>Hjelp</summary>
	<ul>
		<li>Tast inn bokstavkarakter og studiepoeng i de respektive feltene. Ny rad opprettes automatisk, men bruk <em>tabulator</em> for å gå til neste rad.</li>
		<li>Bokstavkaraktene har verdi henholdsvis <em>5 – 0</em> for bokstavene <em>A – F</em>.</li>
		<li>Utregningen ser du nederst i kalkulatoren.</li>
	</ul>
	</details>
</div>
<form id="calculatorForm">
    <table>
        <thead>
            <tr class="tableHeader">
                <th>Bokstav-<br>karakter</th>
                <th>Studiepoeng</th>
                <th>Karakters tallverdi<br>&times; studiepoeng</th>
            </tr>
        </thead>
        <tbody>
            <tr class="gradeInputsRow">
                <td><input type="text" maxlength="1" pattern="[A-Fa-f]{1}" title="Bokstav fra A til F" class="gradeInput" placeholder="A-F"></td>
                <td><input type="number" min="0" class="pointInput" title="Nummer" placeholder="Tall"></td>
                <td class="summaryColumn pointValue"></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2">Sum studiepoeng:</td>
                <td id="sumPoints"></td>
            </tr>
            <tr>
                <td colspan="2">Sum tallverdi &times; studiepoeng:</td>
                <td id="sumNumxPoints"></td>
            </tr>
        </tfoot>
    </table>
    <section id="utregning">
    	<p id="gradeAvg"></p>
    	<p id="gradePoints"></p>
    </section>
</form>
`;

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
        gradeAvg.innerHTML = '<span>' + parseFloat((sumNumxPointsValue / sumPointsValue).toFixed(3)) + '</span>';
        gradePoints.innerHTML = '<span>' + parseFloat((sumNumxPointsValue / sumPointsValue * 10).toFixed(2)) + '</span>';
    } else {
        sumPoints.innerHTML = ''
        sumNumxPoints.innerHTML = ''
        gradeAvg.innerHTML = ''
        gradePoints.innerHTML = ''
    }
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