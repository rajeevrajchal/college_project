const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./routes')(app)

const port = 3000
app.listen(port, () => {
    console.log(`server  hosted on localhost:${port}`)
});