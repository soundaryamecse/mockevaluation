const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchoolTeacherSchema = new Schema({
    // _id:{
    //     type:Schema.Types.ObjectId},
    name :{
        type:String,
        required:true,        
    },
    avatar:{
        type:String,
    },
    gender :{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required : true,
    },
    grade:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    }

},
{
    versionKey:false,
})

module.exports = mongoose.model("Teacher",SchoolTeacherSchema)