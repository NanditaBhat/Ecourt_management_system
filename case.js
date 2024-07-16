function navigate(m){
    if(m==11)window.location='/p1.html'
    if(m==12)window.location='/case.html'
    if(m==9)return
    if(m==15)window.location='/location.html'
    }
function change_inner_content(m, t) {
    let main = document.getElementById("search_result")
    let divs = document.getElementById('search_nav').getElementsByTagName('div')
    for (let i = 0; i < divs.length; i++)
        divs[i].setAttribute('class', 'x')
    if (m == 1) {
        main.innerHTML = ` <p>Case status:search by party name</p><br>
        <p> </p>
        <div>
            <p>Party Name</p>
            <input type="text" required><br>
            <p>Registration year</p>
            <input type="text" required><br>
            <div>
                <button onclick="get_details1()>GO</button>
                <button>Reset</button>
            </div>

        </div>`
        t.className = 'seleccted_c1'
    }

    if (m == 2) {
        main.innerHTML = `<p>Case details</p>
        <p></p>
        <div>
            <p>Enter case number</p>
            <input type="text" required><br>
            <div>
                <button>GO</button>
                <button>Reset</button>
            </div>
        </div>`
        t.className = 'seleccted_c1'
    }
    if (m == 3) {
        main.innerHTML = `<div>
        <p>Fetch Case Details by Party Name and Registration Year</p>
        <p>Party Name</p>
        <input type="text" required><br>
        <p>Filing date</p>
        <input type="text" required>
        <div>
            <button>GO</button>
            <button>Reset</button>
        </div>
    </div>`
        t.className = 'seleccted_c1'
    }
    if (m == 4) {
        main.innerHTML = `<div>
        <p>Lawyer Details</p>
        <p>Enter LawyerID</p>
        <input type="text" required><br>
        <div>
            <button>GO</button>
            <button>Reset</button>
        </div>
    </div>`
        t.className = 'seleccted_c1'
    }
}
async function get_pdetails() {
    let party = document.getElementById('cino1').value
    let res = await fetch('/get_party_details', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ party: party })
    })
    res = await res.json()
    console.log(res)
    if (res.status == 'unable') {
        return
    }
    let div = document.createElement('div')
    div.id='party'

    div.innerHTML = `<div>
    <h3 onclick="document.getElementById('party').remove()">Party Details</h3>
    <table id='party_table'>
    <tr>
    <th>PartyID</th>
    <th>Party Name</th>
    <th>Address</th>
    <th>Contact Details</th>
    <th>Role</th>
    <th>Case number</th>
    </tr>
    </table>
    </div>`
    document.body.append(div)
    let data=res.data
    let table=document.getElementById('party_table')
    for(let i of data){
        let tr=document.createElement('tr')
        tr.innerHTML=`
        <th>${i.PartyID}</th>
        <th>${i.Name}</th>
        <th>${i.Address}</th>
    <th>${i.ContactDetails}</th>
    <th>${i.Role}</th>
    <th>${i.CaseNumber}</th>
    
   `
    table.append(tr)
    }
}

async function get_cdetails() {
    let case1 = document.getElementById('cino2').value
    let res = await fetch('/get_case1_details', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case1: case1 })
    })
    res = await res.json()
    console.log(res)
    if (res.status == 'unable') {
        return
    }
    let div = document.createElement('div')
    div.id='case'

    div.innerHTML =  `<div>
    <h3 onclick="document.getElementById('case').remove()">Case Details</h3>
    <table id='case_table'>
    <tr>
    <th>CaseID</th>
    <th>Case number</th>
    <th>Status</th>
    <th>Case type</th>
    <th>Filling details</th>
    <th>CourtID</th>
    </tr>
    </table>
    </div>`
    document.body.append(div)
    let data=res.data
    let table=document.getElementById('case_table')
    for(let i of data){
        let tr=document.createElement('tr')
        tr.innerHTML=`
        <th>${i.CaseID}</th>
    <th>${i.CaseNumber}</th>
    <th>${i.Status}</th>
    <th>${i.CaseDetails}</th>
    <th>${i.FilingDate}</th>
    <th>${i.CourtID}</th>
    `
    table.append(tr)
    }
}
async function get_courtdetails() {
    let court = document.getElementById('cino3').value
    let res = await fetch('/get_court_details', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ court: court })
    })
    res = await res.json()
    console.log(res)
    if (res.status == 'unable') {
        return 
    }
    let div = document.createElement('div')
    div.id='court'

    div.innerHTML =  `<div>
    <h3 onclick="document.getElementById('court').remove()">X</h3>
    <table id='court_table'>
    <tr>
    <th>PartyID</th>
    <th>CaseNumber</th>
    <th>CourtID</th>
    <th>LawyerName</th>
    <th>Role</th>
    <th>ContactDetails</th>
    <th>Address</th>
    </tr>
    </table>
    </div>`
    document.body.append(div)
    let data=res.data
    let table=document.getElementById('court_table')
    for(let i of data){
        let tr=document.createElement('tr')
        tr.innerHTML=`
        <th>${i.PartyID}</th>
        <th>${i.CaseNumber}</th>
    <th>${i.CourtID}</th>
    <th>${i.Name}</th>
    <th>${i.Role}</th>
    <th>${i.ContactDetails}</th>
    <th>${i.Address}</th>`
    table.append(tr)
    }
}
async function get_ldetails() {
    let lawyer = document.getElementById('cino4').value
    let res = await fetch('/get_lawyer_details', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lawyer: lawyer })
    })
    res = await res.json()
    console.log(res)
    if (res.status == 'unable') {
        return
    }
    let div = document.createElement('div')
    div.id='lawyer'

    div.innerHTML = `<div>
    <h3 onclick="document.getElementById('case').remove()">Lawyer Details</h3>
    <table id='lawyer_table'>
    <tr>
    <th>LawyerID</th>
    <th>Name</th>
    <th>Practice area</th>
    <th>Gmail</th>
    <th>License no.</th>
    
    </tr>
    </table>
    </div>`
    document.body.append(div)
    let data=res.data
    let table=document.getElementById('lawyer_table')
    for(let i of data){
        let tr=document.createElement('tr')
        tr.innerHTML=`
        <th>${i.LawyerID}</th>
        <th>${i.Name}</th>
    <th>${i.PracticeArea}</th>
    <th>${i.GMAIL}</th>
    <th>${i.LicenseNumber}</th>
   `
    table.append(tr)
    }
}

