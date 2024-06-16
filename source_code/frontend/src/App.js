import Navbar from './Navbar';
import Home from './Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Create from './CreateBlog';
import BlogPost from './Blog';
import NotFound from './NotFound';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import UsersList from './UsersList';
import Categories from './Categories';
import Category from './Category';
import SearchResults from './SearchResults';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  return (
    <Router>
        <div className="App">
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} user = {user}/>
          <Categories loggedIn = {loggedIn}/>
          <div className='content'>
          <Routes>
            <Route path="/" element = {<Login setLoggedIn = {setLoggedIn} setUser = {setUser}/>}/>
            {loggedIn && <Route path="/home" element = {<Home user= {user}/>}/>}
            {loggedIn && <Route path="/create" element = {<Create user = {user}/>}/>}
            {loggedIn && <Route path="/blogs/:id" element = {<BlogPost user = {user}/>}/>}
            {loggedIn && <Route path="/categories/:category" element = {<Category user = {user}/>}/>}
            {loggedIn && <Route path="/search/:input" element = {<SearchResults/>}/>}
            {loggedIn && <Route path="/search" element = {<SearchResults/>}/>}
            {!loggedIn && <Route path="/signup" element = {<Signup/>}/>}
            {loggedIn && user.id === 'admin' && <Route path="/users" element = {<UsersList/>}/>}
            <Route path="*" element = {<NotFound/>}/>
          </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
