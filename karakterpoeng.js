{
    document.currentScript.parentElement.querySelector('.karakterkalk').innerHTML = 
    `
    <style>
        #kalk {padding: 1.2rem 2.4rem;border-radius: 1rem;box-shadow: .4rem .4rem 1rem rgba(0,0,0,.3);width: clamp(20rem,100%,36rem);margin-bottom: 2rem;}
        #kalk summary {cursor: pointer;font-weight: bold; color: #004357;}
        .karakterkalk .descriptionCalculator {font-size: .8em;margin: 2rem 0;padding-bottom: 1rem;border-bottom: dotted 1px grey;}
        .karakterkalk .descriptionCalculator summary {cursor: pointer;font-weight: bold;}
        .calculatorForm table {margin-bottom: 2rem;}
        .calculatorForm table th {font-size: .8rem;color: #008aa5;vertical-align: top;padding-left: .2rem;border-left: dotted 1px #ddd;}
        .calculatorForm table th:first-child {border: none;}
        .calculatorForm table th:after {content: ":";}
        .calculatorForm table td {vertical-align: baseline;}
        .calculatorForm table td:last-child {text-align: right;}
        .calculatorForm table tbody tr td {border-bottom: dotted 1px #ddd;}
        .calculatorForm table tbody tr:last-child td {border-bottom: dotted 1px grey;}
        .calculatorForm table tbody tr td input {max-width: 8rem;margin: .3rem 0;text-align: center;font-weight: bold;color: #004357;}
        .calculatorForm table tfoot tr td, .gradeAvg, .gradePoints {border-bottom: dotted 1px grey;padding: .4rem 0;font-style: italic;color: #008aa5;}
        .utregning {padding-left: 1.2rem;border-left: dotted 1px #ddd;}
        .utregning p {margin: 0 0 .2 0;padding-top: 0;}
        .gradeAvg span, .gradePoints span {color: black;font-weight: bold;}
        .calculatorForm table tfoot tr:last-child td:last-child {font-weight: bold;font-style: normal;color: black;}
        .gradeAvg::before {content: "Karaktersnitt: ";}
        .gradeAvg::after {content: " (Sum tallverdi × studiepoeng / sum studiepoeng)";}
        .gradePoints::before {content: "Karakterpoeng: ";}
        .gradePoints::after {content: " (Karaktersnitt × 10)";}
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
    <form class="calculatorForm">
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
                    <td><input type="text" maxlength="1" pattern="[A-Fa-f]{1}" title="Bokstav A-F" class="gradeInput" placeholder="A-F"></td>
                    <td><input type="number" min="0" class="pointInput" title="Tall" placeholder="Tall"></td>
                    <td class="summaryColumn pointValue"></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Sum studiepoeng:</td>
                    <td class="sumPoints"></td>
                </tr>
                <tr>
                    <td colspan="2">Sum tallverdi &times; studiepoeng:</td>
                    <td class="sumNumxPoints"></td>
                </tr>
            </tfoot>
        </table>
        <section class="utregning">
            <p class="gradeAvg"></p>
            <p class="gradePoints"></p>
        </section>
    </form>
    `;

    const gradeForm = document.currentScript.parentElement.querySelector('.calculatorForm')

    /**
     * Adds a clone of row below row
     * @param {object} row htmldomobject
     */
    function addGradeInput(row) {
        clone = row.cloneNode(true)

        for (let index = 0; index < clone.querySelectorAll('INPUT').length; index++) {
            const element = clone.querySelectorAll('INPUT')[index];
            element.value = ''
            
            if (element.classList.contains('gradeInput')) {
                handleGradeInput(element)
            }

            if (element.classList.contains('pointInput')) {
                handlePointInput(element)
            }
        }

        for (let index = 0; index < clone.querySelectorAll('TD').length; index++) {
            const element = clone.querySelectorAll('TD')[index];
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
        const gradeInput = row.querySelector('.gradeInput')
        const pointInput = row.querySelector('.pointInput')
        const pointValue = row.querySelector('.pointValue')

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
        const sumPoints = gradeForm.querySelector('.sumPoints')
        const sumNumxPoints = gradeForm.querySelector('.sumNumxPoints')
        const gradeAvg = gradeForm.querySelector('.gradeAvg')
        const gradePoints = gradeForm.querySelector('.gradePoints')
        let sumPointsValue = 0
        let sumNumxPointsValue = 0

        for (let index = 0; index < gradeForm.querySelectorAll('.gradeInputsRow').length; index++) {
            const row = gradeForm.querySelectorAll('.gradeInputsRow')[index];
            const pointInput = row.querySelector('.pointInput')
            const pointValue = row.querySelector('.pointValue')

            if (pointInput.value !== '' && pointValue.innerHTML !== '') {
                sumPointsValue += parseInt(pointInput.value)
                sumNumxPointsValue += parseInt(pointValue.innerHTML)
                sumPoints.innerHTML = sumPointsValue
                sumNumxPoints.innerHTML = sumNumxPointsValue
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
        
        for (let index = gradeForm.querySelectorAll('.gradeInputsRow').length - 2; index >= 0; index--) {
            const row = gradeForm.querySelectorAll('.gradeInputsRow')[index];
            const gradeInput = row.querySelector('.gradeInput')
            const pointInput = row.querySelector('.pointInput')

            if (gradeInput.value === '' && pointInput.value === '') {
                if (document.activeElement.parentElement.parentElement === row) {
                    gradeForm.querySelectorAll('.gradeInputsRow')[gradeForm.querySelectorAll('gradeInputsRow').length - 1].querySelector(`.${activeElementClass}`)[0].select()
                }
                row.remove()
            } else if (gradeInput.value === '' || pointInput.value === '') {
                gradeForm.querySelectorAll('.gradeInputsRow')[gradeForm.querySelectorAll('.gradeInputsRow').length - 1].remove()
                return
            } else {
                return
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
                const inputs = Array.from(gradeForm.querySelectorAll('INPUT'))
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
            const pointInput = element.parentElement.parentElement.querySelector('.pointInput')
            const lastGradeInput = gradeForm.querySelectorAll('.gradeInput')[gradeForm.querySelectorAll('.gradeInput').length - 1]

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
            const gradeInput = element.parentElement.parentElement.querySelector('.gradeInput')
            const lastPointInput = gradeForm.querySelectorAll('.pointInput')[gradeForm.querySelectorAll('.pointInput').length - 1]

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
    for (let index = 0; index < gradeForm.querySelectorAll('.gradeInput').length; index++) {
        const element = gradeForm.querySelectorAll('.gradeInput')[index];
        handleGradeInput(element)
    }

    for (let index = 0; index < gradeForm.querySelectorAll('.pointInput').length; index++) {
        const element = gradeForm.querySelectorAll('.pointInput')[index];
        handlePointInput(element)
    }
}