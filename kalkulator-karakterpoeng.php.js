/**
 * Draws out HTML framework and adds functionality to it for a visual and interactive calculator tool.
 * @author Ole Brede, Terje Rudi.
 */
 async function startKarakterpoengKalkulator(){
    document.currentScript.insertAdjacentHTML('afterend', `
    <details class="Karakterpoeng">
        <summary>Karakterpoeng&shy;kalkulator</summary>
	</details>
    `)
    document.querySelector('.Karakterpoeng').appendChild(document.currentScript)
    document.querySelector('.Karakterpoeng').querySelector('summary').insertAdjacentHTML('afterend', `
    <style>
        .Karakterpoeng {padding: 1.2rem 2.4rem;border-radius: 1rem;box-shadow: .4rem .4rem 1rem rgba(0,0,0,.3);width: clamp(20rem,100%,36rem);margin-bottom: 2rem;}
        .Karakterpoeng summary {cursor: pointer;font-weight: bold; color: #004357;}
        .descriptionCalculator {font-size: .8em;margin: 2rem 0;padding-bottom: 1rem;border-bottom: dotted 1px grey;}
        .descriptionCalculator summary {cursor: pointer;font-weight: bold;}
        .calculatorForm table {margin-bottom: 2rem;}
        .calculatorForm table th {font-size: .8rem;color: #008aa5;vertical-align: top;padding-left: .2rem;border-left: dotted 1px #ddd;}
        .calculatorForm table th:first-child {border: none;}
        .calculatorForm table th:after {content: ":";}
        .calculatorForm table td {vertical-align: baseline;}
        .calculatorForm table td:last-child {text-align: right;}
        .calculatorForm table tbody tr td {border-bottom: dotted 1px #ddd;}
        .calculatorForm table tbody tr:last-child td {border-bottom: dotted 1px grey;}
        .calculatorForm table tbody tr td input {width: calc(100% - 1.2rem);margin: .3rem 0;text-align: center;font-weight: bold;color: #004357;}
        .calculatorForm table tfoot tr td {vertical-align: bottom;}
        .calculatorForm table tfoot tr td, .gradeAvg, .gradePoints {border-bottom: dotted 1px grey;padding: .4rem 0;font-style: italic;color: #008aa5;}

        .utregning {padding-left: 1.2rem;border-left: dotted 1px #ddd;}
        .utregning p {margin: 0 0 .2 0;padding-top: 0;}
        .gradeAvg span, .gradePoints span {color: black;font-weight: bold;}
        .calculatorForm table tfoot tr:last-child td:last-child {font-weight: bold;font-style: normal;color: black;}
        .sumPoints {text-align: center;}
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
                    <th>Bokstav&shy;karakter</th>
                    <th>Studie&shy;poeng</th>
                    <th>Karakters tall&shy;verdi<br>&times; studie&shy;poeng</th>
                </tr>
            </thead>
            <tbody>
                <tr class="gradeInputsRow">
                    <td><input type="text" maxlength="1" pattern="[A-Fa-f]{1}" title="Bokstav A-F" class="gradeInput" placeholder="A-F"></td>
                    <td><input type="number" min="0" step="0.1" class="pointInput" title="Tall" placeholder="Tall"></td>
                    <td class="summaryColumn pointValue"></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Sum:</td>
                    <td class="sumPoints"></td>
                    <td class="sumNumxPoints"></td>
                </tr>
            </tfoot>
        </table>
        <section class="utregning">
            <p class="gradeAvg"></p>
            <p class="gradePoints"></p>
        </section>
    </form>
    `)

    const form = document.querySelector('.calculatorForm')

    /**
     * Adds a clone of row below row
     * @param {object} row htmldomobject
     */
    function addGradeInputRow(row) {
        if (row.parentElement.querySelectorAll('.gradeInputsRow')[row.parentElement.querySelectorAll('.gradeInputsRow').length - 1] !== row) {return}

        clone = row.cloneNode(true)

        for (let index = 0; index < clone.querySelectorAll('INPUT').length; index++) {
            const input = clone.querySelectorAll('INPUT')[index];
            input.value = ''
            handleGradeInputsRowInputs(input)
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
    function showCalculationsRow(row) {
        const gradeInput = row.querySelector('.gradeInput')
        const pointInput = row.querySelector('.pointInput')
        const pointValue = row.querySelector('.pointValue')

        if (gradeInput.checkValidity() && pointInput.checkValidity() && gradeInput.value !== '' && pointInput.value !== '') {
            pointValue.innerHTML = parseFloat((pointInput.value * ((gradeInput.value.toUpperCase().charCodeAt(0) / -1) + 70)).toFixed(1))

            addGradeInputRow(row)
        } else {
            pointValue.innerHTML = ''
        }

        showCalculationsOverall()
    }

    /**
     * calculates all rows and shows results
     */
    function showCalculationsOverall() {
        const sumPoints = form.querySelector('.sumPoints')
        const sumNumxPoints = form.querySelector('.sumNumxPoints')
        const gradeAvg = form.querySelector('.gradeAvg')
        const gradePoints = form.querySelector('.gradePoints')
        let sumPointsValue = 0
        let sumNumxPointsValue = 0

        for (let index = 0; index < form.querySelectorAll('.gradeInputsRow').length; index++) {
            const row = form.querySelectorAll('.gradeInputsRow')[index];
            const pointInput = row.querySelector('.pointInput')
            const pointValue = row.querySelector('.pointValue')

            if (pointInput.value !== '' && pointValue.innerHTML !== '') {
                sumPointsValue += parseFloat(pointInput.value)
                sumNumxPointsValue += parseFloat(pointValue.innerHTML)
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

        updateCompCalculator()
    }

    function updateCompCalculator() {
        const gradePoints = form.querySelector('.gradePoints')
        const compForm = document.querySelector('.compCalculatorForm')

        if (compForm) {
            const compGradePoints = compForm.querySelector('.gradePoint')

            if (gradePoints.innerHTML !== compGradePoints.innerHTML) {
                compGradePoints.innerHTML = gradePoints.innerHTML
            }

            const compEduPointValue = compForm.querySelector('.eduPoint')
            const compPraksisPoints = compForm.querySelector('.pracPoint')
            const compPoint = compForm.querySelector('.compPoint')

            if (compGradePoints.innerHTML !== '' && compEduPointValue.innerHTML !== '' && compPraksisPoints.innerHTML !== '') {
                compPoint.innerHTML = parseFloat(compGradePoints.querySelector('span').innerHTML) + parseInt(compEduPointValue.innerHTML) + parseInt(compPraksisPoints.querySelector('span').innerHTML)
            } else if (compPoint.innerHTML !== '') {
                compPoint.innerHTML = ''
            }
        }
    }

    /**
     * removes excess input rows
     */
    function removeEmptyGradeInput() {
        const activeElementClass = document.activeElement.classList.contains('gradeInput') ? 'gradeInput' : document.activeElement.classList.contains('pointInput') ? 'pointInput' : undefined

        for (let index = form.querySelectorAll('.gradeInputsRow').length - 2; index >= 0; index--) {
            const row = form.querySelectorAll('.gradeInputsRow')[index];
            const gradeInput = row.querySelector('.gradeInput')
            const pointInput = row.querySelector('.pointInput')

            if (gradeInput.value === '' && pointInput.value === '') {
                if (document.activeElement.parentElement.parentElement === row) {
                    form.querySelectorAll('.gradeInputsRow')[form.querySelectorAll('gradeInputsRow').length - 1].querySelector(`.${activeElementClass}`)[0].select()
                }
                row.remove()
            } else if (gradeInput.value === '' || pointInput.value === '') {
                form.querySelectorAll('.gradeInputsRow')[form.querySelectorAll('.gradeInputsRow').length - 1].remove()
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
                const inputs = Array.from(form.querySelectorAll('INPUT'))
                const next = event.shiftKey ? -1 : 1
                const input = inputs[inputs.indexOf(element) + next]
                if (input) {
                    input.select()
                }
            }
        })
    }

    /**
     * Handles all the events for elements with the gradeInputsRow class
     * @param {object} element htmldomobject
     */
    function handleGradeInputsRowInputs(input) {
        input.addEventListener('input', () => {
            let row = input.parentElement.parentElement

            if (input.classList.contains('gradeInput')) {
                if (parseInt(input.value) <= 5 || input.value === '0') {
                    input.value = String.fromCharCode((input.value / -1) + 70)
                }

                if (input.checkValidity() && input.value !== '') {
                    input.value = input.value.toUpperCase()
                    row.querySelector('.pointInput').select()
                }
            }

            showCalculationsRow(row)
            removeEmptyGradeInput()
        })

        reportValidityBlur(input)
        enterToNextInput(input)
    }

    //Add events to already existing inputs
    for (let index = 0; index < form.querySelectorAll('.gradeInputsRow input').length; index++) {
        const input = form.querySelectorAll('.gradeInputsRow input')[index];
        handleGradeInputsRowInputs(input)
    }
}

startKarakterpoengKalkulator();