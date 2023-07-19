import { Box } from '@mui/material'
import React, {useEffect, useState} from 'react'
import PostCard from '../components/PostCard'

const DisplayPost = () => {

    const [posts, setPosts] = useState([])
    
    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch("http://localhost:8080/backend/Blog/", {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json()
            if(res.ok){
                setPosts(data)
            }else{
                console.log(data);
            }
        }
        fetchData()
    }, [posts])

    return (
        <Box sx={{maxWidth: "550px", display: "flex", flexDirection: "column", margin:"auto", gap:3, py:4 }} >  
            {posts && posts.map(post => 
            (<PostCard post={post}/>
            
            ))}
        </Box>
    )
}
export default DisplayPost
