import {Link} from 'react-router-dom';
import useFetch from './Fetch';

export default function Categories({loggedIn}){

    return (
        <div className="categories">
            {loggedIn && <div className="links">
                <Link to="categories/football">Football</Link>
                <Link to="categories/basketball">Basketball</Link>
                <Link to="categories/tennis">Tennis</Link>
                <Link to="categories/swimming">Swimming</Link>
                <Link to="categories/cycling">Cycling</Link>
                <Link to="categories/volleyball">Volleyball</Link>
                <Link to="categories/baseball">Baseball</Link>
                <Link to="categories/gymnastics">Gymnastics</Link>
                <Link to="categories/e-sports">E-sports</Link>
                <Link to="categories/soccer">Soccer</Link>
                <Link to="categories/golf">Golf</Link>

            </div>}


        </div>
)
}
