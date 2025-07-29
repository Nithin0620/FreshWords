const express = require("express");
const app = express();
const cors = require("cors")
const {dbConnect} = require("./config/database")
require("dotenv").config();
const apiHandlingRoutes= require("./routes/handlingRoutes");
const historyHandiling = require("./routes/histroyRoutes")
const PORT = process.env.PORT ;


app.use(express.json());
app.use(cors({
  origin:`${process.env.ENVIRONMENT === "development"? "http://localhost:3000" : ""}`,
  credentials: true,
}));
app.set("trust proxy",true);

app.use("/api/handling",apiHandlingRoutes);
app.use("/api/history",historyHandiling);


app.listen(PORT,()=>{
  console.log(`Server started successfully on port : ${PORT}`);
  dbConnect();
})

app.get("/" , (req,res)=>{
  res.send(`<h1> This is homepage, response from server hance the server is up and running <h1/>`)
})


