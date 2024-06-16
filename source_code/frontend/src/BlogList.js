import { Link } from "react-router-dom";
export default function BlogList({blogs, title}){
    // const blogs = props.blogs;

    return (
        <div>
        <h1> {title} </h1>
        {blogs.map((blog) =>
            (
            <div className='blog-preview' key={blog.id}>
            <Link to={`http://localhost:3000/blogs/${blog.id}`}> 
                <h2> {blog.title} </h2>
                <p> {(blog.body.length > 69) && (blog.body).substring(0, 70)+"..."} </p>
                <p> {(blog.body.length <= 69) && blog.body} </p>
                <br/>
                <p> {"Written by "+blog.author} </p>
             </Link>
            </div>   
            )
)}
</div>
);
    
}