// var mongoose = require("mongoose");
// var user_Schema= new mongoose.Schema({
//    name:{
//        type: String,
//        lowercase: true
//    },
//    email:{
//        type: String,
//        unique: true,
//    },
//    contact_email:{
//        type: String,
//    },
//    pass:{
//         type: String,
//    },
//    phone: {
//        type: Number,
//    },
//    address:{
//        type: String
//    },
//    security_code:{
//        type: String
//    },
//    cart:{
//        type: Array
//    },
//    order:{
//        type: Array
//    }, 
//    received:{
//        type: Array
//    },
//    tokens:[{
//        token:{
//            type: Object,
//        }
//    }],
// })


// var user = new mongoose.model("user", user_Schema);
// module.exports= user;

var mongoose = require("mongoose");
var bcrypt= require("bcryptjs");
var jwt= require("jsonwebtoken");

var user_Schema= new mongoose.Schema({
    name:{
        type: String,
        lowercase: true
    },
    email:{
        type: String,
        unique: true,
    },
    pass:{
         type: String,
    },
    security_code:{
        type: String
    },
    saved:{
        type: Array
    },
    tokens:[{
        token:{
            type: Object,
        }
    }],
 })

user_Schema.pre("save", async function(next){
    try{
        if(this.isModified("pass") && this.isModified("security_code")){
            console.log("REACHED");
            console.log(this.isModified("pass") + " " + this.isModified("security_code"))
            this.pass= await bcrypt.hash(this.pass, 10);
            this.security_code= await bcrypt.hash(this.security_code, 10)
            console.log(`PASSWORD: ${this.pass} && CODE: ${this.security_code}`)
        }
        next();
    }catch{
        (e)=>{console.log(e)}
    }
})

user_Schema.methods.generate= async function(){
    try{
        console.log(`THIS:${this}`)
        let token= await jwt.sign({_id: this._id}, process.env.KEY);
        console.log(token)
        this.tokens= this.tokens.concat({token: token});
        await this.save();
        return token;
    }   
    catch{
        (e)=>{console.log(e)}
    }
}

var user = new mongoose.model("user", user_Schema);
module.exports= user;