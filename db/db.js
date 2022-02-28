var mongoose= require("mongoose");
// var db= "mongodb://localhost:27017/stream"

var db = "mongodb+srv://stream:webWorkFirst_1104@cluster0.fwcin.mongodb.net/stream?retryWrites=true&w=majority"
mongoose.connect(db,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }
)
.then(console.log("DATABASE CONNECTED"))
.catch((e)=>{console.log(e)});

