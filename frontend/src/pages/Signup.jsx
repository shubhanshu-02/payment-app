import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { Logo } from "../components/Logo"
import { useState } from "react"
import axios from "axios"

export const Signup = () =>{
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label = {"Sign up"} />
            <SubHeading label = {" Enter your information to create an account"} />
            <InputBox onChange={ e=>{
                setFirstName(e.target.value);
            }} 
            placeholder="Shubhanshu" label = {"First Name"} />
            
            <InputBox onChange={ e=>{
                setLastName(e.target.value);
            }}
            placeholder="Gupta" label = {"Last Name"} />

            <InputBox onChange={ e=>{
                setUserName(e.target.value);
            }}
            placeholder="shubhanshu@gmail.com" label = {"Email"} />
            
            <InputBox onChange={ e=>{
                setPassword(e.target.value);
            }}
            placeholder="asdf" label = {"Password"} />
            <div className="pt-4">
                
            <Button onClick={() =>{
                axios.post("http://localhost:3000/api/v1/user/signup"),{
                    username,
                    firstname,
                    lastname,
                    password
                }
            }} 
            label = {"Sign up"}/>
            
        </div>
            <BottomWarning label = {"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

            </div>  
        </div>

    </div>
}