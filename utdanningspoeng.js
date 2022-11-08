document.getElementById('utdanningspoengkalk').innerHTML = 
`
<style>
	#kalk2 {padding: 1.2rem 2.4rem;border-radius: 1rem;box-shadow: .4rem .4rem 1rem rgba(0,0,0,.3);width: clamp(20rem,100%,36rem);margin-bottom: 2rem;}
	#kalk2 summary {cursor: pointer;font-weight: bold; color: #004357;}
	#utdanningspoengkalk .descriptionCalculator {font-size: .8em;margin: 2rem 0;padding-bottom: 1rem;border-bottom: dotted 1px grey;}
	#utdanningspoengkalk .descriptionCalculator summary {cursor: pointer;font-weight: bold;}
	#eduCalculatorForm table {margin-bottom: 2rem;}
	#eduCalculatorForm table th {font-size: .8rem;color: #008aa5;vertical-align: top;padding-left: .2rem;border-left: dotted 1px #ddd;}
	#eduCalculatorForm table th:first-child {border: none;}
	#eduCalculatorForm table th:after {content: ":";}
	#eduCalculatorForm table td {vertical-align: baseline;}
	#eduCalculatorForm table td:last-child {text-align: right;}
	#eduCalculatorForm table tbody tr td {border-bottom: dotted 1px #ddd;}
	#eduCalculatorForm table tbody tr:last-child td {border-bottom: dotted 1px grey;}
	#eduCalculatorForm table tbody tr td input {max-width: 8rem;margin: .3rem 0;text-align: center;font-weight: bold;color: #004357;}
	#eduCalculatorForm table tfoot tr td {border-bottom: dotted 1px grey;padding: .4rem 0;font-style: italic;color: #008aa5;}
	#eduCalculatorForm table tfoot tr:last-child td:last-child {font-weight: bold;font-style: normal;color: black;}
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
<form id="eduCalculatorForm">
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
        <tfoot>
            <tr>
                <td>Utdanningspoeng:</td>
                <td class="sumEduPoints"></td>
            </tr>
        </tfoot>
    </table>
</form>
`;

const eduForm = document.getElementById('eduCalculatorForm')
const eduPointInput = eduForm.querySelector('.eduPointInput')

eduPointInput.addEventListener('input', () => {
    const sumEduPoints = eduForm.querySelector('.sumEduPoints')

    sumEduPoints.innerHTML = (eduPointInput.checkValidity() && eduPointInput.value !== '') ? Math.min(Math.floor(eduPointInput.value / 30), 4) : ''
})