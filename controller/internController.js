const internModel = require("../models/internModel")

const createIntern = async (req,res)=>{
    try{

        let data = req.body
        
        let saveData= await internModel.create(data)
        res.status(201).send({status:true, message:saveData})
    }
    catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

module.exports.createIntern= createIntern