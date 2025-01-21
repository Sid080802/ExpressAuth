const mongoose = require('mongoose')
require('dotenv').config({ path: './.env' });


mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000, 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Connection error:', err))

const signupSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,  
      },
      email: {
        type: String,
        required:true,  
      },
      password: {
        type: String,
        required:true,
      },
      confirmPassword: {
        type: String,
        required:true,
      },

      imageUrl: {
        type: String,
        required:true,
      },

})

const collection = new mongoose.model("Collection1", signupSchema)

module.exports=collection




