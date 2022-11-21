const express= require('express')
const router = express.Router()

const collegeController= require("../controller/collegeController")
const validation = require("../validation/validation")

router.get("/servertest", (req, res) => res.send("server working fine !"))

router.post("/functionup/colleges",validation.collegeValidation ,collegeController.createCollege )


module.exports= router