/**
 * Draws out HTML framework and adds functionality to it for a visual and interactive calculator tool.
 * @author Ole Brede, Terje Rudi.
 */
 async function startKonkurransepoengKalkulator(){
    document.currentScript.insertAdjacentHTML('afterend', `
    <details class="Konkurransepoeng">
        <summary>Konkurransepoeng&shy;kalkulator</summary>
	</details>
    `)
    document.querySelector('.Konkurransepoeng').appendChild(document.currentScript)
    document.querySelector('.Konkurransepoeng').querySelector('summary').insertAdjacentHTML('afterend', `
    <style>
        .Konkurransepoeng {padding: 1.2rem 2.4rem;border-radius: 1rem;box-shadow: .4rem .4rem 1rem rgba(0,0,0,.3);width: clamp(20rem,100%,36rem);margin-bottom: 2rem;}
        .Konkurransepoeng summary {cursor: pointer;font-weight: bold; color: #004357;}
        .descriptionCalculator {font-size: .8em;margin: 2rem 0;padding-bottom: 1rem;border-bottom: dotted 1px grey;}
        .descriptionCalculator summary {cursor: pointer;font-weight: bold;}
        .compCalculatorForm table {margin-bottom: 2rem;}
        .compCalculatorForm table th {font-size: .8rem;color: #008aa5;vertical-align: top;padding-left: .2rem;border-left: dotted 1px #ddd;}
        .compCalculatorForm table th:first-child {border: none;}
        .compCalculatorForm table th:after {content: ":";}
        .compCalculatorForm table td {vertical-align: baseline;}
        .compCalculatorForm table td:last-child {text-align: right;}
        .compCalculatorForm table tbody tr td {border-bottom: dotted 1px #ddd;}
        .compCalculatorForm table tbody tr:last-child td {border-bottom: dotted 1px grey;}
        .compCalculatorForm table tbody tr td input {max-width: 8rem;margin: .3rem 0;text-align: center;font-weight: bold;color: #004357;}
        .compCalculatorForm table tfoot tr td {vertical-align: bottom;}
        .compCalculatorForm table tfoot tr td {border-bottom: dotted 1px grey;padding: .4rem 0;font-style: italic;color: #008aa5;}
    </style>
    <div class="descriptionCalculator">
        <details><summary>Hjelp</summary>
        <ul>
            <li>Feltene i denne kalkulatoren fylles ut automatisk etter at de andre kalkulatorene blir fylt ut.</li>
            <li>Konkurransepoeng = Karakterpoeng + Utdanningspoeng + Praksispoeng.</li>
            <li>Utregningen ser du nederst i kalkulatoren.</li>
        </ul>
        </details>
    </div>
    <form class="compCalculatorForm">
        <table>
            <thead>
                <tr class="tableHeader">
                    <th>Poeng</th>
                    <th>Verdi</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td>Karakterpoeng:</td>
                    <td class="summaryColumn gradePoint"><span>0</span></td>
                </tr>
                <tr>
                    <td>Utdanningspoeng:</td>
                    <td class="summaryColumn eduPoint">0</td>
                </tr>
                <tr>
                    <td>Praksispoeng:</td>
                    <td class="summaryColumn pracPoint"><span>0</span></td>
                </tr>
                <tr>
                    <td>Konkurransepoeng:</td>
                    <td class="summaryColumn compPoint">0</td>
                </tr>
            </tfoot>
        </table>
    </form>
    `)
}

startKonkurransepoengKalkulator()