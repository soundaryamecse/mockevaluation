const express = require('express')
const mongoose  = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

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

const auth = require('./Routes/auth')
app.use("/api/admin",auth)
app.use("/api/teacher",auth)


app.listen(5000,()=>{
    console.log("The Server is up and running")
})