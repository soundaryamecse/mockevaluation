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
    const avatar = req.body.avatar
    const newTeacher = new Teacher({name,age,gender,grade,section,subject,avatar})
    newTeacher.save()
    .then(()=>res.json({message:"Teacher Added Successfully"}))
    .catch(err=>res.status(400).json("Error:"+err))
}

const getTeacherData = (req,res) =>{
    const filter = req.query.filter
    const age = req.query.age
    const sort = req.query.sort
    if(filter==="" && age ==="" && sort ===""){
    Teacher.find({}).then(teachers => res.json(teachers)).catch(err=>res.status(400).json("Error:"+ err))
    }
    else if(filter && age ==="" && sort===""){
        Teacher.find({gender:filter}).then(teachers => res.json(teachers)).catch(err=>res.status(400).json("Error:"+ err))    
    }
    else if(filter==="" && age && sort===""){
        Teacher.find({age:{$gte : age}}).then(teachers => res.json(teachers)).catch(err=>res.status(400).json("Error:"+ err))    
    }
    else if(filter==="" && age==="" && sort){
        Teacher.find({}).sort({age:sort}).then(teachers => res.json(teachers)).catch(err=>res.status(400).json("Error:"+ err))    
    }
    else if(filter && age && sort===""){
        Teacher.find({gender:filter,age:{$gte : age}}).then(teachers => res.json(teachers)).catch(err=>res.status(400).json("Error:"+ err))    
    }
    else if(filter && sort && age===""){
        Teacher.find({gender:filter}).sort({age:sort}).then(teachers => res.json(teachers)).catch(err=>res.status(400).json("Error:"+ err))    
    }
    else if(age && sort && filter===""){
        Teacher.find({age:{$gte : age}}).sort({age:sort}).then(teachers => res.json(teachers)).catch(err=>res.status(400).json("Error:"+ err))    
    }
    
    else if(age && filter && sort){
        Teacher.find({gender:filter,age:{$gte : age}}).sort({age:sort}).then(teachers => res.json(teachers)).catch(err=>res.status(400).json("Error:"+ err))    
    }
}

const deleteTeacher =(req,res) =>{
    const {_id} = req.query
    console.log(_id)
    const data=Teacher.findByIdAndDelete(_id)    
    .then(()=>res.json({"message":"Teacher Deleted Successfully"}))
    .catch((err)=>res.status(400).json("Error:"+err))
}

const getTeachersPage= async (req, res) => {
    const page = Number.parseInt(req.query.page);
    const limit = Number.parseInt(req.query.limit);
    const filter = req.query.filter
    const age = req.query.age
    const sort = req.query.sort
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < await (Teacher.countDocuments().exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }
    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        };
    }
    try {
        if(filter && age==="" && sort===""){
            results.current = await (Teacher.find({gender:filter}).limit(limit).skip(startIndex).exec());
            res.json(results)
        }
        else if(age && filter==="" && sort===""){
            results.current = await (Teacher.find({age:{$gte:age}}).limit(limit).skip(startIndex).exec());
            res.json(results)
        }
        else if(sort && filter==="" && age===""){
            results.current = await (Teacher.find({}).sort({age:sort}).limit(limit).skip(startIndex).exec());
            res.json(results)
        }
        else if(filter && age && sort===""){
            results.current = await (Teacher.find({gender:filter,age:{$gte:age}}).limit(limit).skip(startIndex).exec());
            res.json(results)
        }
        else if(filter && sort && age===""){
            results.current = await (Teacher.find({gender:filter}).sort({age:sort}).limit(limit).skip(startIndex).exec());
            res.json(results)
        }
        else if(age && sort && filter===""){
            results.current = await (Teacher.find({age:{$gte:age}}).sort({age:sort}).limit(limit).skip(startIndex).exec());
            res.json(results)
        }
        else if(filter && age && sort){
            results.current = await (Teacher.find({gender:filter,age:{$gte:age}}).sort({age:sort}).limit(limit).skip(startIndex).exec());
            res.json(results)
        }
        else if(filter==="" && age==="" && sort==="")
        {
            results.current = await(Teacher.find({}).limit(limit).skip(startIndex).exec())
            res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};


module.exports = {login,addTeacher,getTeacherData,deleteTeacher,getTeachersPage}