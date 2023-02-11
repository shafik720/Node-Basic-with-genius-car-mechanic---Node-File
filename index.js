
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

require('dotenv').config();

app.use(cors());  

app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASSWORD}@cluster0.0ihcm8w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db('Car_Mechanic').collection('Services');
        const orderCollection = client.db('Car_Mechanic').collection('Orders');

        // get all service data
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const services = await cursor.toArray();

            res.send(services);
        })

        // get single service data
        app.get('/service/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};

            const result = await userCollection.findOne(query);

            res.send(result);
        })

        // add a service in database
        app.post('/addservice', async(req,res)=>{
            const doc = req.body;
            const result = await userCollection.insertOne(doc);
            res.send(result);
        })

        // delete a service from database
        app.delete('/manage/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};

            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        //  all order api here -------------------------------------
        
        // create a new order in a new database collection
        app.post('/addOrder', async(req, res)=>{
            const doc = req.body;
            const result = await orderCollection.insertOne(doc);
            res.send(result);
        })

        // get orders data
        app.get('/order/:user',async(req,res)=>{
            const user = req.params.user;

            const query = { name : user};
            const cursor = orderCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/orderData', async(req,res)=>{
            const email = req.query.email;
            const query = {email : email};
            const cursor = orderCollection.find(query);
            const result = await cursor.toArray();
            
            res.send(result);
            console.log(result);
        })

    }
    finally { 

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('hellow world');
})


app.listen(port, () => {
    console.log('connecting to port 5000');
})