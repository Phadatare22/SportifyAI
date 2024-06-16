import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({setLoggedIn, setUser}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function showErrorToast(){
        toast.error("Invalid credentials", {
            position: toast.POSITION_TOP_RIGHT
        });

    }

    function handleLogin(e){
        e.preventDefault();
        fetch('http://localhost:8001/users/'+username)
        .then(res => res.json())
        .then(user => {
            if(user.enabled && password === user.password){
                setLoggedIn(true);
                setUser(user);
                navigate("/home");
            }
            else{
                showErrorToast();
            }
        })
        .catch((err) =>{
            showErrorToast();
        })
        
    }
    return(
        <div>
            <form className="create" onSubmit={handleLogin}>
                <label> Username </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e)=>{
                        setUsername(e.target.value);
                    }}
                    required
                />
                <label> Password </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                 <button> Login </button>
                 <ToastContainer />
            </form>
        </div>
    )
}