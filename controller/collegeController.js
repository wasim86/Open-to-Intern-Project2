const collegeModel = require("../models/collegeModel")


const createCollege = async (req,res)=>{
    try{

        let data = req.body
        
        let savedData= await collegeModel.create(data)
        res.status(201).send({status:true, message:savedData})
    }
    catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

module.exports.createCollege= createCollege