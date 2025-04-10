const mongoose = require("mongoose");
const validator= require("validator");

const userSchema = new mongoose.Schema({
    firstName:
    {
        type: String,
        maxlength:30,
        trim:true,
        required:true,
        minlength:2,

    },
    lastName: {
        type: String,
        maxlength:30,
        trim:true,
    },
    email: {
        type: String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("email not valid");
        //     }
        // }
        

    },
    age: {
        type: Number,
        min:12,
        max:110,

    },
    gender: {
        type: String,
        lowercase:true,
        validate(value){
            if(value!=["male","female","others"]){
            throw new Error("gender problem");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
        // validate(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new Error("password  not strong");
        //     }
        // }

    },
    skills: {
        type: [String],
        set: (skills) => skills.map((skill) => skill.toLowerCase()),
        validate: {
          validator: function (val) {
            // Check array length and for duplicates
            return val.length <= 10 && new Set(val).size === val.length;
          },
          message: 'Too many skills or duplicate skills found'
        }
      }
      ,
    photoUrl:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/026/497/734/small_2x/businessman-on-isolated-png.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid photo url");
            }
        }
    }

},{
    timestamps:true
});

const User= mongoose.model('User',userSchema);

module.exports= User;