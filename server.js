import express from "express";
import bodyParser from "body-parser";
import { render } from "ejs";
const app = express();
const port = 4000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let allBlogs = [{
    id: 1,
    blogTitle: "What is a Blog Post ?" ,
    blogContent: "A blog post is any article, news piece, or guide that's published in the blog section of a website. A blog post typically covers a specific topic or query, is educational in nature, ranges from 600 to 2,000+ words, and contains other media types such as images, videos, infographics, and interactive charts.",
},
{
    id: 2,
    blogTitle: "Environment",
    blogContent: "Descending from the Middle French preposition environ “around,” environment , in its most basic meaning, is “that which surrounds.” When preceded by the and unmodified, it usually refers to the natural world (“please don’t litter if you care about the environment”). In a less physical, more extended sense, it may signify the circumstances and conditions that make up everyday life (“He grew up in a loving environment.”) The word may also be applied in highly specialized ways, denoting, for example, “the position of a linguistic element” (“how g gets pronounced in Italian depends upon its phonetic environment”) or “a computer interface from which various tasks can be performed” (the app works in varied environments).",
},
{
    id: 3,
    blogTitle: "The Rise of Decentralized Finance",
    blogContent: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",

},
{
    id: 4,
    blogTitle: "The Impact of Artificial Intelligence on Modern Businesses",
    blogContent: "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities."
}
];

app.get("/blogs",(req,res)=>{
    res.json(allBlogs);
});

app.get("/blogs/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const selectedBlog = allBlogs.find((blog)=>blog.id===id);
    res.json(selectedBlog);

})

app.post("/blogs",(req,res)=>{
    const newBlog = {
        id: allBlogs.length + 1,
        blogTitle: req.body.title,
        blogContent: req.body.content
    };
    allBlogs.push(newBlog);
    res.json(newBlog);
});

app.patch("/blogs/:id" , (req,res)=>{
    const id = parseInt(req.params.id);
    const existingBlog = allBlogs.find((blog)=> blog.id === id);
    const repacementBlog = {
        id: id,
        blogContent: req.body.content || existingBlog.content,
        blogTitle: req.body.title || existingBlog.title
    };
    const searchIndex = allBlogs.findIndex((blog)=>blog.id === id);
    allBlogs[searchIndex] = repacementBlog;
    res.json(repacementBlog);

});

app.delete("/blogs/:id",(req,res)=>{

    const id = parseInt(req.params.id);
    const searchIndex = allBlogs.findIndex((blog)=>blog.id === id);
    if(searchIndex == -1)
    {
        res.sendStatus(400).json({error: `Could not find Blog with id ${id}`});        
    }
    else
    {
        allBlogs.splice(searchIndex,1);
        res.json(allBlogs);
    }
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});