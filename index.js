
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000 ;

const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASSWORD}@cluster0.0ihcm8w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const collection = client.db('Car_Mechanic').collection('Services');

        const query = {};
        const cursor = collection.find(query);
        const services = await cursor.toArray();

    }
    finally{}
}


app.get('/', (req, res)=>{
    res.send('hellow world');
})


app.listen(port, ()=>{
    console.log('connecting to port 5000');
})