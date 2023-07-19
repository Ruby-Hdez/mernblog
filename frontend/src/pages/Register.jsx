import React, { useState } from 'react'
import {Card, CardContent, Typography, TextField, Button} from "@mui/material"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [user, setUser] = useState({name: "", email: "", password: ""})
    const navigator = useNavigate() 

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]: value})
    }

    const handleSubmit = async () => {
        console.log(user);
        const res = await fetch("http://localhost:8080/backend/User/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)

        }) 
        const data = await res.json()
        if (res.ok) {
            navigator("/login")
        } else {
            console.log(data);
        }
    }

    return (
        <Card sx={{mt:5, p:3, maxWidth: "550px", margin: "auto", display: "flex", 
        flexDirection: "column", gap:3}} elevation={10}>
        <CardContent sx={{m:0}}>
            <Typography gutterBottom variant="h4" component="div" sx={{m:0, textAlign: "center"}}>
                Register Here! 
            </Typography>
        </CardContent>
    
        <TextField id="outlined-basic" label="Full Name" variant="outlined" name={"name"} onChange={handleChange} value={user.name}/>
        <TextField id="outlined-basic" label="Email Address" variant="outlined" name={"email"} onChange={handleChange} value={user.email}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" name={"password"} onChange={handleChange} value={user.password}/>
        <Button variant='contained' onClick={handleSubmit}>Register</Button>
        </Card>
    )
}

export default Register