const Teacher = require('../model/teacher')

const login = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    if(email==="admin@gmail.com" && password==="admin")
    {
        res.status(200)
           .json({
               error:false,
               userDetails:{email},
               message:"Login Successful"
           })
    }
    else{
        res.status(400)
            .json({
                error:true,
                message:"email or password is incorrect"
            })
    }
}

const addTeacher = (req,res) => {
    const name = req.body.name
    const gender = req.body.gender
    const age = req.body.age
    const grade = req.body.grade
    const section = req.body.section
    const subject = req.body.subject
    const newTeacher = new Teacher({name,age,gender,grade,section,subject})
    newTeacher.save()
    .then(()=>res.json({message:"Teacher Added Successfully"}))
    .catch(err=>res.status(400).json("Error:"+err))
}

const getTeacherData = (req,res) =>{
    Teacher.find({}).then(teachers => res.json(teachers)).catch(err=>res.status(400).json("Error:"+ err))
}


module.exports = {login,addTeacher,getTeacherData}