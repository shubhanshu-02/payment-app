const express = require("express");
const cors = require("cors")
const app = express();
const dotenv = require('dotenv')
dotenv.config();

app.use(cors());
app.use(express.json());
 
const mainRouter = require("./routes/index")

app.use("/api/v1/", mainRouter);

app.listen(3000);

