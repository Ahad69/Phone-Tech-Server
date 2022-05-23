const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000 ;

app.use(cors());
app.use(express.json())




const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.sbmqf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const productsCollection = client.db("phoneTech").collection("products");
      const orderCollection = client.db("phoneTech").collection("orders");
      const reviewsCollection = client.db("phoneTech").collection("reviews");
      const profileCollection = client.db("phoneTech").collection("profile");
    
      app.get('/products' , async(req, res)=>{
          const query = {};
          const result = await productsCollection.find(query).toArray()
          res.send(result)
      })

      app.post('/orders' , async(req,res)=>{
        const query = req.body;
        const result = await orderCollection.insertOne(query);
        res.send(result)
      })
      app.get('/all-orders', async(req,res)=>{
        const query = {}
        const result = await orderCollection.find(query).toArray()
        res.send(result)
      })

      app.get('/orders', async(req,res)=>{
        const customerEmail = req.query.customerEmail;
         const query = {customerEmail}
        const result = await orderCollection.find(query).toArray()
        res.send(result)
      })

      app.delete('/orders/:id' , async(req,res)=>{
          const id = req.params.id;
          const query = {_id:ObjectId(id)}
          const result = await orderCollection.deleteOne(query);
          res.send(result)
      })
    
      app.post('/reviews' , async(req,res)=>{
        const query = req.body;
        const result = await reviewsCollection.insertOne(query);
        res.send(result)
      })
      app.get('/reviews', async(req,res)=>{
        const query = {};
        const result = await reviewsCollection.find(query).toArray()
        res.send(result)
      })

      app.post('/profile' , async(req , res)=>{
        const query = req.body;
        const result = await profileCollection.insertOne(query);
        res.send(result)
      })
      app.get('/profile' , async(req , res)=>{
        const userEmail = req.query.userEmail;
        const query = {userEmail}
        const result = await profileCollection.find(query).toArray();
        res.send(result)
      })
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);



app.get('/' , (req , res)=>{
    res.send('server is running like a bird')
})

app.listen(port , ()=>{
    console.log('server is running like a bird' , port)
})