const express = require('express')
const path = require('path')
const hbs = require('hbs')
const collection = require('./mongodb')
const app = express()
const cloudinary = require('./cloudinary')
const multer = require('multer')


app.use(express.static(path.join(__dirname, '../public')));

const upload = multer({ dest: 'uploads/' });    // Temporary file storage

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


app.post("/signup", upload.single('image'), async(req,res)=>{
    
    try {

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'images' });

        const data = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        imageUrl: result.secure_url,
        }

        await collection.create(data)
        // await collection.save();

        // res.render('login')
        res.render('login', { signupSuccess: "Account created successfully! Please login." });
    }

    catch (err) {
        console.error(err);
        res.status(500).send('Error uploading image');
      }

})

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
