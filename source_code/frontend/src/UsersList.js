import Switch from '@mui/material/Switch';
import { useEffect, useState } from "react";
import useFetch from "./Fetch"

export default function UsersList(){
    let {data: initialUserList, isPending, error} = useFetch('http://localhost:8001/users');
    const [userEnabled, setUserEnabled] = useState(new Map());
    const [usersList, setUsersList] = useState(new Array());

    useEffect(() => {
        if(!isPending){
            let list = new Array();
            for(let user of initialUserList){
                list.push(user);
            }
            setUsersList(list);

            let map = new Map(); 
            for(let user of initialUserList){
                map.set(user.id, user.enabled);
            }
            setUserEnabled(map);

        }
    }, [isPending]);


    function handleChecked(e){
        let selectedUser = usersList.filter((user) => user.id === e.target.value)[0];
        const newMap = new Map(userEnabled);
        newMap.set(selectedUser.id, e.target.checked);
        setUserEnabled(newMap);
        fetch('http://localhost:8001/users/'+selectedUser.id, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({id: selectedUser.id, password: selectedUser.password, persona: selectedUser.persona, enabled: e.target.checked, subscriptions: selectedUser.subscriptions, notifications: selectedUser.notifications, search_keys: selectedUser.search_keys})
        })
    }

    function handleDelete(e){
        let selectedUserId = e.target.value;
        let arr = usersList.filter((user) => user.id !== selectedUserId);
        setUsersList(arr);
        fetch('http://localhost:8001/users/'+selectedUserId, {
            method: 'DELETE'
        });

    }
    


    return (
        <div>
           <h1> Users </h1> 
           {console.log(usersList)}
            {!isPending && userEnabled.size !== 0 && usersList.filter(user => user.persona != 'admin').map((user)=>{
                return (
                    <div className='users-list' key={user.id}>
                        <h2> {user.id} </h2>
                        <h5>- {user.persona} </h5>
                        <Switch
                        checked={userEnabled.get(user.id)}
                        value={user.id}
                        onChange={handleChecked}
                        />
                        <button value={user.id} onClick={handleDelete}> Remove User </button>
                    </div>   
                    )
            })}
        </div>
    );
}