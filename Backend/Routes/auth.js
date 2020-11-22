const express = require('express')
const router = express.Router()
const {login,addTeacher, getTeacherData,deleteTeacher,getTeachersPage} = require('../Controller/controller')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const Teacher = require('../model/teacher')

const Storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"../uploads"))
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+file.originalname)
    },
})

const fileFilter = (req,file,cb) => {
    if(file.mimeType === "image/jpg" || file.mimeType ==="image/png"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const upload = multer({
    storage : Storage,
    limits:{
        fileSize : 1024 *1024 *5
    },
    fileFilter:fileFilter
})



router.post("/login", login)
router.post("/addTeacher",addTeacher)
router.get("/getTeacherData",getTeacherData)
router.delete("/deleteTeacher",deleteTeacher)
router.get('/pagination',getTeachersPage)


module.exports = router
