const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/list");
const cors = require("cors");

dotenv.config();
app.use(cors())
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connectio Successfully")
    })
    .catch(
        (err) => {
            console.log(err)
        }
    )

app.use(express.json());

  

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);


app.listen(4000, () => {
    console.log("Backend Server is running!");
})