import {useState} from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./Fetch";

export default function CreateBlog({user}){

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("football");
    const[isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const {data: users, isPending: isPendingUsers, error: errorUsers} = useFetch('http://localhost:8001/users');

    function handleSubmit(e){
        e.preventDefault();
        setIsPending(true);

        for(let i = 0; i < users.length; i++){
            if(users[i].subscriptions.includes(category) && users[i].id !== user.id){
                users[i].notifications.push(category);
                fetch('http://localhost:8001/users/'+users[i].id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(users[i])
             });
            }
        }

        const blog = {title, body, author: user.id, category: category, comments: new Array()};
        fetch('http://localhost:8000/blogs', {
            method :'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(blog)
        })
        .then(()=>{
            setIsPending(false);
            navigate("/home");
        })
    

    }

    return(
        <div>
            <form className="create" onSubmit = {handleSubmit}>
                <label> Blog title: </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e)=>{
                        setTitle(e.target.value);
                    }}
                    required
                />
                <label> Blog body: </label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
               <label> Category </label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="football">Football</option>
                        <option value="basketball">Basketball</option>
                        <option value="tennis">Tennis</option>
                        <option value="swimming">Swimming</option>
                        <option value="cycling">Cycling</option>
                        <option value="volleyball">Volleyball</option>
                        <option value="baseball">Baseball</option>
                        <option value="gymnastics">Gymnastics</option>
                        <option value="e-sports">E-sports</option>
                        <option value="soccer">Soccer</option>
                        <option value="golf">Golf</option>
                    </select>

                
                 {!isPending && <button> Add blog </button>}
                 {isPending && <button disabled> Adding... </button>}
            </form>
        </div>
    );
}