import { useParams, useNavigate } from "react-router-dom"
import useFetch from "./Fetch";
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import useFetchAI from "./apis/FetchAI";

export default function BlogPost({user}){
    const id = useParams()['id'];
    const [comment, setComment] = useState();
    const navigate = useNavigate();
    const [comments, setComments] = useState(new Array());
    const [toggleAI, setToggleAI] = useState(false);
    const [prompt, setPrompt] = useState("");
    const {data: blog, isPending, error} = useFetch('http://localhost:8000/blogs/'+id);
    const {dataAI, isPendingAI, errorAI} = useFetchAI(prompt);

    useEffect(() => {
        if(!isPending){
            let list = new Array();
            for(let comment of blog.comments){
                list.push(comment);
            }
            setComments(list);
            setPrompt(`Generate a customized comment for this blog post in less than 30 words: ${blog.title} - ${blog.body}`);
        }
    }, [isPending]);

    function handleAI(e){
        setToggleAI(e.target.checked);
        if(!isPendingAI && e.target.checked){
            setComment(dataAI.choices[0].message.content); //removing the double quotes
        }
        else{
            setComment("");
        }
    }

    function handleDelete(){
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE'
        })
        .then(()=>{
            navigate('/home');
        });
    }


    function handleComment(e){
        e.preventDefault();
        let commentsList = comments.slice();
        commentsList.push({id: blog.comments.length, comment, author: user.id});
        blog.comments = commentsList;
        setComments(blog.comments);
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        })
        .then(() => {
            setComment("");
            setToggleAI(false);
        });

    }

    return(
        <>
        <div className="blog-details">
            {error && <div> Error fetching data </div>}
            {isPending && <div> Loading... </div>}
            {blog && 
            (
                <article>
                    <h2> {blog.title} </h2>
                    <p> Written by: {blog.author}</p>
                    <div> {blog.body} </div>
                </article>

            )
            }
            {(user.persona === 'admin' || user.persona === 'moderator' || (!isPending && user.id === blog.author)) && <button onClick={handleDelete}> Delete Blog</button>}
        </div>

        <div className="comment">
            {error && <div> Error fetching data </div>}
            {isPending && <div> Loading... </div>}
            {blog && comments.map(comment => 
                (<article className="comment" key={comment.id}>
                <h5>{comment.author}</h5>
                <div> {comment.comment} </div>
                </article>)
            )
            }
        </div>

        
        <div>
            <form className="comment-add" onSubmit={handleComment}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                AI
                <Switch
                checked={toggleAI}
                onChange={(e) => handleAI(e)}
                />
                <br/>
                
                 {!isPending && <button> Add Comment </button>}
                 {isPending && <button disabled> Adding... </button>}
            </form>
        </div>
        </>
    )
}