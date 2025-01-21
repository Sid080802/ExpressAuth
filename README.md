# ExpressAuth
ExpressAuth is a user authentication system built using Express.js, MongoDB Atlas, and Mongoose. It provides basic functionality for user registration and login with validation for email and password. After a successful login, users are redirected to a home screen displaying a login success message.

## Features
### Sign-Up Page:

Users can register by entering their email and password.
Email and password validation is implemented to ensure valid input.
User data is securely stored in MongoDB Atlas using Mongoose.

### Login Page:

Registered users can log in using their email and password.
After successful login, users are redirected to a home screen with a "Login Successful" message.

## Technologies Used

Node.js: JavaScript runtime for building the backend.
Express.js: Framework for building the web server and handling routes.
MongoDB Atlas: Cloud-based database for storing user data.
Mongoose: ODM (Object Data Modeling) library for MongoDB.
HTML: Frontend structure for the forms.
JavaScript: Client-side functionality.

## Installation
1. Clone the Repository

git clone https://github.com/Sid080802/ExpressAuth.git
cd ExpressAuth

2. Install Dependencies
Install the required npm packages:

npm install

3. Set Up Environment Variables
Create a .env file in the root of your project and add the following:

### MONGO_URI=your_mongodb_atlas_connection_string

Replace your_mongodb_atlas_connection_string with your MongoDB Atlas connection string.

4. Run the Server
Start the server using:

node src/index.js

The application will run on http://localhost:3000
