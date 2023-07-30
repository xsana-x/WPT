import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const app = express()
app.use(cors())
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));


async function addUserRecord(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("project");
  const messageColl = db.collection("registration");

  let inputDoc = {
    userName: req.query.userName,
    fullName: req.query.fullName,
    email: req.query.email,
    password: req.query.password,
    rePassword: req.query.rePassword
  };
  // let userRef = await messageColl.findOne({ userName: req.query.userName });
  // if (!userRef) {
  //   alert("User already exist")
  //   let errorMessage = `User Name already taken: ${req.query.userName}`;
  //   throw new Error(errorMessage);
  // }
  await messageColl.insertOne(inputDoc);

  await client.close();

  res.json({ opr: "success" });
}

async function login(req, res) {
  try{
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("project");
  const messageColl = db.collection("registration");

  let query ={userName: req.query.userName, password: req.query.password};
  let userRef = await messageColl.findOne(query);


  await client.close();
   

  if (!userRef) {
    let errorMessage = `Record Not Found or Authentication Failure: ${req.query.userName}`;
    throw new Error(errorMessage);
  }

  // Postive Scenario
 res.json(userRef);
} catch (err) {
  res.status(500).send(err.message);
}
}

async function findAllUser(req, res) {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("project");
    const messageColl = db.collection("registration");

    let list = await messageColl.find().toArray();

    await client.close();
    res.json(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteUserRecord(req, res) {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("project");
    const messageColl = db.collection("registration");

    if (!req.query.email) {
      throw new Error("Required field is missing");
    }

    // this line is for delete
    await messageColl.deleteOne({ email: req.query.email });

    // for delete all
    // await messageColl.deleteMany({});

    await client.close();

    res.json({ opr: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function addWishlist(req, res) {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);

  const db = client.db("project");
  const messageColl = db.collection("course");

  let inputDoc = {
    course: req.query.course,
  };
  
  await messageColl.insertOne(inputDoc);

  await client.close();

  res.json({ opr: "success" });
}

async function deleteWishRecord(req, res) {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("project");
    const messageColl = db.collection("course");

    // if (!req.query.course) {
    //   throw new Error("Required field is missing");
    // }

    // this line is for delete
    await messageColl.deleteOne({ course: req.query.course });

    // for delete all
    // await messageColl.deleteMany({});

    await client.close();

    res.json({ opr: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function findAllwishlist(req, res) {
  try {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);

    const db = client.db("project");
    const messageColl = db.collection("course");

    let list = await messageColl.find().toArray();

    await client.close();
    res.json(list);
  } catch (err) {
    res.status(500).send(err.message);
  }
}




// http://localhost:4000/addrecord
app.get("/adduser", addUserRecord);
app.get("/login-by-get", login);
app.get("/delete-user", deleteUserRecord);
app.get("/find-all-user", findAllUser);
app.get("/wishlist", addWishlist);
app.get("/delete-wish", deleteWishRecord);
app.get("/find-all-wish", findAllwishlist);
// http://localhost:4000/
app.listen(4000);
