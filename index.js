
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

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const services = await cursor.toArray();

            res.send(services);
        })

        app.get('/service/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};

            const result = await userCollection.findOne(query);

            res.send(result);
        })

        app.post('/addservice', async(req,res)=>{
            const doc = req.body;
            const result = await userCollection.insertOne(doc);
            res.send(result);
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