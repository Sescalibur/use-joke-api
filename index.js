import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const api_URL = "https://v2.jokeapi.dev/joke/";
var category;
var type;
var contains;
var lastURL;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  //console.log(lastURL);
  if (lastURL) {
    try {
      const result = await axios.get(lastURL);
      res.render("index.ejs", { 
        joke : result.data.joke,
        type : result.data.type,
        setup : result.data.setup,
        delivery : result.data.delivery,
        category : result.data.category,
        error : result.data.error});
    } catch (error) {
      console.log(error.response.data);
      res.status(500);
    }
  }
  else{
    res.render("index.ejs");
  }
  
});

app.post("/joke", async (req, res) => {
  //console.log(req.body.category);
  category = req.body.category;
  type = req.body.type;
  contains = req.body.contains;
  if(type){
    lastURL = api_URL + category + "?type=" + type;
    //console.log(lastURL);
  }
  else{
    if(contains){
      lastURL = api_URL + category + "?contains=" + contains;
      //console.log(lastURL);
    }
    else{
      lastURL = api_URL + category;
     //console.log(lastURL);
    }
  }
  res.redirect("/");
});
app.post("/joke2",async (req,res)=>{
  contains = req.body.contains;
  if(contains){
    lastURL = api_URL +"Any?contains=" + contains;
    //console.log(lastURL);
  }
  else{
    lastURL = api_URL +"Any";
   //console.log(lastURL);
  }
  //console.log(contains);
  
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
