// "type":"module" in package json insures ES6 syntax import
import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors'

import connectDB from "./mongodb/connect.js";
import dalleRoutes from './routes/dalleRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req, res) => {
   res.send('hello from DALL-E!..')
})

const startServer = async () => {
   try {
      connectDB(process.env.MONGODB_URL);
      app.listen(8000, () => console.log('server is running on port http://localhost:8000'))
   } catch (err) {
      console.log('startServer', err)
   }


}
startServer()