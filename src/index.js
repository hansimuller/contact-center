import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import makeCall from '../entities'

const app = express()

app.use(bodyParser.json())
app.post(`/call`, makeCall())
app.use(makeCallback(notFound))

// listen for requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})


export default app
