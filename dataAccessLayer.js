const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const databaseName = "grocery-db";
const collectionName = 'products';
const mongoDbUrl = process.env.MONGODB_URL;
const settings = {
  useUnifiedTopology: true
};

console.log("mongoDbUrl: " + mongoDbUrl);

let database;

const Connect = function() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoDbUrl, settings, function(err, client) {
      if (err) {
        reject(err);
      } else {
        console.log("SUCCESSFULLY CONNECTED TO DATABASE MY DUDE");

        database = client.db(databaseName);
        resolve();
      }
    });
  });
};
const Remove = function(product) {
  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);
    productCollection.removeOne(product, function(err, result) {
      if (err) {
        reject(err);
      } else {
        console.log("product removed successfully");
        resolve(result);
      }
    });
  });
};

const Update = function(product, updatedProduct) {
  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.updateOne(product, updatedProduct, function(err, result) {
      if (err) {
        reject(err);
      } else {
        console.log("Product updated successfully");
        resolve(result);
      }
    });
  });
};
const Find = function(product) {
    let productQuery = {};


  let query = {};

  if(product){
      
    productQuery = product;
  
}

  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);

    productCollection.find(productQuery).toArray(function(err, result) {
      if (err) {
        reject(err);
      } else {
        console.log("Product found successfully");
        resolve(result);
      }
    });
  });
};

const Insert = function(product) {
  return new Promise((resolve, reject) => {
    const productCollection = database.collection(collectionName);
    productCollection.insertOne(product, function(err, result) {
      if (err) {
        reject(err);
      } else {
        console.log("GIGGITY GIGGITY");
        resolve(result);
      }
    });
  });
};

// const promise = Connect();
// console.log(promise);
// promise
//   .then(() => {
//     console.log("Promise is lit fam");
    
 

//     Update(product, updatedProduct)
//     .then(result => {
//         console.log('product updated successfully');
//     })
//     .catch(err => {
//         console.log(err);
//     });

//     Remove(product)
//     .then(result => {
//         console.log('successfully removed product');
//     })
//     .catch(err =>{
//         console.log;
//     });
    
//     Insert(product)
//       .then(result => {
//         console.log("Successfully inserted product");
//       })
//       .catch(err => {
//         console.log;
//       });

//     Find (product)
// .then (result => {
//     console.log(result);
// })
// .catch(err => {
//     console.log(err);
// });

//   })
//   .catch(err => {
//     console.log("Promise aint vibin", err);
//   });
  module.exports = {Connect, Insert, Find, Remove, Update};
