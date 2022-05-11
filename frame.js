const express = require('express')
const app =express();

app.get('/done/:id',(req,res)=>{
    const id=req.params.id

    if (id == 1) {
        res.send(id+" hello gokul")
    }
    if (id == 2) {
        res.send("hello naveen")
    }
}
)

app.listen(9000,(req,res)=>{
    console.log("start");
})