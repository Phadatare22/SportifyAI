import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [persona, setPersona] = useState('student');
    const [text, setText] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();

    function routeLogin(){
       navigate('/');
    }

    function handleSignup(e){
        e.preventDefault();
        fetch('http://localhost:8001/users', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({id: username, password, persona, enabled: true, subscriptions: [], notifications: [], search_keys: []})
        })
        .then(
            ()=>navigate('/')
        );
    }

    return(
        <div>
            <form className="create" onSubmit={handleSignup}>
            <label> Name </label>
                <input
                    type="text"
                    value={text}
                    onChange={(e)=>{
                        setText(e.target.value);
                    }}
                    required
                />
                <label> Date of Birth </label>
                <input
                    type="date"
                    value={dob}
                    onChange={(e)=>{
                        setDob(e.target.value);
                    }}
                    required
                />
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

                <label> Persona </label>
                <select value={persona} onChange={(e) => setPersona(e.target.value)}>
                    <option value="student"> Student </option>
                    <option value="faculty"> Faculty </option>
                    <option value="staff"> Staff </option>
                    <option value="moderator"> Moderator </option>
                </select>
            
                <button> Signup </button>
            </form>
            <div className="create-login">
            <label> Already have an account? <t/>
                    <button onClick={() => routeLogin()}> Login </button> 
            </label>
            </div>
        </div>
    )
}