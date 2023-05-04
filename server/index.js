const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./route/card')

require('dotenv').config()


app.use(cors())  
app.use(express.json())
app.use('/api/',router)  



mongoose.connect(`mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@nodeexpress-project.i1wimde.mongodb.net/cat-card-game?retryWrites=true&w=majority`).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on the port ${PORT}`)
    })
    
}).catch((error)=>{
      console.log(error)
})
