/**
 * Draws out HTML framework and adds functionality to it for a visual and interactive calculator tool.
 * @author Ole Brede, Terje Rudi.
 */
 async function startPraksispoengKalkulator(){
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
            <li>senere</li>
            <li>senere</li>
            <li>senere</li>
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
                    <td colspan="2" "class="summaryColumn monthsValue"></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Sum måneder i 100% stilling:</td>
                    <td colspan="2" "class="summaryColumn sumMonths"></td>
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
                    <td><input type="number" min="0" class="extraInput" title="Tall" placeholder="År"></td>
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

    function showCalculationsRow(row) {
        const beginDateInput = row.querySelector('.beginDateInput')
        const endDateInput = row.querySelector('.endDateInput')
        const percentInput = row.querySelector('.percentInput')
        const extraInput = row.querySelector('.extraInput')
        const monthsValue = form.querySelector('.monthsValue')
        console.log(sumMonths)

        if (beginDateInput.checkValidity() && endDateInput.checkValidity() && percentInput.checkValidity() && beginDateInput.value !== '' && endDateInput.value !== '' && percentInput.value !== '') {
            monthsValue.innerHTML = 'lol'
        }
    }

    function handleBeginDateInput(input) {
        input.addEventListener('input', () => {
            if (input.checkValidity() && input.value !== '') {
                showCalculationsRow(input.parentElement.parentElement)
            }
        })
    }

    //Add events to already existing inputs
    for (let index = 0; index < form.querySelectorAll('.beginDateInput').length; index++) {
        const element = form.querySelectorAll('.beginDateInput')[index];
        handleBeginDateInput(element)
    }
}

startPraksispoengKalkulator()