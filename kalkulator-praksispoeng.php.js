/**
 * Draws out HTML framework and adds functionality to it for a visual and interactive calculator tool.
 * @author Ole Brede, Terje Rudi.
 */
 async function startPraksispoengKalkulator(){
    document.currentScript.insertAdjacentHTML('afterend', `
    <details class="Praksispoeng">
        <summary>Praksispoeng&shy;kalkulator</summary>
	</details>
    `)
    document.querySelector('.Praksispoeng').appendChild(document.currentScript)
    document.querySelector('.Praksispoeng').querySelector('summary').insertAdjacentHTML('afterend', `
    <style>
        .Praksispoeng {padding: 1.2rem 2.4rem;border-radius: 1rem;box-shadow: .4rem .4rem 1rem rgba(0,0,0,.3);width: clamp(20rem,100%,36rem);margin-bottom: 2rem;}
        .Praksispoeng summary {cursor: pointer;font-weight: bold; color: #004357;}
        .descriptionCalculator {font-size: .8em;margin: 2rem 0;padding-bottom: 1rem;border-bottom: dotted 1px grey;}
        .descriptionCalculator summary {cursor: pointer;font-weight: bold;}
        .practiceCalculatorForm table {margin-bottom: 2rem;}
        .practiceCalculatorForm table th {font-size: .8rem;color: #008aa5;vertical-align: top;padding-left: .2rem;border-left: dotted 1px #ddd;}
        .practiceCalculatorForm table th:first-child {border: none;}
        .practiceCalculatorForm table th:after {content: ":";}
        .practiceCalculatorForm table td {vertical-align: baseline;}
        .practiceCalculatorForm table td:last-child {text-align: right;}
        .practiceCalculatorForm table tbody tr td {border-bottom: dotted 1px #ddd;}
        .practiceCalculatorForm table tbody tr:last-child td {border-bottom: dotted 1px grey;}
        .practiceCalculatorForm table tbody tr td input {width: calc(100% - 1.2rem);margin: .3rem 0;color: #004357;font-size: small;}
        .practiceCalculatorForm table tfoot tr td {vertical-align: bottom;}
        .practiceCalculatorForm table tfoot tr td, .countingMonths, .praksisPoints {border-bottom: dotted 1px grey;padding: .4rem 0;font-style: italic;color: #008aa5;}

        .utregning {padding-left: 1.2rem;border-left: dotted 1px #ddd;}
        .utregning p {margin: 0 0 .2 0;padding-top: 0;}
        .countingMonths span, .praksisPoints span {color: black;font-weight: bold;}
        .practiceCalculatorForm table tfoot tr:last-child td:last-child {font-weight: bold;font-style: normal;color: black;}
        .countingMonths::before {content: "Tellende måneder: ";}
        .countingMonths::after {content: " (Måneder i 100% - måneder som trekkes)";}
        .praksisPoints::before {content: "Praksispoeng: ";}
        .praksisPoints::after {content: " (Tellende måneder / 12 × 2)";}
    </style>
    <div class="descriptionCalculator">
        <details><summary>Hjelp</summary>
        <ul>
            <li>Tast inn startdato, sluttdato og stillingsprosent i de respektive feltene. Ny rad opprettes automatisk, men bruk <em>tabulator</em> for å gå til neste rad.</li>
            <li>2 praksispoeng = 12 tellende måneder.</li>
            <li>Maks 6 praksispoeng blir tildelt.</li>
            <li>Utregningen ser du nederst i kalkulatoren.</li>
        </ul>
        </details>
    </div>
    <form class="practiceCalculatorForm">
        <table>
            <thead>
                <tr class="tableHeader">
                    <th>Start&shy;dato</th>
                    <th>Slutt&shy;dato</th>
                    <th>Stillings&shy;prosent</th>
                    <th>Ekstra&shy;vakter</th>
                    <th>Måneder i 100% stilling</th>
                </tr>
            </thead>
            <tbody>
                <tr class="praksisInputRow">
                    <td><input type="date" title="Startdato" class="beginDateInput"></td>
                    <td><input type="date" title="Sluttdato" class="endDateInput"></td>
                    <td><input type="number" min="0" max="100" class="percentInput" title="Prosent" placeholder="%"></td>
                    <td><input type="number" min="0" class="extraInput" title="Tall" placeholder="Timer"></td>
                    <td colspan="2" class="summaryColumn monthsValue"></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Sum måneder i 100% stilling:</td>
                    <td colspan="2" class="summaryColumn sumMonths"></td>
                </tr>
            </tfoot>
        </table>
        <table>
            <thead>
                <tr class="tableHeader">
                    <th>År med praksis det er krav om</th>
                    <th>Måneder som trekkes fra</th>
                </tr>
            </thead>
            <tbody>
                <tr class="obligationInputRow">
                    <td><input type="number" min="0" class="obligatedYears" title="Tall" placeholder="År"></td>
                    <td class="summaryColumn minMonths"></td>
                </tr>
            </tbody>
        </table>
        <section class="utregning">
            <p class="countingMonths"></p>
            <p class="praksisPoints"></p>
        </section>
    </form>
    `)

    const form = document.querySelector('.practiceCalculatorForm')

    function addPraksisInputRow(row) {
        if (row.parentElement.querySelectorAll('.praksisInputRow')[row.parentElement.querySelectorAll('.praksisInputRow').length - 1] !== row) {return}

        clone = row.cloneNode(true)

        for (let index = 0; index < clone.querySelectorAll('INPUT').length; index++) {
            const input = clone.querySelectorAll('INPUT')[index];
            input.value = ''
            handlePraksisInputRowInputs(input)
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

    function monthDayCount(date) {
        const count = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        //account for leap years
        count[1] = (date.getFullYear() % 4 === 0 && (date.getFullYear() % 100 !== 0 || date.getFullYear() % 400 === 0)) ? 29 : count[1]

        return count[date.getMonth()]
    }

    function monthDiff(date1, date2) {
        if (date1 > date2) {return}

        let months = (date2.getFullYear() - date1.getFullYear()) * 12
        months -= date1.getMonth()
        months += date2.getMonth()

        if ((date1.getDate() === date2.getDate()) || ((date1.getDate() / monthDayCount(date1) === 1) && (date2.getDate() / monthDayCount(date2) === 1))) {return months}

        if (date1.getDate() > date2.getDate()) {
            months -= (date1.getDate() - date2.getDate()) / 31
        } else {
            months -= ((31 - date2.getDate() + date1.getDate()) / 31) - 1
        }

        return months
    }
    
    //Potentional alternative way of calculating fractional months
    /*
    function monthDiff(date1, date2) {
        if (date1 > date2) {return}

        let months = (date2.getFullYear() - date1.getFullYear()) * 12
        months -= date1.getMonth()
        months += date2.getMonth()

        if (date1.getDate() === date2.getDate()) {return months}

        if (date1.getDate() > date2.getDate()) {
            date2.setMonth(date2.getMonth() - 1)
            months -= (date1.getDate() - date2.getDate()) / monthDayCount(date2)
        } else {
            months += (date2.getDate() - date1.getDate()) / monthDayCount(date2)
        }

        return months
    }
    */

    function showCalculationsRow(row) {
        const beginDateInput = row.querySelector('.beginDateInput')
        const endDateInput = row.querySelector('.endDateInput')
        const percentInput = row.querySelector('.percentInput')
        const extraInput = row.querySelector('.extraInput')
        const monthsValue = row.querySelector('.monthsValue')

        if (beginDateInput.checkValidity() && endDateInput.checkValidity() && percentInput.checkValidity() && beginDateInput.value !== '' && endDateInput.value !== '' && percentInput.value !== '') {
            const monthsValueRaw = parseFloat(monthDiff(beginDateInput.valueAsDate, endDateInput.valueAsDate).toFixed(2))
            const monthsValueAdjusted = parseFloat((monthsValueRaw * percentInput.value / 100).toFixed(2))

            monthsValue.innerHTML = monthsValueAdjusted

            if (extraInput.checkValidity() && extraInput.value !== '') {
                const extraMonths = extraInput.value / 150

                if (extraMonths + monthsValueAdjusted > monthsValueRaw) {
                    monthsValue.innerHTML = monthsValueRaw
                } else {
                    monthsValue.innerHTML = parseFloat((parseFloat(monthsValue.innerHTML) + extraInput.value / 150).toFixed(2))
                }
            }

            monthsValue.innerHTML = parseFloat(monthsValue.innerHTML) > 0 || monthsValue.innerHTML === '0' ? monthsValue.innerHTML : ''

            addPraksisInputRow(row)
        } else {
            monthsValue.innerHTML = ''
        }

        showCalculationsOverall()
    }

    function showCalculationsOverall() {
        const sumMonths = form.querySelector('.sumMonths')
        const minMonths = form.querySelector('.minMonths')
        const countingMonths = form.querySelector('.countingMonths')
        const praksisPoints = form.querySelector('.praksisPoints')
        let sumMonthsValue = 0

        for (let index = 0; index < form.querySelectorAll('.praksisInputRow').length; index++) {
            const row = form.querySelectorAll('.praksisInputRow')[index];
            const monthsValue = row.querySelector('.monthsValue')

            if (monthsValue.innerHTML !== '') {
                sumMonthsValue += parseFloat(monthsValue.innerHTML)
                sumMonths.innerHTML = parseFloat(sumMonthsValue.toFixed(2))
            }
        }

        const monthsSubtract = minMonths.innerHTML !== '' ? minMonths.innerHTML : 0

        if (sumMonthsValue !== 0 && sumMonthsValue - monthsSubtract >= 0) {
            countingMonths.innerHTML = '<span>' + parseFloat((sumMonthsValue - monthsSubtract).toFixed(2)) + '</span>';
            praksisPoints.innerHTML = '<span>' + Math.min(parseFloat((Math.floor((sumMonthsValue - monthsSubtract) / 12) * 2).toFixed(2)), 6) + '</span>';
        } else {
            countingMonths.innerHTML = ''
            praksisPoints.innerHTML = ''
        }

        if (sumMonthsValue === 0) {
            sumMonths.innerHTML = ''
        }

        updateCompCalculator()
    }

    function updateCompCalculator() {
        const praksisPoints = form.querySelector('.praksisPoints')
        const compForm = document.querySelector('.compCalculatorForm')

        if (compForm) {
            const compPraksisPoints = compForm.querySelector('.pracPoint')

            if (praksisPoints.innerHTML !== compPraksisPoints.innerHTML && praksisPoints.innerHTML !== '') {
                compPraksisPoints.innerHTML = praksisPoints.innerHTML
            } else if (praksisPoints.innerHTML === '') {
                compPraksisPoints.innerHTML = '<span>0</span>'
            }

            const compGradePoints = compForm.querySelector('.gradePoint')
            const compEduPointValue = compForm.querySelector('.eduPoint')
            const compPoint = compForm.querySelector('.compPoint')

            if (compGradePoints.innerHTML !== '0' || compEduPointValue.innerHTML !== '0' || compPraksisPoints.innerHTML !== '0') {
                compPoint.innerHTML = parseFloat(compGradePoints.querySelector('span').innerHTML) + parseInt(compEduPointValue.innerHTML) + parseInt(compPraksisPoints.querySelector('span').innerHTML)
            } else if (compPoint.innerHTML !== '0') {
                compPoint.innerHTML = '0'
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

    function handlePraksisInputRowInputs(input) {
        input.addEventListener('input', () => {
            showCalculationsRow(input.parentElement.parentElement)
        })

        reportValidityBlur(input)
        enterToNextInput(input)
    }

    {
        const obligatedYears = form.querySelector('.obligatedYears')
        const minMonths = form.querySelector('.minMonths')

        obligatedYears.addEventListener('input', () => {
            if (obligatedYears.checkValidity() && obligatedYears.value !== '') {
                minMonths.innerHTML = obligatedYears.value * 12
            } else {
                minMonths.innerHTML = ''
            }

            showCalculationsOverall()
        })

        reportValidityBlur(obligatedYears)
        enterToNextInput(obligatedYears)
    }

    //Add events to already existing inputs
    for (let index = 0; index < form.querySelectorAll('.praksisInputRow input').length; index++) {
        const input = form.querySelectorAll('.praksisInputRow input')[index];
        handlePraksisInputRowInputs(input)
    }
}

startPraksispoengKalkulator()