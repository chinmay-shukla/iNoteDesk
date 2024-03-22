const connectTomongoose = require('./db')
const express = require('express')
const cors = require('cors')
const app = express()

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const port = 5000;

connectTomongoose()

app.use(express.json())
app.use(cors())

app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
