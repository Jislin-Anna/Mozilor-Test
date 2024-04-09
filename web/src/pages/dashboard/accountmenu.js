import { Box, Menu, MenuItem } from '@mui/material';
import { useState } from 'react'
import Avatar from './avatar';

const AccountMenu = (props) => {

    const { profile, onLogout } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box >
            <Box component="a" onClick={handleClick}>
                <Avatar name={profile?.displayName} size={40} fontSize={18} />
            </Box>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '20ch',
                        padding: 0
                    },
                }}
            >
                <MenuItem onClick={onLogout}>
                    Logout
                </MenuItem>

            </Menu>
        </Box>
    )
}

export default AccountMenu