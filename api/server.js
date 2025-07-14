import express from 'express'
import connectDb from '../src/Config/DbConfig.js'
import Router from '../src/Routes/user.routes.js'
import cors from 'cors'
import 'dotenv/config'
const app = express()
const port = 3000

app.use(cors());



app.use(express.json())

app.use("/api", Router)

console.log(connectDb())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
