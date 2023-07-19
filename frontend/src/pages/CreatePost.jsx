import React, {useState} from 'react'
import { Card, CardContent, Typography, TextField, SpeedDial, SpeedDialIcon } from "@mui/material"

const CreatePost = () => {

    const [blog, setBlog] = useState({ title: "", content: "", image: "" })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlog({ ...blog, [name]: value })
    }

    const handleSubmit = async () => {
        console.log(blog);
        const res = await fetch("http://localhost:8080/backend/Blog/publish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
            body: JSON.stringify(blog)
        })
        const data = await res.json()
        if(res.ok){
            console.log(data);
            alert("blog created")
            setBlog({title: "", content: "", image: ""})
        }else{
            console.log(data);
        }
    }

    return (
        <Card sx={{ p: 4, py: 5, maxWidth: "650px", margin: "50px auto", display: "flex", flexDirection: "column", gap: 4, borderRadius: 3 }}>
            <CardContent sx={{ m: 0 }}>
                <Typography gutterBottom variant='h3' component="div" sx={{ m: 0 }}>
                    Share your thoughts, stories, ideas, jokes, etc.!
                </Typography>
            </CardContent>

            <TextField id="outlined-basic" label="Title" variant="outlined" name='title' onChange={handleChange} value={blog.title} />
            <TextField id="outlined-basic" label="imageURL" variant="outlined" name='image' onChange={handleChange} value={blog.image} />
            <TextField id="outlined-basic" label="Content" variant="outlined" name='content' onChange={handleChange} value={blog.content} rows={7} multiline />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                icon={<SpeedDialIcon />}
                onClick={handleSubmit}
            />
        </Card>
    )

}

export default CreatePost;