const express= require('express')
const router = express.Router()

const collegeController= require("../controller/collegeController")
const internController= require("../controller/internController")
const validation = require("../validation/validation")

router.get("/servertest", (req, res) => res.send("server working fine !"))

router.post("/functionup/colleges",validation.collegeValidation ,collegeController.createCollege )

router.post("/functionup/interns",validation.internValidation, internController.createIntern)


module.exports= router