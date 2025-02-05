import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    IconButton,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import {
    Dashboard as DashboardIcon,
    TextFields as TextFieldsIcon,
    AccountCircle as AccountCircleIcon,
    AddCircle as AddCircleIcon,
    Menu as MenuIcon,
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width: 600px)'); // Mobile breakpoint
    const [drawerOpen, setDrawerOpen] = useState(false); // Drawer open state

    const sidebarItems = [
        { text: 'Counter', icon: <AddCircleIcon />, path: '/counter' },
        {
            text: 'Rich Text Editor',
            icon: <TextFieldsIcon />,
            path: '/rich-text-editor',
        },
        { text: 'User Form', icon: <AccountCircleIcon />, path: '/user-form' },
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    ];

    // Function to toggle the drawer visibility
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            {/* Mobile Drawer Toggle Button */}
            {isMobile && (
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        zIndex: 1201, // Ensure it is above other components
                    }}
                    color="primary"
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                sx={{
                    width: isMobile ? '100%' : 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMobile ? '100%' : 240,
                        boxSizing: 'border-box',
                        background:
                            'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',
                        color: 'white',
                        paddingTop: 4,
                    },
                }}
                variant={isMobile ? 'temporary' : 'permanent'}
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer} // Close drawer when user clicks outside
            >
                <Box sx={{ padding: '20px', textAlign: 'center' }}>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', color: 'white' }}
                    >
                        React Web Application
                    </Typography>
                </Box>

                <List>
                    {sidebarItems.map((item) => (
                        <ListItem
                            key={item.text}
                            component="a"
                            href={item.path}
                            sx={{
                                backgroundColor:
                                    location.pathname === item.path
                                        ? '#3f5b8b'
                                        : 'transparent',
                                '&:hover': { backgroundColor: '#3f5b8b' },
                                display: 'flex',
                                alignItems: 'center',
                                padding: 1,
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{ color: 'white' }}
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ backgroundColor: 'white', marginTop: 2 }} />
            </Drawer>
        </>
    );
};

export default Sidebar;
