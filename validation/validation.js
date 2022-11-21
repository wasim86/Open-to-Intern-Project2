const collegeModel= require("../models/collegeModel")

const mongoose= require("mongoose")

const collegeValidation = async (req,res,next)=> {
    let data = req.body
    if(!data) return res.status(400).send({status:false, message:"No data Present!"})
    let {name, fullname, logoLink}= data
    if(!name|| !fullname || !logoLink){
        return res.status(400).send({status:false, message:"name/ fullname/ logoLink is/are Not present"})
    }
    name = name.trim().toLowerCase()
    // console.log(name)
    fullname= fullname.trim()
    function validname(input){
        if(input==name){

            let re =/^[A-Za-z]+$/
            return re.test(input)
        }else{
            let re = /^[a-zA-Z, ]+(\s[a-zA-Z, ]+)?$/
            return re.test(input)
        }
    }
    if(validname(name)==false) return res.status(400).send({status:false, message:"Only Alphabets are allowed in name! "})
    if(validname(fullname)==false) return res.status(400).send({status:false, message:"Only Alphabets, Commas, and Spaces are allowed in Fullname"})
    req.body.name= name
    req.body.fullname=fullname
    let present = await collegeModel.findOne({$or:[{fullname:req.body.fullname}, {name:req.body.name}]})
    if(present) return res.status(400).send({status:false, message:"fullname/name aready present!"})
    function linkValidation(input){
        let re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        return re.test(input)

    }
    if(linkValidation(logoLink)==false) return res.status(400).send({status:false, message:"Invalid URL"})

    next()

}
module.exports.collegeValidation= collegeValidation