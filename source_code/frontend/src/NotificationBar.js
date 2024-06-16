import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationBar({user}){
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState(new Set(user.notifications));
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    
    function handleClick(event){
        setAnchorEl(event.currentTarget);
    }

    function handleClose(event, reason){
        setAnchorEl(null);
    }

    function handleClickNotif(notification){
        navigate('categories/'+notification)
    }

    function handleClear(){
        setNotifications(new Set());
        user.notifications = new Array();
        handleClose();
        fetch('http://localhost:8001/users/'+user.id, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({id: user.id, password: user.password, persona: user.persona, enabled: user.enabled, subscriptions: user.subscriptions, notifications: new Array()})
        })
    }

    return(
        <div className='notification-bar'>
            <Button
                onClick={(e) => {
                    if(notifications.size !== 0){
                        console.log(notifications);
                        handleClick(e);
                    }
                }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                  
            >   <NotificationsIcon /> {notifications.size?notifications.size:""}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {[...notifications].map((notification) => 
                    (
                    <MenuItem onClick={() => handleClickNotif(notification)}> New posts on {notification}</MenuItem>
                    )
                )}
                <Button onClick={handleClear}> CLEAR </Button>
            </Menu>
            </div>
    );
}