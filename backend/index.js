const express = require("express");
const mainRouter = require("./routes");
const cors = require('cors');

const port = 3000;
const app = express();
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

app.use(cors()); 


app.use("/api/v1",mainRouter);

app.get("/",(req,res)=>{
    res.json({
        msg : "working",
    })
})
