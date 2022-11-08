{
    document.currentScript.parentElement.querySelector('.Utdanningspoengkalk').innerHTML = 
    `
    <style>
        .Utdanningspoeng {padding: 1.2rem 2.4rem;border-radius: 1rem;box-shadow: .4rem .4rem 1rem rgba(0,0,0,.3);width: clamp(20rem,100%,36rem);margin-bottom: 2rem;}
        .Utdanningspoeng summary {cursor: pointer;font-weight: bold; color: #004357;}
        .Utdanningspoengkalk .descriptionCalculator {font-size: .8em;margin: 2rem 0;padding-bottom: 1rem;border-bottom: dotted 1px grey;}
        .Utdanningspoengkalk .descriptionCalculator summary {cursor: pointer;font-weight: bold;}
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
            <li>Tast inn studiepoeng i feltet.</li>
            <li>1 utdanningspoeng = 30 studiepoeng.</li>
            <li>Utregningen ser du nederst i kalkulatoren.</li>
        </ul>
        </details>
    </div>
    <form class="eduCalculatorForm">
        <table>
            <thead>
                <tr class="tableHeader">
                    <th>Studiepoeng</th>
                    <th>Utdanningspoeng</th>
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
    `;

    const form = document.currentScript.parentElement.querySelector('.eduCalculatorForm')
    const eduPointInput = form.querySelector('.eduPointInput')
    
    eduPointInput.addEventListener('input', () => {
        const eduPointValue = form.querySelector('.eduPointValue')

        eduPointValue.innerHTML = (eduPointInput.checkValidity() && eduPointInput.value !== '') ? Math.min(Math.floor(eduPointInput.value / 30), 4) : ''
    })
}