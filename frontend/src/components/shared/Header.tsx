import React from 'react';
import { 
    Link, 
    useLocation, 
    useNavigate 
} from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Box,
    Button
} from '@mui/material';

import { useAuthContext } from '../../context/auth.context';

// Header Tab lists
const tabItems = [
    { label: 'Tab1', path: '/route1' },
    { label: 'Tab2', path: '/route' },
    { label: 'Tab3', path: '/route3' }
];

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuthContext();

    const currentTab = tabItems.findIndex((t) =>
        location.pathname.startsWith(t.path));

    const handleChange = (
        _event: React.SyntheticEvent,
        newValue: number
    ) => {
        navigate(tabItems[newValue].path);
    };

    return (
        <>
            <AppBar position='static' color='primary'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                            <Pets style={{ marginRight: 8 }} />
                            <div className="site-name">App Title</div>
                        </Link>
                        <div className="greeting">
                            {user ? `Hello, ${user.firstName}` : 'Hello, Guest!'}
                        </div>
                    </Box>

                    <Tabs
                        value={currentTab === -1 ? false : currentTab}
                        onChange={handleChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                        sx={{ minHeight: 64 }}
                    >
                        {tabItems.map((item) => (
                            <Tab
                                key={item.path}
                                label={item.label}
                                sx={{ height: 64 }}
                            />
                        ))}
                    </Tabs>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {!user ? (
                            <>
                                <Button color="inherit" component={Link} to="/auth/register">
                                    Register
                                </Button>
                                <Button color="inherit" component={Link} to="/auth/login">
                                    Login
                                </Button>
                            </>
                        ) : (
                            <Button color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}