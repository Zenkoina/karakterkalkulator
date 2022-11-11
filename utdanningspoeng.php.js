/**
 * Draws out HTML framework and adds functionality to it for a visual and interactive calculator tool.
 * @author Ole Brede, Terje Rudi.
 */
 async function startUtdanningspoengKalkulator(){
    document.currentScript.insertAdjacentHTML('afterend', `
    <details class="Utdanningspoeng">
        <summary>Utdanningspoeng&shy;kalkulator</summary>
	</details>
    `)
    document.querySelector('.Utdanningspoeng').appendChild(document.currentScript)
    document.querySelector('.Utdanningspoeng').querySelector('summary').insertAdjacentHTML('afterend', `
    <style>
        .Utdanningspoeng {padding: 1.2rem 2.4rem;border-radius: 1rem;box-shadow: .4rem .4rem 1rem rgba(0,0,0,.3);width: clamp(20rem,100%,36rem);margin-bottom: 2rem;}
        .Utdanningspoeng summary {cursor: pointer;font-weight: bold; color: #004357;}
        .descriptionCalculator {font-size: .8em;margin: 2rem 0;padding-bottom: 1rem;border-bottom: dotted 1px grey;}
        .descriptionCalculator summary {cursor: pointer;font-weight: bold;}
        .eduCalculatorForm table {margin-bottom: 2rem;}
        .eduCalculatorForm table th {font-size: .8rem;color: #008aa5;vertical-align: top;padding-left: .2rem;border-left: dotted 1px #ddd;}
        .eduCalculatorForm table th:first-child {border: none;}
        .eduCalculatorForm table th:after {content: ":";}
        .eduCalculatorForm table td {vertical-align: baseline;}
        .eduCalculatorForm table td:last-child {text-align: right;}
        .eduCalculatorForm table tbody tr td {border-bottom: dotted 1px #ddd;}
        .eduCalculatorForm table tbody tr:last-child td {border-bottom: dotted 1px grey;}
        .eduCalculatorForm table tbody tr td input {max-width: 8rem;margin: .3rem 0;text-align: center;font-weight: bold;color: #004357;}
    </style>
    <div class="descriptionCalculator">
        <details><summary>Hjelp</summary>
        <ul>
            <li>Tast inn studie&shy;poeng i feltet.</li>
            <li>1 utdannings&shy;poeng = 30 studie&shy;poeng.</li>
            <li>Maks 4 utdannings&shy;poeng blir tildelt.</li>
            <li>Ut&shy;regningen ser du nederst i kalku&shy;latoren.</li>
        </ul>
        </details>
    </div>
    <form class="eduCalculatorForm">
        <table>
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
    </form>
    `)

    const form = document.querySelector('.eduCalculatorForm')
    const eduPointInput = form.querySelector('.eduPointInput')

    eduPointInput.addEventListener('input', () => {
        const eduPointValue = form.querySelector('.eduPointValue')

        eduPointValue.innerHTML = (eduPointInput.checkValidity() && eduPointInput.value !== '') ? Math.min(Math.floor(eduPointInput.value / 30), 4) : ''
    })
}

startUtdanningspoengKalkulator()