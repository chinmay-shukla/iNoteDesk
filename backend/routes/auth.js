const express = require('express')
const User = require("../models/User")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT_SECRET = 'In5b69oo68k'

router.post("/createuser",
  body('name', "Enter a valid name").isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', "Enter a valid password").isLength({ min: 5 })
  , async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email })

      if (user) {
        return res.status(409).json({ "EmalExists": "email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const SecPassword = await bcrypt.hash(req.body.password, salt)

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPassword,
      })

      const data = {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken })

    } catch (error) {
      console.error(error.message)
      res.status(500).send("Some internal error occurs");
    }
  })


router.post("/login",
  body('email', "Enter a valid Email").isEmail(),
  body('password', "Enter a valid password").exists()
  , async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email })

      if (!user) {
        return res.status(401).json({ error: "Plesase try to login with correct credential" });
      }

      const comparePassword = await bcrypt.compare(password, user.password)
      if (!comparePassword) {
        return res.status(401).json({ error: "Plesase try to login with correct credential" });
      }

      const data = {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken })
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ error: "Some internal error occurs" });
    }

  })


router.post("/getuser", fetchuser, async (req, res) => {
  let sucess = false
  try {
    const user = await User.findById(req.user.id).select("-password")
    sucess = true
    res.status(200).json({ sucess, user })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ sucess, error: "Some internal error occurs" });
  }

})

module.exports = router;
