require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");

const connectDB = require("./db/connection");
const jobRouter = require("./routes/jobroute");
const authRouter = require("./routes/authroute");
const authenticatUser = require("./middleware/auth");


app.use(express.json());
app.use('/api/v1/jobs', authenticatUser, jobRouter);
app.use('/api/v1/auth', authRouter);


app.use(cors())

app.get("/", (req, res) => {
    res.send("jobs API")
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`server is listing on port no. ${port}`)
        });
    }
    catch (error) {
        console.log(error);
    }

}

start();
