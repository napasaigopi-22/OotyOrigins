import React from "react";
import NavBar from "../Assets/NavBar";

function Userprofile()
{
    const [username,setusername] = React.useState("");
    React.useEffect(()=>{
        setusername(localStorage.getItem("username"));
    },[])

    return (
        <>
        <div>
            <NavBar></NavBar>
            <h1>User Profile Page</h1>
            <h2>Welcome Back {username}</h2>
        </div>
        </>
    )
}

export default Userprofile;