const collegeModel= require("../models/collegeModel")

const mongoose= require("mongoose")
const internModel = require("../models/internModel")

const collegeValidation = async (req,res,next)=> {
    let data = req.body
    if(Object.keys(data).length==0) return res.status(400).send({status:false, message:"No data Present!"})
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
const internValidation = async (req,res,next)=> {
    let data = req.body
    if (Object.keys(data).length==0) return res.status(400).send({status:false, message:"No data Present!"})
    let {name, email,mobile, collegName, collegeId} = data
    if(!name|| !email || !mobile) return res.status(400).send({status:false, message:"name/email/mobile is not Present!"})

    name = name.trim().toLowerCase()
    function validatename(input){
        let re = /^[A-Za-z ]+$/
        return re.test(input)
    }
    if(validatename(name)==false) return res.status(400).send({status:false, message:"name Takes only Alphabets!"})
    function validemail(input){
        let re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(input)
    }
    if(validemail(email)==false) return res.status(400).send({status:false, message:"invalid email Format!"})
    let present = await internModel.findOne({email:email})
    if(present) return res.status(400).send({status:false, message:"Email already Present/ enter new email or Login"})
    function validmobile(input){
        var mobile=input;
            if(mobile.length!=10){
                return false;

            }
            intRegex = /[0-9 -()+]+$/;
            var is_mobile=true;
            for ( var i=0; i < 10; i++) {
                if(intRegex.test(mobile[i]))
                     { 
                     continue;
                     }
                    else{
                        is_mobile=false;
                        break;
                    }
                 }
            return is_mobile;
    }
    if (validmobile(mobile)==false) return res.status(400).send({status: false, message:"Invalid Mobile number!"})
    let present1 = await internModel.findOne({mobile:mobile})
    if(present1) return res.status(400).send({status:false, message:"Mobile Number already Present! "})
    if(req.body.collegeId){

        let valid = mongoose.Types.ObjectId.isValid(collegeId)
        if(!valid) return res.status(400).send({status:false, message:"Invalid Id! "})
        let present2 = await collegeModel.findOne({_id:collegeId})
        if(!present2) return res.status(404).send({status:false, message:"CollegeId not present"})
        req.body.name= name
        req.body.email= email
        req.body.mobile= mobile
        next()
    }
    else if (req.body.collegeName){

        let present3= await collegeModel.findOne({name:req.body.collegeName})
        if(!present3) return res.status(404).send({status:false, message:"College name not present/wrong"})
        let Id= present3._id.toString()
       
        req.body.name= name
        req.body.email= email
        req.body.mobile= mobile
        req.body.collegeId=Id
        next()
    }
    else{
        return res.status(400).send({status:false, message:"Collegename or Id must be present! "})
    }
    
    
}
module.exports.collegeValidation= collegeValidation
module.exports.internValidation= internValidation
