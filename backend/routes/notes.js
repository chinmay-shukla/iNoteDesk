const express = require('express')
const router = express.Router()
const Notes = require("../models/Notes")
const fetchuser = require('../middleware/fetchuser')


const { body, validationResult } = require('express-validator');

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some internal error occurs");
  }
})

router.post("/addnote", fetchuser,
  body('title', "Enter a valid title").isLength({ min: 3 }),
  body('description', "Description must be at least 5 characters").isLength({ min: 5 })
  , async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      const note = await Notes.create({
        user: req.user.id, title, description, tag,
      })

      res.json(note)

    } catch (error) {
      console.error(error.message)
      res.status(500).send("Some internal error occurs");
    }

  })

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  const newnote = {}

  if (title) { newnote.title = title };
  if (description) { newnote.description = description };
  if (tag) { newnote.tag = tag };

  try {
    let note = await Notes.findById(req.params.id)
    if (!note) { return res.status(404).send("not found") }

    if (note.user.toString() !== req.user.id) { return res.status(401).send("not allowed") }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })

    res.json(note)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some internal error occurs");
  }

})

router.delete("/deletenote/:id", fetchuser, async (req, res) => {

  try {
    let note = await Notes.findById(req.params.id)
    if (!note) { return res.status(404).send("not found") }

    if (note.user.toString() !== req.user.id) { return res.status(401).send("not allowed") }

    note = await Notes.findByIdAndDelete(req.params.id)

    res.json({ "success": "deleted succesfully" })
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some internal error occurs");
  }
})


module.exports = router;
