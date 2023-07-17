import React from 'react'
import {Card, CardContent, Typography, TextField, Button} from "@mui/material"

const Register = () => {
    return (
        <Card sx={{mt:5, p:3, maxWidth: "550px", margin: "auto", display: "flex", 
        flexDirection: "column", gap:3}} elevation={10}>
            <CardContent sx={{m:0}}>
            <Typography gutterBottom variant="h4" component="div" sx={{m:0, textAlign: "center"}}>
                Register Here! 
            </Typography>
            </CardContent>
    
            {/* Can change the text field here */}
            <TextField id="outlined-basic" label="Full Name" variant="outlined" type={"text"} />
            <TextField id="outlined-basic" label="Email Address" variant="outlined" type={"email"} />
            <TextField id="outlined-basic" label="Password" variant="outlined" type={"password"} />
            <Button variant='contained'>Register</Button>
    
        </Card>
    )
}

export default Register