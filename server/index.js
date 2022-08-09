const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const errorMiddleware = require('./middlewares/error-middelware')

const PORT = 5000
const uri = "mongodb+srv://Dimas322:cjcbcrf2004@cluster0.xl8vl.mongodb.net/Users?retryWrites=true&w=majority"
// "mongodb://127.0.0.1:27017"
const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json({ extended: true}))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', require('./routes/index'))
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(uri)
        app.listen(PORT, () => console.log("Server started on port " + PORT))
    } catch (e) {
        console.log(e)
    }
}
start().catch(console.dir);