
let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const enquiryRouter = require("./App/routes/web/enquiryRoutes");
require("dotenv").config();
let myApp =  express();
myApp.use(cors());

myApp.use(express.json());

myApp.use("/api/web/enquiry/",enquiryRouter);

mongoose.connect(process.env.dbUrl).then(()=>{
    console.log("Connected to mongodb");
    myApp.listen(process.env.PORT || 3000, ()=>{
        console.log("server is running at port ",process.env.Port); 
    })
}).catch((err)=>{
    console.log("Something went wrong",err);
})

