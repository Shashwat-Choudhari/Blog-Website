import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { render } from "ejs";
const app = express();
const port = 3000;
app.use(express.static("public"));

const API_URL = "http://localhost:4000/blogs";


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/create",(req,res)=>{
    res.render("create.ejs");
});

app.get("/view",async (req,res)=>{
    try {
        const response = await axios.get(API_URL);
        res.render("view.ejs",{blogs: response.data});        
    } catch (error) {
        res.status(404).send(error.message);   
    }
    
});

app.post("/submit",async (req,res)=>{
    try {
        const response = await axios.post(API_URL,req.body);
        res.render("create.ejs",{blog: response.data});

    } catch (error) {
        res.status(404).send(error.message);
    }    
    
});

app.get("/edit/:id",async (req,res)=>{
    try {
        const response = await axios.get(API_URL+`/${parseInt(req.params.id)}`);
        res.render("update.ejs",{blog: response.data});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.post("/update/:id",async (req,res)=>{
    try {
        const response = await axios.patch(API_URL+`/${parseInt(req.params.id)}`,req.body);
        res.render("update.ejs",{modifiedBlog: response.data});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/delete/:id",async (req,res)=>{
    try {
        const response = await axios.delete(API_URL+`/${parseInt(req.params.id)}`);
        res.render("view.ejs",{blogs: response.data});
    } catch (error) {
        res.status(404).send(error.message);
    }
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

