function navigate(m){
if(m==11)window.location='/p1.html'
if(m==12)window.location='/case.html'
if(m==9)window.location='/c1.html'
if(m==15)return
}
async function get_lodetails() {
    let location = document.getElementById('cino5').value
    let res = await fetch('/get_location_details', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: location })
    })
    res = await res.json()
    if (res.status == 'unable') {
        return
    }
    let div = document.createElement('div')
    div.id='havgolla'

    div.innerHTML = `<div>
    <h3 onclick="document.getElementById('havgolla').remove()">Court Details</h3>
    <table id='havgolla_table'>
    <tr>
    <th>Court ID</th>
    <th>Court name</th>
    <th>Contact Details</th>
    </tr>
    </table>
    </div>`
    document.body.append(div)
    let data=res.data
    let table=document.getElementById('havgolla_table')
    for(let i of data){
        let tr=document.createElement('tr')
        tr.innerHTML=`
    <th>${i.CourtID}</th>
    <th>${i.CourtName}</th>
    <th>${i.ContactDetails}</th>
    `
    table.append(tr)
    }
}