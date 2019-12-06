const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const DAL = require('./dataAccessLayer');
const ObjectId = require('mongodb').ObjectId;




app.use(bodyParser.json());

DAL.Connect();




//await dataAccessLayer.Connect();

//const products = require('./products.json');


// GET ALL PRODUCTS ENDPOINT.
app.get('/api/products',cors(), async function(req, res) {

    const result = await DAL.Find();
    
    res.send(result);

});
// GET ONE PRODUCT BY ID ENDPOINT.
app.get('/api/products/:id', cors(), async function(req, res){
    const id = req.params.id;
    const product = {
        _id: ObjectId(id)    
    };

    const result = await DAL.Find(product);
    
    
    if(result) {
        res.send(result);
    }
    else {
        res.send('No Product With ID:' + id + ' found!');
    }
});

app.put('/api/products/:id', cors(), async function(req,res){
    const id= req.params.id;
    const updatedProduct = req.body;
    const product = {
        _id: ObjectId(id)    
    };
    const result = await DAL.Update(product, {$set: updatedProduct});
    res.send(result);

    
});
    

app.delete('/api/products/:id', cors(), async function(req, res) {
    const id = req.params.id;
    const product = {
        _id: ObjectId(id)    
    };

    //fs.writeFile('./products.json', json, () => {});
    //res.send();
    const result = await DAL.Remove(product);
    res.send(result);
});


app.post('/api/products', cors(), async function(req, res) {
    const product = req.body; 

    if(product.name && product.price > 0){
        const result = await DAL.Insert(product);
        res.send(result);
    }
});



app.listen(port,
    ()=> console.log(`example app listening on port ${port}!`)
);
    