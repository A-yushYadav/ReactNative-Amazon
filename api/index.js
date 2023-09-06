const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
const { error } = require("console");

mongoose.connect("mongodb+srv://ayushy:ayush@cluster0.jwicxag.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDb", err);
    });

app.listen(port, () => {
    console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

//function to send verification email to user
const sendVerificationEmail = async (email, verificationToken) => {
    //create a nodemailer transport 
    const transporter = nodemailer.createTransport({
        //configure the email services
        service: "gmail",
        auth: {
            user: "ayush020yv@gmail.com",
            pass: "vxxnbbhpuzrfpbnk"
        }
    });

    // compose the email message
    const mailOptions = {
        from: "amazon.com",
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email : http://192.168.1.13:8000/verify/${verificationToken}`,
    };
    //send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email", error);
    }
};

//endpoints to register in the app 
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(email, "email")
        //check if email is already register
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email Already registered" });
        }

        //create a new user
        const newUser = new User({ name, email, password });
        //generate and  store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        // save the user in to the database
        await newUser.save();
        // send verification email to user 
        sendVerificationEmail(newUser.email, newUser.verificationToken);
    } catch (error) {
        console.log("error registering user ", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

//endpoints to verify email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        //find the user with the given verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification  token" })
        }
        //mark user as verifyed 
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified  succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Email verification failed" });
    }
});
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
}
const secretKey = generateSecretKey();

//endpoint to login the user 
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // check if the passord is correct 
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // generate a token
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token })
    } catch {
        res.status(500).json({ message: "login failed" });
    }
})
//endpoint to store a new address to the backend 
app.post("/addresses", async (req, res) => {
    try {
        const { userId, address } = req.body;

        //find the user by the user id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found " });
        }

        //add the new address to the user's address array   
        user.addresses.push(address);

        //save the updated user in the backend
        await user.save();

        res.status(200).json({ message: "address created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding address " });
    }
})

//endpoint to get all the address of a perticular user 
app.get("/addresses/:userId", async (req, res) => {
    try {
        const userId = req.params.userId

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const addresses = user.addresses;

        res.status(200).json({ addresses })
    } catch (error) {
        res.status(500).json({ message: "Error retreving the  addresses " });

    }
})

//endpoints to store all orders
app.post("/orders", async (req, res) => {
    try {
        const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found " });
        }
        //create an array of product objects form the cart items
        const products = cartItems.map((item) => ({
            name: item?.title,
            quantity: item.quantity,
            price: item.price,
            image: item?.image,
        }));
        // create a new order
        const order = new Order({
            user: userId,
            products: products,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
        });
        await order.save();
        res.status(200).json({ message: "Order created successfully" })

    } catch (error) {
        console.log("error creating order", error);
        res.status(500).json({ message: "Error creating order " });
    }
})

// get the user profile
app.get("/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found " });
        }
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving the user profile  " });
    }
})

app.get("/orders/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const orders = await Order.find({ user: userId }).populate("user");
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "no orders  found  for the user" });
        }
        res.status(200).json({orders});
    } catch (error) {
        res.status(500).json({ message: "Error " });
    }
})