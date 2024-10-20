import React, { useState, useEffect, useMemo } from 'react';
import Axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, InputBase, Modal,
    TextField, Snackbar,
    Grid2,
    Tabs
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1100,
    hieght: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const pages = ['Products', 'Category'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState({ nav: null, user: null, drop: null });
    const openNavMenu = Boolean(anchorEl.nav);
    const openUserMenu = Boolean(anchorEl.user);
    const openDropMenu = Boolean(anchorEl.drop);
    const navigate = useNavigate();
    const [token, setToken] = React.useState("");
    const [Username, setUsername] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [snackMessage, setsnackMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [opensnack, setOpensnack] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const logout = () => {
        localStorage.setItem("Token", ""); localStorage.setItem("username", ""); setToken(""); setsnackMessage("Log Out Succesfull!");
        handleClicksnack();
    };
    const navAcc = () => { navigate('/accounts') }
    const navProf = () => { navigate('/UserProfile') }

    const clickedvals = {
        "Account": navAcc,
        "Profile": navProf,
        "Logout": logout
    }

    React.useEffect(() => {
        setToken(localStorage.getItem('Token'));
        console.log("token is ", token ? "somevalexists" : "null");
        return () => {
            handleClose();
        }
    }, [token]);

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

    const handleSettingClick = (val) => {
        // event.preventDefault();
        console.log(clickedvals[val]);
        clickedvals[val]();
        if (val == "Account")
            console.log("clicked -", val);
        // navigate('/category', val);
    };

    const renderMenuItems = (menuItems, handleClose) => (
        menuItems.map((item) => (
            <div onClick={() => { handleClose(); handleSettingClick(item) }}>
                <MenuItem key={item} >
                    <Typography sx={{ textAlign: 'center' }}>{item}</Typography>
                </MenuItem>
            </div>
        ))
    );

    const submitLogin = () => {
        if (Username && Password) {
            console.log("vls are not empty");
            Axios.post('http://localhost:4000/login', { username: Username, password: Password }).then(res => {
                console.log(res.data);
                const data = res.data;
                localStorage.setItem('Token', data.jwtToken);
                setToken(data.jwtToken);
                localStorage.setItem('username', data.username)
                console.log(data.jwtToken);
                setsnackMessage("Log in Succesfull!");
                handleClicksnack();
            }).catch(function (error) {
                console.log(error);
                setsnackMessage("Login Failed Succesfully!");
                handleClicksnack();
            })
        }
        else {
            console.log("vals are empty");
            setsnackMessage("Please Enter All The Details !");
            handleClicksnack();
        }
    };

    const handleCloseSnakbar = (event, reason) => {
        console.log("handling snackbar clicks");
        // const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpensnack(false);
        // };
        console.log("Opensnackbar is ", opensnack)
    }
    const handleClicksnack = () => {
        setOpensnack(true);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSnakbar}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnakbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // ----------------------------- categories ----------------
    const [categories, setcategories] = React.useState([])

    React.useEffect(() => {
        Axios.get('http://localhost:4000/get/categories').then(res => {
            setcategories(res.data);
            console.log("categories ======== ", res.data)
        }).catch(function (error) {
            console.log(error);
        })
    }, []);

    const renderMenuItemsCategories = (menuItems, handleClose) => (
        menuItems.map((item) => (
            <div onClick={() => { handleClose(); handleCategoryClick({ state: { name: item.name } }) }}>
                <MenuItem key={item.name} >
                    <Typography sx={{ textAlign: 'center' }}>{item.name}</Typography>
                </MenuItem>
            </div>
        ))
    );

    const handleCategoryClick = (val) => {
        // event.preventDefault();
        navigate('/category', val);
        console.log("navigating to category ", val)
    };

    const [value, setValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const signup = () =>{  
        console.log("signup clicked");
    }

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
                    <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            page !== 'Category' ? (
                                <Button
                                    key={page}
                                    onClick={handleCloseMenu('nav')}
                                    href={'/' + page}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ) : (
                                <React.Fragment key={page}>

                                    <Button
                                        // endIcon={<CategoryIcon />}
                                        onClick={handleMenuClick('drop')}
                                        sx={{ my: 0, color: 'white', display: 'block' }}
                                    >
                                        <p style={{ display: 'inline-block' }} >{page}</p>
                                    </Button>
                                    <Menu
                                        className='navDrop'
                                        anchorEl={anchorEl.drop}
                                        open={openDropMenu}
                                        onClose={handleCloseMenu('drop')}
                                    >
                                        {renderMenuItemsCategories(categories, handleCloseMenu('drop'))}
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
                    {token ?
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
                        </Box> :
                        <Box>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                style={{ overflow: 'scroll', top: '10px' }}
                            >
                                <Box sx={style} >
                                    <Box sx={{ width: '100%', height: "100%" }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                                                <Tab label="Login" {...a11yProps(0)} />
                                                <Tab label="Sign Up" {...a11yProps(1)} />
                                            </Tabs>
                                        </Box>
                                        <CustomTabPanel value={value} index={0}>
                                            <form className="form">
                                                <Grid2 container sx={{ width: '100%' }} justifyContent="center">
                                                    <Grid2 item >
                                                        <TextField required sx={{ margin: 'auto', display: 'block', width: '100%', padding: '5px' }} onChange={(event) => { setUsername(event.target.value) }} label="Username" variant="outlined" />
                                                        <TextField type='password' required sx={{ margin: 'auto', display: 'block', width: '100%', padding: '5px' }} onChange={(event) => { setPassword(event.target.value) }} label="Password" variant="outlined" />
                                                    </Grid2>
                                                </Grid2>
                                                <Button sx={{ margin: 'auto', display: 'block' }} onClick={submitLogin} variant="contained" style={{ backgroundColor: '#616161' }}>
                                                    Log In
                                                </Button>
                                            </form>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={1}>
                                            <form className='form'>
                                                <Typography variant="h5" gutterBottom>User Information</Typography>

                                                <Grid2 container spacing={2}>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="username"
                                                            label="Username"
                                                            variant="outlined"
                                                            //defaultValue="lvgum king"
                                                            inputProps={{ pattern: "[a-zA-Z0-9\\s]+" }}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>

                                                    {/* Email and Password side by side */}
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="email"
                                                            label="Email"
                                                            variant="outlined"
                                                            type="email"
                                                            //defaultValue="lvgum.king@example.com"
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="password"
                                                            label="Password"
                                                            variant="outlined"
                                                            type="password"
                                                            required
                                                            inputProps={{ minLength: 8 }}
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>

                                                    <Typography variant="h6" gutterBottom>Address</Typography>

                                                    {/* Street and City side by side */}
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="street"
                                                            label="Street"
                                                            variant="outlined"
                                                            //defaultValue="31 Herbal Garden"
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="city"
                                                            label="City"
                                                            variant="outlined"
                                                            //defaultValue="Ooty"
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>

                                                    {/* State and Zip Code side by side */}
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="state"
                                                            label="State"
                                                            variant="outlined"
                                                            //defaultValue="Tamil Nadu"
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="zipcode"
                                                            label="Zip Code"
                                                            variant="outlined"
                                                            //defaultValue="643010"
                                                            inputProps={{ pattern: "\\d{6}" }}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>

                                                    {/* Phone, Created At, Updated At */}
                                                    <Grid2 item xs={12} md={6}>
                                                        <TextField
                                                            id="phone"
                                                            label="Phone"
                                                            variant="outlined"
                                                            //defaultValue="+91-7006543210"
                                                            inputProps={{ pattern: "^\\91\\d{10}$" }}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>

                                                    <Grid2 item xs={12}>
                                                        <Button variant="contained" color="primary" type="submit" onClick={signup}>
                                                            Submit
                                                        </Button>
                                                    </Grid2>
                                                </Grid2>
                                            </form>
                                        </CustomTabPanel>
                                    </Box>
                                </Box>

                            </Modal>
                        </Box>
                    }
                </Toolbar>
            </Container>
            <Snackbar
                open={opensnack}
                autoHideDuration={6000}
                onClose={handleCloseSnakbar}
                message={snackMessage}
                action={action}
            />
        </AppBar>
    );
}

export default NavBar;