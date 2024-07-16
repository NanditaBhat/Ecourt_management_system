const ex=require('express')
const cors=require('cors')
const multer=require('multer')
const fs=require('fs')
const disk=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        return cb(null,file.originalname)
    }
})
const image=multer({storage:disk})
const mysql=require('mysql2/promise')
const bodyParser = require('body-parser')
const pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    port:'3306',
    user:'root',
    password:'nanditag',
    database:'dbms'
})
const app=ex()
app.use(cors({
    methods:'POST',
    origin:'*'
}))
app.use(ex.urlencoded({extended:true}))
app.use(ex.json({limit:'50mb'}))
app.use(bodyParser.json({limit:'50mb'}))
app.use(ex.static(__dirname))
app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/p1.html`)
})

app.post('/login',image.single('pic'),async (req,res)=>{
    let result=await querydatabase('select max(court_id) as max from court')
    let a='dhcsac'
    let b=Buffer.from(a,'base64')
    fs.writeFileSync('./images/hdsc.png',b)
    let max=result.result[0].max
    let pic={pic:fs.readFileSync(`./images/${req.file.filename}`).toString('base64'),name:`${req.file.filename}`}

     result= await querydatabase('insert into court values(?,?,?,?,?,?)',[++max,req.body.name,req.body.location,JSON.stringify({
        ph:req.body.ph,email:req.body.email
     }),JSON.stringify({day:12,year:2004,month:3}),JSON.stringify(pic)])
     fs.unlinkSync(`./images/${req.file.filename}`)
    if(result.status=='err'){
        res.send('err')
        return
    }
    res.send('success')
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/p1.html')
})

app.post('/get_case_details',async (req,res)=>{
    let result=await querydatabase('select CaseNumber,Status,caseid,courtid from casee where CaseNumber=?',[req.body.cnr])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})


app.post('/get_party_details',async (req,res)=>{
    let result=await querydatabase('select p.*,c.CaseNumber from party p,casee c where p.name=? and c.CaseNumber="C/2022/002"',[req.body.party])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})
app.post('/get_case1_details',async (req,res)=>{
    let result=await querydatabase('select * from casee where CaseNumber=?;',[req.body.case1])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})

app.post('/get_court_details',async (req,res)=>{
    let result=await querydatabase('select p.*,c.CaseNumber,l.Name,co.CourtID from party p,casee c,lawyer l,court co where p.name=? and c.CaseNumber="C/2022/002" and l.Name="Rajesh Kumar" and co.CourtID="1"',[req.body.court])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})
app.post('/get_lawyer_details',async (req,res)=>{
    let result=await querydatabase('select * from lawyer where LawyerID=?',[req.body.lawyer])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})
app.post('/get_location_details',async (req,res)=>{
    let result=await querydatabase('select CourtID,CourtName,ContactDetails from court where STATE="karnataka"and DISTRICT="shimoga" and EstablishmentDate like "19%";',[req.body.location])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})
app.post('/get_c1_details',async (req,res)=>{
    let result=await querydatabase('select p.*,c.CaseNumber,l.Name,co.CourtID from party p,casee c,lawyer l,court co where p.name=? and c.CaseNumber="C/2022/002" and l.Name="Rajesh Kumar" and co.CourtID="1"',[req.body.c1])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})
app.post('/get_c2_details',async (req,res)=>{
    let result=await querydatabase('select * from casee where CaseNumber=?;',[req.body.c2])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})
app.post('/get_c3_details',async (req,res)=>{
    let result=await querydatabase('select * from court where CourtID=?',[req.body.c3])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})
app.post('/get_c4_details',async (req,res)=>{
    let result=await querydatabase('select c.filingdate from casee c where c.CaseNumber="C/2022/002";',[req.body.c4])
    if(result.status=='err'){
        res.json({status:'unable'})
        return
    }
    res.json({status:'done',data:result.result})
})



app.listen(3000,()=>{console.log('server started')})

async function x(){
    let result=await querydatabase('insert into court values(?,?,?,?,?)',[1,'name','shimoga',JSON.stringify({ph:1020304050,email:'babddhid@gmail.com'}),
JSON.stringify({day:12,year:2004,month:3})])
    console.log(result)
}

async function querydatabase(query,params){
    let connection= await pool.getConnection()
    if(!connection){
        console.log(connection)
        return {status:'err'}
    }
   try{
    let [result,fileds]=await connection.query(query,params)
    return {status:'ok',result:result}
   }
   catch(err){
        console.log(err)
        return {status:'err'}
   }
}