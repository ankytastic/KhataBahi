const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();


app.use(cors());
app.use(express.json());
app.get('/api/test',(req,res)=>{
    res.json('test ok3');
});

app.post('/api/transaction',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const {name,price,datetime,description}=req.body;
    const transaction=await Transaction.create({name,price,datetime,description});
    res.json(transaction);
    // console.log(process.env.MONGO_URL);    
    // res.json(req.body);
});

app.get('/api/transactions',async(req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});

app.listen(4143); 

//oCQbDvsO9JQj8yCu