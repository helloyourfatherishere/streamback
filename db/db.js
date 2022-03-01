var mongoose= require("mongoose");
require("dotenv").config();
// var db= "mongodb://localhost:27017/stream"
var db = process.env.DB;
mongoose.connect(db,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }
)
.then(console.log("DATABASE CONNECTED"))
.catch((e)=>{console.log(e)});

