//REQUIRE MODULES
var express= require("express");
var app= express();
var port= process.env.PORT || 4000 ;  
var path= require("path");
var fs= require("fs");
var hbs= require("hbs");
var bodyParser= require("body-parser");
var cookieParser = require("cookie-parser");
require("dotenv").config();
var bcrypt= require("bcryptjs");
var jwt= require("jsonwebtoken");

//DB THINGS
require("./db/db.js");
var main= require("./public/models/main.js")
var product= require("./public/models/product.js");
var user= require("./public/models/user.js");
var cartDB= require("./public/models/cart.js");
var orderDB= require("./public/models/order.js")
var orderUnregisterDB= require("./public/models/orderUnregister.js")
var delieveredDB= require("./public/models/delievered.js")
var feed= require("./public/models/feed.js")
//EXTRA REQUIREMENTS
var views_path= path.join(__dirname,"public/views")

//MIDDLEWARES
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "hbs")
app.set("views", views_path)
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 
//GLOBAL VARIABLES

//ROUTES
app.get("/", (req, res)=>{
    res.send("HELLO")
})
app.get("/api", (req, res)=>{
    var find = async function(){
        try{
            console.log(req.body)
            let token= req.cookies.jwt;
            let user;
            if(!token || token== null || token== undefined ||token.length == 0){
                user= false
            }
            else{
                user=true
            }
        let main_data= await main.findOne({});
        let poster= main_data.poster;
        let pants = await product.find({$and: [{category: "pants"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        let shirts = await product.find({$and: [{category: "shirts"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        let tShirts = await product.find({$and: [{category: "t-shirts"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        let jackets = await product.find({$and: [{category: "jackets"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        let hoodies = await product.find({$and: [{category: "hoodies"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        let trouser = await product.find({$and: [{category: "trouser"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        let shalwarKameez = await product.find({$and: [{category: "shalwar-kameez"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        let kurti = await product.find({$and: [{category: "ladies-kurti"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        let collections = await product.find({$and: [{category: "collections"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        let undergarments = await product.find({$and: [{category: "undergarments"}, {brand: false}, {visiblity: true}]}).sort({date: -1}).limit(10);
        res.send([pants,shirts, tShirts,jackets,hoodies,trouser,shalwarKameez,kurti,collections,undergarments, poster, user ,poster]);
        // res.render("index", {
        //     data: tShirts
        // })
    }
    catch{
            (e)=>{console.log(e)}
        }
    };
    find();
});

// app.get("/view/more/:category", (req, res)=>{
//     var findCategory= async function(){
//         try{
//             let category= req.params.category;
//             if(category=="pants"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//             else if(category=="shirts"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//             else if(category=="t-shirts"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//             else if(category=="jackets"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//             else if(category=="hoodies"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//             else if(category=="trouser"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//             else if(category=="shalwar-kameez"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//             else if(category=="ladies-kurti"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//             else if(category=="collections"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//             else if(category=="undergarments"){
//                 let data= await product.find({$and:[{category: category}, {brand: false}]}).sort({data: -1})
//                 res.render("category", {
//                     data: data
//                 })
//             }
//         }   
//         catch{
//             (e)=>{
//                 console.log(e)
//             }
//         }
//     };findCategory();
// })
app.get("/search", (req, res)=>{
    console.log(req.body)
    var f= async function(){
		try{
            var query= req.body.values.toLowerCase();
            var findLocal= await product.find({$and:[{visiblity: true}, {$or: [{keywords: {$regex: query}}, {title: {$regex: query}}, {category:{$regex: query}}]}]}).limit(30).sort({data: -1})
            var findBrand= ""
            console.log(findLocal)
            console.log(`BRAND ${findBrand.length}`);
            // res.render("search", {
            //     local: findLocal,
            //     brand: findBrand
            // });
            res.send({findLocal, findBrand})
		}catch{
			(e)=>{
				console.log(e);
				res.send("SOME ERROR IS OCCURED" + e)
			}
		}
		
	};
	f();
})

// app.get("/autocomplete", (req, res)=>{
//     var regex1 = new RegExp(req.query["term"], 'i');
// 	var db_data = product.find({search_keyword: {$regex: regex1}}).limit(6)
// 	db_data.exec(function(err, data){
// 		var result = [];
// 		if(!err){
// 			if(data && data.length && data.length>0){
// 				data.forEach(user=>{
// 					var obj={
// 						id: user._id,
// 						label: user.search_keyword
// 					};
// 					result.push(obj);
// 				})
// 			}
// 			res.jsonp(result);
// 		}
// 		else{
// 			(e)=>{console.log(e)}
// 		}
// 	});
// })
app.get("/view/:id", (req, res)=>{
    var findData= async function(){
        var dataFind= await product.findOne({_id: req.params.id});
        var dataObj= 
            {
                images: dataFind.images,
                brand_name: dataFind.brand_name,
                keywords: dataFind.keywords,
                date: dataFind.date,
                comments: dataFind.comments,
                _id: dataFind._id,
                title: dataFind.title,
                price: dataFind.price,
                cut_price: dataFind.cut_price,
                sell_price: dataFind.sell_price,
                permission: dataFind.permission,
                sell: dataFind.sell,
                discount: dataFind.discount,
                brand: dataFind.brand,
                table: dataFind.table,
                des: dataFind.des,
                note: dataFind.note,
                main_img: dataFind.main_img,
                type: dataFind.type,
                sizes: dataFind.sizes,
                colors: dataFind.colors
              }
              var query= [dataFind.keywords];
              var i=query.map((val, ind)=>{
                  return( new RegExp(val))
              })
            
              var relatedProduct= await product.find({$and: [{keywords: {$in: i}}, {brand: true}]}).sort({data: -1}).limit(15);
              res.send({data: dataObj, more: relatedProduct, find: true})
            //   res.render("view", {data: dataObj, more: relatedProduct})
    };
    findData();
})

// app.get("/:status/:category/:type", (req, res)=>{
//     var cate= async function(){
//         try{
//             let category= req.params.category;
//             let type= req.params.type;
//             if(req.params.status=="l"){
//                 let findDataL= await product.find({$and : [{category:  {$regex: category}}, {type: type},{visiblity: true}, {brand: false}]});
//                 res.render("category", {data: findDataL})
//             }
//             else if(req.params.status=="b"){
//                 let findDataB= await product.find({$and:[{brand_name: category}, {visiblity: true}, {brand: true}]});
//                 res.render("category", {
//                     data: findDataB
//                 })
//             }
//         }
//         catch{
//             (e)=>{console.log(e)}
//         }
//     };
//     cate();
// });

app.get("/cate/:cate", (req, res)=>{
    var cate= async function(){
        try{
            let category= req.params.cate;
            console.log(category)
            let findData= await product.find({$and:[{category: {$regex: category}}, {visiblity: true}, {brand: false}]}).limit(50).sort({date: -1})
            res.send(findData)
            //     res.render("category", {data: findDataL})
            
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    cate();
});
app.get("/b/:brand_name", (req, res)=>{
    var cate= async function(){
        try{
            let brand_name= req.params.brand_name;
            console.log(brand_name)
            let findData= await product.find({$and:[{brand_name: {$regex: brand_name}}, {visiblity: true}, {brand: true}]}).limit(50).sort({date: -1})
            res.send(findData)
            //     res.render("category", {data: findDataL})
            
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    cate();
});

// app.get("/create-account", (req, res)=>{
//     res.render("create-account")
// })

app.post("/signup", (req, res)=>{
    var add= async function(){
        try{
            console.log(req.body)
        var {email, pass, name, contact_email, phone, address, security_code}= req.body;
        var user_upload= new user({
            name: name,
            email: email,
            pass: pass,
            phone: phone,
            contact_email: contact_email,
            address: address,
            security_code: security_code,
        });
        var data= new user(user_upload);
        data.save()
        .then((d)=>{
            res.send(true)
        }).catch((e)=>{
            if(e){
                console.log(e);
                res.send(false);
            }
        })
        }catch{
            (e)=>{console.log(e)}
        }
    };
    add();
})

// app.get("/login", (req, res)=>{
//     res.render("login");
// })

app.post("/signin", (req, res)=>{
    var {email, pass}= req.body;
    var findUser= async function(){
        try{
            var data= await user.findOne({email: email});
            console.log(data)
            if(data || data!==null){
            var compare= await bcrypt.compare(pass, data.pass);
            if(compare){
                var token= await data.generate();
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: 100* 10* 60 * 60 * 24 * 7 
                });
                res.send(true)
            }
            else{
                res.send(false)
            }
            }
            else{
                res.send(false)
            }
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    findUser();
});

app.get("/forgot/:cate", (req, res)=>{
    var cate= req.params.cate;
    if(cate=="pass"){
        res.render("forgot", {cate: cate, placeholder: "enter four digits code"})
    }
    else{
        let token= req.cookies.jwt;
        if(!token || token== null || token== undefined ||token.length == 0){
            res.redirect("/login")
        }
        else{
            res.render("forgot", {cate: cate, placeholder: "enter your password"})
        }
    }
})
app.post("/forgot/:cate", (req, res)=>{
      var findUserSecurity= async function(){
          let cate= req.params.cate;
          let {email, changeData}= req.body
        try{
            var data= await user.findOne({email: email});
            var compare;
            if(data || data!==null){
                if(cate=="pass"){
                    compare= await bcrypt.compare(changeData, data.security_code);
                }
                else{
                    compare= await bcrypt.compare(changeData, data.pass);
                }
            if(compare){
                if(cate =="pass"){
                    res.send({
                        email: email,
                        cate: cate,
                        place: "reset your password"});

                }
                else{
                    res.send({
                        email: email,
                        cate: cate,
                        place: "reset your security code"});

                }
            }
            else{
                res.send(false)
            }
            }
            else{
                res.send(false)
            }
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    findUserSecurity();
});
app.post("/change/:cate/:email", (req, res)=>{
    var findAndReset= async function(){
        try{
            let{cate, email}= req.params;
            let changeData= req.body.changedData;
            console.log(cate + " " + email+ " "+ changeData);
            if(cate=="pass"){
                var resetPass= async function(){
                    try{
                        var pass= await bcrypt.hash(changeData, 10)
                        let data= await user.findOneAndUpdate({email: email},{$set: {pass: pass}},{
                            new: true , useFindAndModify: false
                        });
                        res.send(true)
                    }catch{
                        (e)=>{console.log(e)}
                    }
                };
                resetPass();
            }
            else if(cate="security_code"){
                var resetKey= async function(){
                    try{
                        var securityCode= await bcrypt.hash(changeData, 10)
                        let data= await user.findOneAndUpdate({email: email},{$set: {security_code: securityCode}},{
                            new: true , useFindAndModify: false
                        });
                        res.send(true)
                    }
                    catch{
                        (e)=>{console.log(e)}
                    }
                };
                resetKey();
            }
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    findAndReset();
});
app.post("/main", (req, res)=>{
    var find_main_data= async function(){
        try{
            let main_data= await main.findOne({});
            res.send({main_data})
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    find_main_data();
})
app.get("/verify_user", (req, res)=>{
    let token= req.cookies.jwt;
    let verify_user;
    if(!token || token== null || token== undefined ||token.length == 0){
        verify_user= false;
    }
    else{
        verify_user= true;
    }
    res.send({verify_user: verify_user})
});
app.post("/u/cart", (req, res)=>{
    let token= req.cookies.jwt;
    if(!token || token== null || token== undefined ||token.length == 0){
        res.send(false)
    }
    else{      
        let findUserANdTokenCart= async function(){
        try{
            let verify=  jwt.verify(token, process.env.KEY);
            let findUser= await user.findOne({_id: verify._id});
            let userCart= findUser.cart;
            let arr=[];
          if(userCart.length>0){
            for (var i=0; i<userCart.length; i++){
                let length= i+1
                var find= product.find({_id: userCart[i]}).then((p)=>{
                    let cart = arr=arr.concat(p)
                    if(length == userCart.length){
                        res.send({userId: verify._id,product: arr});
                    }
                }).catch((e)=>{
                    console.log(e)
                })
            }
          }
          else{
              res.send({userId: verify._id,product: []})
          }
        }
            catch{
                (e)=>{console.log(e)}
            }
    };
    findUserANdTokenCart();
    }
});

app.post("/addtocart/:id", (req, res)=>{
    var token= req.cookies.jwt;
    if(token &&token!== undefined && token!== null && token.length>0){
        var findUserANdToken= async function(){
            try{
            let productId=req.params.id;
            var verify=  jwt.verify(token, process.env.KEY);
                
            var findUser= await user.findOne({_id: verify._id});
            var findProduct= await product.findOne({_id: productId});
            var userCart= findUser.cart;
                
            var verifyCart= userCart.some((val,i)=>{
                return val==productId
            });
            if(verifyCart){
                res.send({status: false, type: 'added'})
            }
            else{
                let cart= findUser.cart=findUser.cart.concat(productId);
                var addCartDB= new cartDB({
                        userId: verify._id,
                        productId: productId,
                        img: findProduct.main_img.link,
                        title: findProduct.title
                    });
                var userSave=await findUser.save(); 
                var save=await addCartDB.save();
                res.send({status: true, type: 'add'})
            }
            }
            catch{
                (e)=>{console.log(e)}
            }
        };
        findUserANdToken();
    }
    else{
        res.redirect("/login");
    }
});

app.post("/removeCart/:id/:product_id", (req, res)=>{
    console.log(req.params)
    var findUserAndRemoveCart= async function(){
        try{
        let id =req.params.id;
        let productId= req.params.product_id;
        var findUser= await user.findOne({_id: id});
        var cart= findUser.cart;
        var filter= cart.filter((val, ind)=>{
            return val !== productId
        })
        var findUserAndUpdateCart= await user.findByIdAndUpdate({_id: id}, {$set: {cart: filter}},{
            new: true, useFindAndModify: false
        });
        let removeCart= await cartDB.findByIdAndRemove({_id: productId},{
            new: true, useFindAndModify: false
        })
        res.send(true);
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    findUserAndRemoveCart();
});
app.get("/u/order", (req, res)=>{
    let token= req.cookies.jwt;
    if(!token || token== null || token== undefined){
        res.send(false)
    }
    else{      
        var findUserANdTokenCart= async function(){
        try{
            var verify=  jwt.verify(token, process.env.KEY);
            var findUser= await user.findOne({_id: verify._id});
            console.log(findUser)
            let order= findUser.order
            let c;
            let a=[];
            for (let i=0; i<=order.length; i++){
                let findO= async function(a){
                    try{
                        let o=order[i]
                        let index=i+1
                        let findOrder= await orderDB.findOne({_id: o});
                        console.log(`findOrder ${findOrder}`)
                        let arr=a.push(findOrder)
                        if(index===order.length){
                            let c= a
                            console.log("C"+ " "+ c)
                            if(c[0] || c[0]!==null || c[0]!==undefined){
                                res.send({product: c})            }
                            else{
                                res.send({product: c});
                            }
                        }
                    }
                    catch{
                        (e)=>{console.log(e)}
                    }
                };
                findO(a)
            }
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    findUserANdTokenCart();
    }
})
app.post("/order/register/:userId", (req, res)=>{
    var reqData=req.body;
    console.log(reqData)
    var valueInArray= Object.values(reqData);
    var len= valueInArray.length-7;
    var save= async function(){
        try{    
            let name= JSON.stringify(req.body.name);
            let email= JSON.stringify(req.body.email);
            let phone= JSON.stringify(req.body.phone);
            let whatsapp= JSON.stringify(req.body.whatsapp);
            let address= JSON.stringify(req.body.address);
            let message= JSON.stringify(req.body.message);
            let arr=[]
            let ProductData= valueInArray.find((val, i)=>{
                let length=i+1
                    var obj={
                        id: val[0],
                        img: val[1], 
                        title: val[2],
                        price: val[3],
                        quantity: val[4],
                        colors: val[5],
                        sizes: val[6]
                    }
                let c= arr= arr.concat(obj)
                if(length==len){
                    let o =arr;
                    var placeOrderInUser= async function(){
                        let userDetails= await user.findOne({_id: req.params.userId});
                        let cart= userDetails.cart;
    
                        var cartUpdate= userDetails.cart= [];
                        let userDetail={
                            id: req.params.userId,
                            name: name,
                            email: email,
                            phone: phone,
                            whatsapp: whatsapp,
                            address: address,
                            message: message
                        };
                        let placeOrder= new orderDB({
                            userId: req.params.userId,
                            userDetails: userDetail,
                            orderDetails: o,
                            paymentMethod: req.body.paymentMethod
                        });
                        let ab=await placeOrder.save();
                        var order= userDetails.order= userDetails.order.concat(ab._id);
                        var s=await userDetails.save();
                        res.redirect("/cart");
                    };placeOrderInUser();
                }
            })
    }
    catch{
        (e)=>{console.log(e)}
    }
    };
    save();
});

app.post("/order/unregistered", (req, res)=>{
    var orderUnregister= async function(){
        try{
        let token= req.cookies.jwt
        if(!token  ||token== null || token== undefined || token.length == 0){
            let addProductUnregister= async function(){
            try{
                let {paymentMethod, id, price, img, title, quantity, colors, sizes, message, name, email, phone, whatsapp, address}= req.body
                let insert= new orderUnregisterDB({
                    name: name,
                    email: email,
                    phone: phone,
                    whatsapp: whatsapp,
                    address: address,
                    paymentMethod:paymentMethod,
                    id: id,
                    img: img,
                    title: title,
                    price: price,
                    quantity: quantity,
                    colors: colors,
                    sizes: sizes,
                    message:message
                });
                let result = await insert.save();
                console.log(result)
                res.send("YOUR ORDER WILL BE SUBMITTED AFTER CONFIRMING IT BY YOUR GIVEN INFORMATION KEEP UPDATED AND HAPP SHOPPING")
            }
            catch{
                (e)=>{
                    console.log(e)
                }
            }
            };
            addProductUnregister();
                
        }
        else{
            var addProductRegister= async function(){
            var verify=  jwt.verify(token, process.env.KEY);
            var findUser= await user.findOne({_id: verify._id});
            let {paymentMethod, id, price,img, title, quantity, colors, sizes,message, name, email, phone, whatsapp, address}= req.body;
            let userDetail={
                id: findUser._id,
                name: name,
                email: email,
                phone: phone,
                whatsapp: whatsapp,
                address: address,
                message: message
            };
            
            let orderDetail={  
                id: id,
                img: img, 
                title: title,
                price:  price,
                quantity: quantity,
                colors: colors,
                sizes: sizes
            }
            let placeOrder= new orderDB({
                userId: findUser._id,
                userDetails: userDetail,
                orderDetails: orderDetail,
                paymentMethod: paymentMethod
            });
            let ab=await placeOrder.save();
            let o = findUser.order=findUser.order.concat(ab._id);
            let s= await findUser.save();
            res.redirect(`/view/${id}`)
            };
            addProductRegister();
        }
        }catch{
            (e)=>{console.log(e)}
        }
    };
    orderUnregister();
});

app.get("/logout", (req, res)=>{
    let token= req.cookies.jwt;
    console.log(token)
    if(!token && token== undefined && token == null || token.length==0){
        res.send(false);
    }
    else{    
            var findUserANdToken= async function(){
            try{
                var verify=  jwt.verify(token, process.env.KEY);
                if(verify && verify!== undefined && verify!== null){
                var findUserAndRemoveToken= await user.findByIdAndUpdate({_id: verify._id}, {$set:{tokens:[]}}, {
                    new: true, useFindAndModify: false
                });
                res.cookie("jwt", "");
                res.redirect("/")
                }
            }
            catch{
                (e)=>{console.log(e)}
            }
        };
        findUserANdToken();
    }
});

app.post("/comment/:id", (req, res)=>{
    var comment= async function(){
        let com= JSON.stringify(req.body.comment)
        try{
            let token= req.cookies.jwt;
            if(!token || token== undefined || token == null || token.length==0){
                res.redirect("/login")
            }
            else{  
                 var verify=  jwt.verify(token, process.env.KEY);
                 console.log(verify)
                 if(verify && verify!== undefined && verify!== null){    
                     let f= async function(){
                        try{
                            let u= await user.findOne({_id: verify._id})
                            let productId= req.params.id;
                            let name= u.name;
                            let comment= com;
                            let findProduct= await product.findOne({_id: productId});
                            let productComment= findProduct.comments= findProduct.comments.concat({name: name, comment: comment})
                            let a=await findProduct.save();
                            res.redirect(`/view/${productId}`)
                        }
                        catch{
                            (e)=>{console.log(e)}
                        }
                     };
                     f();
                }
                else{
                res.redirect("/login")
                }
                
            }
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    comment();  
});

app.get("/u/recieved", (req, res)=>{
    let token= req.cookies.jwt;
    if(!token || token== null || token== undefined ||token.length==0){
        res.send(false)
    }
    else{      
        var findUserANdTokenCart= async function(){
        try{
            var verify =  jwt.verify(token, process.env.KEY);
            var findUser= await user.findOne({_id: verify._id});
            let recieved= findUser.received;
            let c;
            let a=[];
            for (let i=0; i<=recieved.length; i++){
                let find= async function(a){
                    try{
                        let index=i+1
                        var findDelievered= await delieveredDB.findOne({_id:recieved[i]}).sort({date: -1});
                        let arr=a.push(findDelievered)
                        if(index===recieved.length){
                            let c= a
                            console.log(c)
                            if(c || c!==null || c!==undefined){
                                res.send({product: c})            }
                            else{
                                res.send({product: c});
                            }
                        }
                    }
                    catch{
                        (e)=>{console.log(e)}
                    }
                };
                find(a)
            }
        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    findUserANdTokenCart();
    }
});
app.post("/feed/:sub", (req, res)=>{
    var feedandComments= async function(){
        try{
            let sub= req.params.for;
            let {email, message}= req.body;
            let feedData= new feed({
                email: email,
                message: message,
                sub: sub
            });
            let data= await feedData.save();
            res.send(true)

        }
        catch{
            (e)=>{console.log(e)}
        }
    };
    feedandComments();
})
app.listen(port, ()=>{
    console.log(`connected at port no ${port}`)
})