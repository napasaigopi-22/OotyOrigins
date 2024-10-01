import * as React from 'react';
import Axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';

const pages = ['Products', 'Category'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState({ nav: null, user: null, drop: null });
    const openNavMenu = Boolean(anchorEl.nav);
    const openUserMenu = Boolean(anchorEl.user);
    const openDropMenu = Boolean(anchorEl.drop);
    const navigate = useNavigate();

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,

        },
    }));

    const handleMenuClick = (menu) => (event) => {
        setAnchorEl((prev) => ({ ...prev, [menu]: event.currentTarget }));
    };

    const handleCloseMenu = (menu) => () => {
        setAnchorEl((prev) => ({ ...prev, [menu]: null }));
    };

    const redirectWithState = (val) => {
        // event.preventDefault();
        navigate('/category', val);
      };

    const renderMenuItems = (menuItems, handleClose) => (
        menuItems.map((item) => (
            <div onClick={() =>{handleClose(); redirectWithState({state:{name: item.name}})}}>
            <MenuItem key={item.name} >
                <Typography  sx={{ textAlign: 'center' }}>{item.name}</Typography>
            </MenuItem>
            </div>
        ))
    );
    // ----------------------------- categiries ----------------
    const [categories, setcategories] = React.useState([])

    React.useEffect(() => {
        Axios.get('http://localhost:4000/get/categories').then(res => {
            setcategories(res.data);
        })
    }, []);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        OotyOrigins
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            onClick={handleMenuClick('nav')}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl.nav}
                            open={openNavMenu}
                            onClose={handleCloseMenu('nav')}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {renderMenuItems(pages, handleCloseMenu('nav'))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            page !== 'Category' ? (
                                <Button
                                    key={page}
                                    onClick={handleCloseMenu('nav')}
                                    href={'/'+page}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ) : (
                                <React.Fragment key={page}>
                                    <Button
                                        onClick={handleMenuClick('drop')}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                    <Menu
                                        className='navDrop'
                                        anchorEl={anchorEl.drop}
                                        open={openDropMenu}
                                        onClose={handleCloseMenu('drop')}
                                    >
                                        {renderMenuItems(categories, handleCloseMenu('drop'))}
                                    </Menu>
                                </React.Fragment>
                            )
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleMenuClick('user')} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorEl.user}
                            open={openUserMenu}
                            onClose={handleCloseMenu('user')}
                        >
                            {renderMenuItems(settings, handleCloseMenu('user'))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;