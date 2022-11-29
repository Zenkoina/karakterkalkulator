/**
 * When attached to an eventListener of an element, opens or closes element in full screen.
 */
const fullScreenHTML = '<img src="https://v.hvl.no/grafikk/svg/expand.svg" style="width: 1rem;height: auto" alt="Ikon for ekspansjon av skjerm">';
const notFullScreenHTML = '<big style="font-size: 1.4rem;">&times;</big>';
function toggleFullscreen(realm,screen) {
    if (realm.innerHTML == fullScreenHTML){
        if (screen.requestFullscreen) {
            screen.requestFullscreen();
        } else if (screen.webkitRequestFullscreen) { /* Safari */
            screen.webkitRequestFullscreen();
        } else if (screen.msRequestFullscreen) { /* IE11 */
            screen.msRequestFullscreen();
        }
        
    }else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        
    }
}

/**
 * Draws out HTML framework and adds functionality to it for a visual and interactive calculator tool.
 * @author Ole Brede, Terje Rudi.
 */
 async function startPoengKalkulator(){

    
    document.currentScript.insertAdjacentHTML('afterend', `
    <details id="poengKalkulator" class="poengCalculator">
        <summary>Poeng&shy;kalkulator<button class="menuBtn" title="Fullskjerm av/på" onclick="toggleFullscreen(this,document.getElementById('poengKalkulator'));">${fullScreenHTML}</button></summary>
	</details>
    `)
    document.querySelector('.poengCalculator').appendChild(document.currentScript)
    document.querySelector('.poengCalculator').querySelector('summary').insertAdjacentHTML('afterend', `
    <style>
        .poengCalculator {padding: 1.2rem 2.4rem;border-radius: 1rem;box-shadow: .4rem .4rem 1rem rgba(0,0,0,.3);width: clamp(20rem,100%,36rem);margin-bottom: 2rem;}
        .poengCalculator summary {cursor: pointer;font-weight: bold; color: #004357;}
        .poengCalculator summary .menuBtn {cursor: pointer;float: right;}
        .poengCalculator::backdrop {background-color: white;}
        .poengCalculator>* {max-width: 36rem !important; margin: 0 auto !important}
        :fullscreen {overflow-y: scroll;}
        :-webkit-full-screen {overflow-y: scroll;}
        :-ms-fullscreen {overflow-y: scroll;}

        
        .descriptionCalculator {font-size: .8em;margin: 2rem auto !important;padding-bottom: 1rem;border-bottom: dotted 1px grey;}
        .descriptionCalculator summary {cursor: pointer;font-weight: bold;}
        
        .calculatorForm table {margin-bottom: 2rem;}
        .calculatorForm table th {font-size: .8rem;color: #008aa5;vertical-align: bottom;padding-left: .2rem;border-left: dotted 1px #ddd;}
        .calculatorForm table tbody th {text-align: left;vertical-align: middle;border-left: none;padding-left: none;border-bottom: dotted 1px #ddd;}
        .calculatorForm table thead th:first-child {border: none;}
        .calculatorForm table th:after {content: ":";}
        .calculatorForm table td {vertical-align: baseline;}
        .calculatorForm table td:last-child {text-align: right;}
        .calculatorForm table tbody tr td {border-bottom: dotted 1px #ddd;}
        .calculatorForm table tbody tr:last-child td {border-bottom: dotted 1px grey;}
        .calculatorForm table tbody tr td input {width: calc(100% - 1.2rem);margin: .3rem 0;text-align: center;font-weight: bold;color: #004357;}
        .praksisInputRow table tbody tr:last-child td {padding: .8rem 0;min-height: 2rem;vertical-align: middle;text-align: center;}
        .calculatorForm table tfoot tr td {vertical-align: bottom;}
        .calculatorForm table tfoot tr td, .gradeAvg, .gradePoints, .countingMonths, .praksisPoints {border-bottom: dotted 1px grey;padding: .4rem 0;font-style: italic;color: #008aa5;}
        .calculatorForm table tfoot tr:last-child td:last-child {font-weight: bold;font-style: normal;color: black;}
        
        .Praksispoeng table tbody tr td input {width: calc(100% - 1.2rem);margin: .3rem 0;color: #004357;font-size: small;font-weight: normal;}
        
        .additionalPoints {margin-bottom:1.8rem;padding: 1rem;border-radius: 0.8rem;box-shadow: inset .2rem .2rem .5rem rgba(0,0,0,.2);background-color: #fcfcfc;}
        .additionalPoints details {padding: .8rem;}
        .additionalPoints details summary {color: #777;}
        
        .endCalculation tbody th {font-size: 1.2rem;padding-right: .8rem;}
        .endCalculation {padding-left: 1.2rem;border-left: solid 6px #96de99;}
        .endCalculation p {margin: 0 0 .2 0;padding-top: 0;}
        
        .sumPoints {text-align: center;}
        
        .gradeAvg span, .gradePoints span {color: black;font-weight: bold;}
        .gradeAvg::before {content: "Karaktersnitt: ";}
        .gradeAvg::after {content: " (Sum tallverdi × studiepoeng / sum studiepoeng)";}
        .gradePoints::before {content: "Karakterpoeng: ";}
        .gradePoints::after {content: " (Karaktersnitt × 10)";}
        
        .countingMonths span, .praksisPoints span {color: black;font-weight: bold;}
        .countingMonths::before {content: "Tellende måneder: ";}
        .countingMonths::after {content: " (Måneder i 100% - måneder som trekkes)";}
        
        .praksisPoints::before {content: "Praksispoeng: ";}
        .praksisPoints::after {content: " (Tellende måneder / 12 × 2)";}
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
        <table class="gradeCalculatorTable">
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
        <section class="endCalculation">
            <p class="gradeAvg"></p>
            <p class="gradePoints"></p>
        </section>
        <details class="additionalPoints">
            <summary>Tilleggspoeng</summary>
            <details class="Utdanningspoeng">
                <summary>Utdanningspoeng&shy;kalkulator</summary>
                    <table class="eduCalculatorTable">
                        <thead>
                            <tr class="tableHeader">
                                <th>Studie&shy;poeng</th>
                                <th>Utdannings&shy;poeng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="eduPointInputRow">
                                <td><input type="number" min="0" class="eduPointInput" title="Tall" placeholder="Tall"></td>
                                <td class="summaryColumn eduPointValue"></td>
                            </tr>
                        </tbody>
                    </table>
            </details>
            <details class="Praksispoeng">
                <summary>Praksispoeng&shy;kalkulator</summary>
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
                <details open class="praksisInputRow">
                    <summary>Jobb 1</summary>
                    <table>
                        <tbody>
                            <tr>
                                <th>Startdato</th>
                                <td><input type="date" title="Startdato" class="beginDateInput"></td>
                            </tr>
                            <tr>
                                <th>Sluttdato</th>
                                <td><input type="date" title="Sluttdato" class="endDateInput"></td>
                            </tr>
                            <tr>
                                <th>Stillingsprosent</th>
                                <td><input type="number" min="0" max="100" class="percentInput" title="Prosent" placeholder="Prosent"></td>
                            </tr>
                            <tr>
                                <th>Ekstravakter</th>
                                <td><input type="number" min="0" class="extraInput" title="Tall" placeholder="Timer"></td>
                            </tr>
                            <tr>
                                <th>Måneder i 100% stilling</th>
                                <td class="summaryColumn monthsValue"></td>
                            </tr>
                        </tbody>
                    </table>
                </details>
                <table>
                    <tfoot>
                        <tr>
                            <td colspan="3">Sum måneder i 100% stilling:</td>
                            <td colspan="2" class="summaryColumn sumMonths"></td>
                        </tr>
                    </tfoot>
                </table>
                <section class="endCalculation">
                    <p class="countingMonths"></p>
                    <p class="praksisPoints"></p>
                </section>
            </details>
	    </details>
        <table class="compCalculatorTable endCalculation">
            <tbody>
                <tr>
                    <th>Konkurransepoeng</th>
                    <td class="summaryColumn compPoint">0</td>
                </tr>
            </tbody>
        </table>
    </form>
    `)

    function handleFullscreenchange() {
        const realm = document.querySelector('.poengCalculator').querySelector('.menuBtn')
    
        if (document.fullscreenElement || document.msFullscreenElement || document.webkitfullscreenElement || document.webkitIsFullScreen) {
            realm.innerHTML = notFullScreenHTML;
            realm.parentNode.parentNode.setAttribute('open','open');
        } else {
            realm.innerHTML = fullScreenHTML;
        }
    }
    //Handles changing of fullscreen
    document.querySelector('.poengCalculator').addEventListener('fullscreenchange', () => {
        handleFullscreenchange()
    })
    
    document.querySelector('.poengCalculator').addEventListener("webkitfullscreenchange", () => {
        handleFullscreenchange()
    })
    
    document.querySelector('.poengCalculator').addEventListener("msfullscreenchange", () => {
        handleFullscreenchange()
    })

    //Handles gradeCalculator
    {
        const form = document.querySelector('.gradeCalculatorTable')

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
            const gradeAvg = form.parentElement.querySelector('.gradeAvg')
            const gradePoints = form.parentElement.querySelector('.gradePoints')
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
            enterToNextInput(input, form)
        }
    
        //Add events to already existing inputs
        for (let index = 0; index < form.querySelectorAll('.gradeInputsRow input').length; index++) {
            const input = form.querySelectorAll('.gradeInputsRow input')[index];
            handleGradeInputsRowInputs(input)
        }
    }

    //Handle eduCalculator
    {
        const form = document.querySelector('.eduCalculatorTable')
        const eduPointInput = form.querySelector('.eduPointInput')

        eduPointInput.addEventListener('input', () => {
            const eduPointValue = form.querySelector('.eduPointValue')

            eduPointValue.innerHTML = (eduPointInput.checkValidity() && eduPointInput.value !== '') ? Math.min(Math.floor(eduPointInput.value / 30), 4) : ''

            updateCompCalculator()
        })
    }

    //Handle practiceCalculator
    {
        const form = document.querySelector('.Praksispoeng')
        let rowCount = 1

        function addPraksisInputRow(row) {
            if (row.parentElement.querySelectorAll('.praksisInputRow')[row.parentElement.querySelectorAll('.praksisInputRow').length - 1] !== row) {return}

            clone = row.cloneNode(true)

            for (let index = 0; index < clone.querySelectorAll('INPUT').length; index++) {
                const input = clone.querySelectorAll('INPUT')[index];
                input.value = ''
                handlePraksisInputRowInputs(input)
            }

            for (let index = 0; index < clone.querySelectorAll('TR').length; index++) {
                const row = clone.querySelectorAll('TR')[index];

                for (let index = 0; index < row.querySelectorAll('TD').length; index++) {
                    const cell = row.querySelectorAll('TD')[index];
    
                    if (cell.classList.contains('summaryColumn')) {
                        cell.innerHTML = ''
                    }
                }
            }

            if (clone.open) {
                clone.open = false
            }

            rowCount++
            clone.querySelector('summary').innerHTML = `Jobb ${rowCount}`

            handlePraksisInputRowDetails(clone)

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
            if (date1 > date2) {return 0}

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
            const summary = row.querySelector('summary')

            if (beginDateInput.checkValidity() && endDateInput.checkValidity() && percentInput.checkValidity() && beginDateInput.value !== '' && endDateInput.value !== '' && percentInput.value !== '') {
                const monthsValueRaw = parseFloat(monthDiff(beginDateInput.valueAsDate, endDateInput.valueAsDate).toFixed(2))
                const monthsValueAdjusted = parseFloat((monthsValueRaw * percentInput.value / 100).toFixed(2))

                monthsValue.innerHTML = monthsValueAdjusted
                summary.innerHTML = `${summary.innerHTML.substring(0, 6)} (${monthsValueAdjusted} måneder)`

                if (extraInput.checkValidity() && extraInput.value !== '') {
                    const extraMonths = extraInput.value / 150

                    if (extraMonths + monthsValueAdjusted > monthsValueRaw) {
                        monthsValue.innerHTML = monthsValueRaw
                    } else {
                        monthsValue.innerHTML = parseFloat((parseFloat(monthsValue.innerHTML) + extraInput.value / 150).toFixed(2))
                    }

                    summary.innerHTML = `${summary.innerHTML.substring(0, 6)} (${monthsValue.innerHTML} måneder)`
                }

                monthsValue.innerHTML = parseFloat(monthsValue.innerHTML) > 0 || monthsValue.innerHTML === '0' ? monthsValue.innerHTML : ''

                addPraksisInputRow(row)
            } else {
                monthsValue.innerHTML = ''
                summary.innerHTML = `${summary.innerHTML.substring(0, 6)}`
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

        function handlePraksisInputRowInputs(input) {
            input.addEventListener('input', () => {
                showCalculationsRow(input.parentElement.parentElement.parentElement.parentElement.parentElement)
            })

            reportValidityBlur(input)
            enterToNextInput(input, form)
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
            enterToNextInput(obligatedYears, form)
        }

        function handlePraksisInputRowDetails(details) {
            details.addEventListener('toggle', () => {
                if (details.open) {
                    for (let index = 0; index < form.querySelectorAll('.praksisInputRow').length; index++) {
                        const otherdetails = form.querySelectorAll('.praksisInputRow')[index];
                        
                        if (details !== otherdetails && otherdetails.open) {
                            otherdetails.open = false
                        }
                    }
                }
            })
        }

        //Add events to already existing inputs
        for (let index = 0; index < form.querySelectorAll('.praksisInputRow input').length; index++) {
            const input = form.querySelectorAll('.praksisInputRow input')[index];
            handlePraksisInputRowInputs(input)
        }

        //Add events to already existing details
        for (let index = 0; index < form.querySelectorAll('.praksisInputRow').length; index++) {
            const details = form.querySelectorAll('.praksisInputRow')[index];
            handlePraksisInputRowDetails(details)
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
    function enterToNextInput(element, table) {
        element.addEventListener('keypress', (event) => {
            if (event.keyCode === 13) {
                const inputs = Array.from(table.querySelectorAll('INPUT'))
                const next = event.shiftKey ? -1 : 1
                const input = inputs[inputs.indexOf(element) + next]
                if (input) {
                    input.select()
                }
            }
        })
    }

    //FIX
    function updateCompCalculator() {
        const compTable = document.querySelector('.compCalculatorTable')

        const gradePoints = document.querySelector('.gradePoints').innerHTML == '' ? 0 : parseFloat(document.querySelector('.gradePoints').querySelector('span').innerHTML) 
        const eduPointValue = document.querySelector('.eduPointValue').innerHTML == '' ? 0 : parseInt(document.querySelector('.eduPointValue').innerHTML) 
        const praksisPoints = document.querySelector('.praksisPoints').innerHTML == '' ? 0 : parseInt(document.querySelector('.praksisPoints').querySelector('span').innerHTML) 
        const compPoint = compTable.querySelector('.compPoint')

        compPoint.innerHTML = gradePoints + eduPointValue + praksisPoints
    }
}

startPoengKalkulator()