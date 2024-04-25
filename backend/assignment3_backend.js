

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);


app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

//read
app.get("/:id", async (req, res) => {
    const productid = Number(req.params.id);
    console.log("Product to find :", productid);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { "id": productid };

    const results = await db.collection("Product")
        .findOne(query);

    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

// create
app.post("/products", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to MongoDB for creating product");
    const product = req.body; // Assuming the request body contains the product data
    const result = await db.collection("Product").insertOne(product);
    console.log("Product created:", result.ops[0]);
    res.status(201).json(result.ops[0]);
});

// update
app.put("/products/:id", async (req, res) => {
    const productId = Number(req.params.id);
    console.log("Product to update :", productId);
    await client.connect();
    console.log("Node connected successfully to MongoDB for updating product by ID");
    const query = { "id": productId };
    const updatedData = req.body; // Assuming the request body contains the updated product data
    const result = await db.collection("Product").updateOne(query, { $set: updatedData });
    if (result.modifiedCount === 0) {
        res.status(404).send("Product not found");
    } else {
        console.log("Product updated successfully");
        res.status(200).send("Product updated successfully");
    }
});

// delete
app.delete("/products/:id", async (req, res) => {
    const productId = Number(req.params.id);
    console.log("Product to delete :", productId);
    await client.connect();
    console.log("Node connected successfully to MongoDB for deleting product by ID");
    const query = { "id": productId };
    const result = await db.collection("Product").deleteOne(query);
    if (result.deletedCount === 0) {
        res.status(404).send("Product not found");
    } else {
        console.log("Product deleted successfully");
        res.status(200).send("Product deleted successfully");
    }
});