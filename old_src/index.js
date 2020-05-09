const express = require('express')
const makeCall = require('./entities')

const app = express()

app.post(`/call`, makeCall())

// listen for requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
