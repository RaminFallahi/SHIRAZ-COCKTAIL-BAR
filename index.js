//import required modules
const express = require("express");
const path = require("path");

// 7- setting up a connection to a MongoDB database
const { MongoClient } = require("mongodb");
const dbUrl = "mongodb://127.0.0.1:27017/"; //default port is 27017
const client = new MongoClient(dbUrl);

//set up Express object and port
const app = express();
const port = process.env.PORT || "8888";

// 5- define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 6-set up public folder
app.use(express.static(path.join(__dirname, "public")));
var links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Drinks", path: "/drinks" },
  { name: "Contact Us", path: "/order" },
  { name: "About Us", path: "/about" },
];

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//test message
app.get("/", async (req, res) => {
  //res.status(200).send("Test page3");
  links = await getLinks(); //9-2 links variable added
  res.render("index", { title: "Home" });
});
app.get("/drinks", async (request, response) => {
  drinks = await getDrinks(); //9-2 links variable added
  response.render("drinks", { title: "Menu Drinks", menuDrinks: drinks });
});
app.get("/about", async (request, response) => {
  links = await getLinks(); //9-2 links veriable added
  response.render("about-us", { title: "About Us", menu: links });
}); // 3-2 setting the about route
app.get("/order", (request, response) => {
  // links = await getLinks(); //9-2 links variable added
  response.render("order", { title: "Order", menu: links });
});
// 8- MONGO CONNECTION FUNCTIONS
async function connection() {
  await client.connect();
  db = client.db("shirazdb");
  return db;
}
async function getDrinks() {
  db = await connection();
  console.log("connection is ready");
  var results = db.collection("drinks").find({});
  res = await results.toArray();
  console.log("connection is ready2");
  return res;
}
async function getLinks() {
  db = await connection();
  var results = db.collection("menuLinks").find({});
  res = await results.toArray();
  return res;
}
