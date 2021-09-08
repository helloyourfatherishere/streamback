var mongoose = require("mongoose");

var mainSchema= new mongoose.Schema({
    poster:{
        type: Array
    },
    sell:{
        type: Boolean
    },
    discount: {
        type: Boolean
    },
    pass:{
        type: String
    }

})

var main = new mongoose.model("main", mainSchema);
module.exports= main;