require("dotenv").config();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});

app.post("/signup", async (req, res) => {
    const db = client.db("pa2");
    const users = db.collection("users");
    const { username, password, firstName, lastName } = req.body;

    
    // Check if all required fields are provided
    if (!username || !password || !firstName || !lastName) {
        return res.status(400).json({ 
            message: "Required information is missing" 
        });
    }    
    
    try{
        // Check if the username already exists, if error occurs, sends a server error message to the user
        const existingUser = await users.findOne({ username });
    
        // if username already exists, sends message to the user, otherwise creates new user in database and sends success message
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        } else {
            // Insert new user into database and return success response
            
                await users.insertOne({ 
                    username, 
                    password, 
                    firstName, 
                    lastName
                });
        
            
            return res.status(201).json({ 
                message: "User created successfully" 
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }


    
});


app.post("/login", async (req, res) => {
    // Login logic
    const db = client.db("pa2");
    const users = db.collection("users");
    const { username, password } = req.body;


    if(!username || !password) {
        return res.status(400).json ({
            message: "Required information is missing"
        });
    }

    try{
        // Check is the username exists in the database
        const user = await users.findOne({ username });

        if(!user) {
            return res.status(401).json({
                message: "Invalid username"
            });
        } else {
            // Check if the password matches
            if(user.password !== password) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            } else {
                return res.status(200).json({
                    message: "Login successful"
                });
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});


app.listen(9000, () => {
    console.log("Server running on port 9000");
});

connectDatabase();

async function connectDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB");
        console.error(error);
    }
}


