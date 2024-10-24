const express = require('express');
const cors = require('cors');
const db = require('./database/db'); 
const userRoutes = require('./routes/user');

const app = express();
 db()
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Welcome to Application");
});

app.use("/user", userRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});