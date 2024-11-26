const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Import the body parser package
//This package contains middleware that can handle
//this parsing of many different types of data,
//making it easier to work with data in routes that
//acccept data form the client(post,PATCH)
const port = 3000;

// import the data from the fake database files
const fruits = require("./data/fruits");
//================MIDDLE WARE ======================
//this is imported middleware , meaning that we are using code that soemone els eworte
// we use the body-parser middleware first so that
//we have access  to the parsed daa within our routes
//the parsed data will be located in req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use((req, res, next) => {
  console.log("Middleware: I run for all routes");
  next();
});

app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `time.toLocaleDateString()}:Received a ${req.method} request to ${req.url}.`
  );
  console.log(req.body);
  //     if(Object.keys(req.body).length>0)
  // {
  //     console.log('Containing the data:')
  //     console.log(`${JSON.stringify(req.body)}`)
  //     }
  next();
});

//we are going to create a full crud application
// C- Creaqte new data
//R-Read Existing Data
//U-Updat existing Data
//D-Delete extising Data
//====This corresponds to 4 HTTP verbs
//CRUD               HTTP
// C-Create -        POST
//R-Read    -        GET
//U-pdate   -        PUT,PATCH
//D-Delete  -        Delete

//With server-side rendering , you also need the views for someone to imput to put or ppost
// Induces
//I - Starts form index route  - Index - Get - Read - display all of the the elements
//N - New                              - Get - CREATE-* but this is a view that allows user inputs
//D- Delete                            - Delete - Deletes the data
//U - UPdate                            - PUT * UPDATE this updates the  data
//C - Create                            -POST - CREATE * this adds new data
//E - Edit                              - GET - * Update* but this a view that allows user inputs
//S - Show                               - GET - READ - displays

//create routes to represent the different requests
//define the route
//define the method
//start with the get request
//app.get(route,function)
//the route is what the client or user types in for the request
// the function is how we respond

app.get("/", (req, res) => {
  res.send("<div>this is my home</div>");
});
app.get("/index", (req, res) => {
  res.send("<h1> THis is my index page</h1>");
});

//** between frontend and backend */
// INDEX

// this is called an index route, where you can see all ogf the data
//THis is one versin of Read
//Read many
//This only Practical when you have small amouts of data
//but you can also use an index route and limit the number of responses
// app.get("/api/fruits", (req, res) => {
//   res.json(fruits);
//   res.send('this was the post route')
// });
//DELETE

app.delete("/api/fruits", (req, res) => {
  if (req.params.id >= 0 && req.params.id < fruits.length) {
    fruits.splice(req.params.id, 1);
  } else {
    res.semd("<p> That is not a valid id</p>");
  }
});
// Update
app.put("/api/fruits/:id", (req, res) => {
  if (req.params.id >= 0 && req.params.id < fruits.length) {
    res.send(`updating ${fruits[req.parms.id].name})`);
  } else 
  {
    res.semd("<p> That is not a valid id</p>");
  }
});
//patch updated part of it
app.patch('api/frutis/:id',(req,res)=>{
  if(req.params.id>=0 && req.params.id<fruits.length)
  {
    console.log(fruits[req.params.id]);
    console.log(req.body)
    const newFruit={...fruits[req.params.id],...req.body}
    res.json(newFruit);

  }
  else
  {
    res.send('<p>That is not a valid id</p>')
  }
})
// CREATE
app.post("/api/fruits", (req, res) => {
  console.log(req.body);
  fruits.push(req.body);
  res.json(fruits);
  //  res.send('this was the post route');
});

// app.post('/api/fruits', (req, res) => {
//     // you should check this when you first start, but then get rid of this console.log
//     // console.log(req.body);
//     fruits.push(req.body)
//     // res.send('this was the post route');
//     res.json(fruits);
// })

// another version of READ is called a slwo route
//in the one, we can see more infomation on an individual piece of data
app.get("/api/fruits/:id", (req, res) => {
  // in this case, my unique identifier is going to be the array index
  // res.send(`<div>${req.params.id}</div>`)
  // this id can be anything, so i probably want to do some checking
  // before accessing the array
  if (req.params.id >= 0 && req.params.id < fruits.length) {
    res.json(fruits[req.params.id]);
  } else {
    res.send("<p>That is not a valid id</p>");
  }
});

app.use((req, res, next) => {
  console.log(
    "Iam only in this middlewareif not other routes have sent a response."
  );
  res.status(404);
  res.json({ error: "Resources not found" });
});

//have your appliation start and  listen for requests
//this is a server,so will be listening for requests and responding
app.listen(port, () => {
  console.log("listening");
});
