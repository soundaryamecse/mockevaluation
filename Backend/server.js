const express = require('express')
const mongoose  = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const Teacher = require('./model/teacher')
const teachers = require('./data.json')

dotenv.config()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.ATLAS_URI,
    {useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true},(err)=>{
    if(err){
       console.log(err)
    }    
    else{      
        console.log("DataBase connected succesfully")     
    } 
       
});

const db = mongoose.connection;
db.once("open",async()=>{
    if((await Teacher.countDocuments().exec())>0){
        return
    }
    Teacher.insertMany(teachers)
            .then(()=>res.json({"message": "Teachers Added Succcessfully"}))
            .catch((err)=>res.status(400).json("Error:"+err))
})

const auth = require('./Routes/auth')
const teacher = require('./model/teacher')
const { userInfo } = require('os')
app.use("/api/admin",auth)
app.use("/api/teacher",auth)




app.listen(5000,()=>{
    console.log("The Server is up and running")
})