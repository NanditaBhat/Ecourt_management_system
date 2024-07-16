function navigate(m) {
    if (m == 1) return
    if (m == 9) window.location = '/c1.html'
    if (m == 15) window.location = '/location.html'
    if (m == 11) return
    if (m == 12) window.location = '/case.html'

}


async function get_details() {
    let cnr = document.getElementById('cino').value
    let res = await fetch('/get_case_details', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cnr: cnr })
    })
    res = await res.json()
    console.log(res);
    if (res.status == 'unable') {
        return
    }
    let div = document.createElement('div')
    div.id='havgolla'

    div.innerHTML = `<div>
    <h3 onclick="document.getElementById('havgolla').remove();">Case Details</h3>
    <table id='havgolla_table'>
    <tr>
    <th>CaseID</th>
    <th>Case number</th>
    <th>status</th>
    <th>Court ID</th>
    </tr>
    </table>
    </div>`
    document.body.append(div)
    let data=res.data
    let table=document.getElementById('havgolla_table')
    for(let i of data){
        let tr=document.createElement('tr')
        tr.innerHTML=`
        <th>${i.caseid}</th>
    <th>${i.CaseNumber}</th>
    <th>${i.Status}</th>
    <th>${i.courtid}</th>`
    table.append(tr)
    }
}