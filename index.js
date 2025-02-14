const express = require('express');
const { resolve } = require('path');
const MenuItem=require('./model/MenuItem')
const app = express();
const port = 3010;
app.use(express.json());
require('dotenv').config();
const connectedDatabase=require("./database")
app.use(express.static('static'));
connectedDatabase();
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.get('/menu',async(req,res)=>{
 const menuItem =await MenuItem.find();
 res.json(menuItem)
})
app.post('/menu',async(req,res)=>{
  try{
  const {name,description,price}=req.body;
  if(!name || !description || !price){
    res.status(400).send("Please Provide all the fields")
  }
  const newMenu = new MenuItem({name,description,price})
  await newMenu.save()
  res.status(201).send("Item Added Successfully")
  }
  catch(error){
    res.status(500).send("Internal server error")
}
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});