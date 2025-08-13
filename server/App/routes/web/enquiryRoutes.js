
let express = require("express");
const { enquiryInsert, enquiryView, enquiryDelete, enquirySingleUser, enquiryUpdate } = require("../../controllers/web/enquiryController");
let enquiryRouter = express.Router();

enquiryRouter.post("/insert",enquiryInsert);
enquiryRouter.get("/view",enquiryView);
enquiryRouter.delete("/delete/:id",enquiryDelete);
enquiryRouter.get("/singleUser/:id",enquirySingleUser);
enquiryRouter.put("/update/:id",enquiryUpdate);

module.exports = enquiryRouter; 