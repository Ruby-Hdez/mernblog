import Blog from "../models/PostSchema.js";
import express from "express";
import getAuth from "../middleware/auth.js";

const BlogRouter = express.Router()
BlogRouter.use(express.json())

// create get router to fetch all blog posts 
const response = (res, status, result)=>{ // create response variable to condense callback
    res.status(status).json(result);
}

BlogRouter.get("/", getAuth, async(req, res)=> {
    await Blog.find().populate("user", "-password").sort("-createdOn")
    .then(result=>{
        response(res, 200, result)
    })
    .catch(err=>{
        response(res, 400, {error: err})
    })
})

// create a post router to create the blog post 
BlogRouter.post("/publish", getAuth, async (req, res) => {
    const {title, author, content, image} = req.body

    if (title && content) {
        // console.log(title, author, content, image, req.auth);

        const blog = new Blog ({
            title, author, content, image, user: req.userId
        })
        await blog.save()

        response(res, 200, {msg: "Blog post successfully published!", blog: blog})
    }
})

// create a router to delete a blog post 
BlogRouter.delete("/delete/:id", getAuth, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({user: req.userId, _id: req.params.id})
        if (!blog) {
            response(res, 404, {error: "Blog not found!"})
        }
        response(res, 200, {msg: "Blog successfully deleted!"})
    } catch (error) {
        
    }
})

// create a router to update a blog post 
BlogRouter.put("/update:id", getAuth, async (req, res) => {
    const {title, content, image, id} = req.body;
    await Blog.findOneAndUpdate({user: req.userId, _id: req.params.id},
        { title, content, image
        })
    .then((result)=>response(res, 200, {msg: "Blog post has been updated!", blog: result}))
    .catch(err=>response(res, 400, err))
})


export default BlogRouter;
