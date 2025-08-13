const enquiryModel = require("../../models/enquiry-model");


let enquiryInsert = (req, res) => {

    let {name, email, phone, message} = req.body;
    let enquiry = new enquiryModel({
        name,
        email,
        phone,
        message
    })

    enquiry.save().then(()=>{
        res.send({status : 1, message : "Enquiry saved successfully"});
    }).catch((err)=>{
        res.send({status : 0, message : "Something went wrong while inserting data", error : err});
    })
}

let enquiryView = async (req, res) => {
    let enquiryList = await enquiryModel.find();
    res.send({status : 1, msg : "Enquiry viewed successfully", enquiryList : enquiryList});
}

let enquiryDelete = async (req, res) => {
    let delId = req.params.id;
    let enquiryDelete = await enquiryModel.deleteOne({_id:delId})
    res.send({status:1, msg:"Enquiry deleted successfully",enquiryDelete});
}

let enquirySingleUser = async(req, res) => {
    let viewId = req.params.id;
    let enquiry = await enquiryModel.findOne({_id:viewId});
    res.send({status:1, msg:"Enquiry viewed successfully",enquiry});
}

let enquiryUpdate = async(req, res) => {
    let edId = req.params.id;
    let {name, email, phone, message} = req.body;
    let updateObj = {
        name,email,phone,message
    }
    let enquiryUpdate = await enquiryModel.updateOne({_id:edId},updateObj)
    
    res.send({status:1, msg:"Enquiry Updated Successfully",enquiryUpdate})
}

module.exports = {enquiryInsert, enquiryView, enquiryDelete, enquirySingleUser, enquiryUpdate};