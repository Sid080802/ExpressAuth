const express = require('express')
const path = require('path')
const hbs = require('hbs')
const collection = require('./mongodb')
const app = express()
const cloudinary = require('./cloudinary')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

app.use(express.static(path.join(__dirname, '../public')));

// Configure Multer-Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'images', // Cloudinary folder to store images
      format: async (req, file) => 'jpg', // Set default format
      public_id: (req, file) => `${Date.now()}_${file.originalname.split('.')[0]}` // Unique file name
    },
  });
  
  const upload = multer({ storage }); // Use Cloudinary storage

const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.urlencoded({extended:false}))


app.get("/", (req,res)=>{
    res.render("login")
   
});

// Route for Login Page
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/home", (req,res)=>{
    res.render("home", { logoutSuccess: "Logout successful!" });
   
});


app.post("/signup", upload.single('image'), async (req, res) => {
    try {
        // Multer-Cloudinary automatically handles file upload; req.file contains the file details
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            imageUrl: req.file.path, // Cloudinary URL
        };

        await collection.create(data);
        res.render('login', { signupSuccess: "Account created successfully! Please login." });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading image');
    }
});


// Handle Login Form Submission
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email });

        if (user && user.password === password) {
            res.render('home', { message: "Login successful!" });
            
        } else {
            res.render('login', { error: "Invalid email or password!" });
        }
    } catch (err) {
        console.error(err);
        res.render('login', { error: "An error occurred. Please try again later." });
    }
});




app.listen(3000, ()=>{

    console.log("port connected.")
})
