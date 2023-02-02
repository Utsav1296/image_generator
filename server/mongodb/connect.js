import mongoose from "mongoose";

const connectDB = (url) => {
   //useful when working with search functionality
   mongoose.set('strictQuery', true)

   //connecting to database
   mongoose.connect(url)
      .then(() => console.log('mongoDB connected'))
      .catch(err => console.log('mongoDB', err))
}

export default connectDB;