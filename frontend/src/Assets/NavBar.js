import React, { useState } from 'react';
import Axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, InputBase, Modal,
    TextField, Snackbar,
    Grid2,
    Tabs,
    List,
    ListItem,
    ListItemText,
    Divider,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl
} from '@mui/material';
import { blueGrey, deepOrange, deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormHelperText from '@mui/material/FormHelperText';
import store from '../Store';
import DeleteIcon from '@mui/icons-material/Delete';
import '../index.css';
import logo from "./images/logo512.png";
import "./NavBar.css";
import CartModal from './CartModal';


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
    console.log("loading navbar");
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
    const [isUser, setisUser] = React.useState(true);

    const handleOpen = () => { setOpen(true) };
    const handleClose = () => setOpen(false);
    const logout = () => {
        localStorage.setItem("Token", ""); localStorage.setItem("username", ""); setToken(""); setsnackMessage("Log Out Succesfull!");
        localStorage.setItem("userId", "");
        window.location.reload();
        navigate('/');
        setisUser(true);
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
        console.log("localstorage userId is ---",localStorage.getItem("userId"),isUser)
        setToken(localStorage.getItem('Token'));
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
        if (val === "Account")
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
                localStorage.setItem('username', data.username);
                localStorage.setItem('userId', res.data.userId);
                store.getState().userId = data.userId;
                const user = {// Implement a function to generate a unique user ID
                    username: formData.username,
                    email: formData.email,
                    password: formData.password, // Implement a function to hash the password
                    address: {
                        street: formData.street,
                        city: formData.city,
                        state: formData.state,
                        zipcode: formData.zipcode,
                    },
                    phone: formData.phone,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                user.username = data.username;
                setsnackMessage("Log in Succesfull!");
                handleClicksnack();

                window.location.reload();
            }).catch(function (error) {
                console.log(error);
                setsnackMessage("Login Failed! Try Again");
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
        // console.log("Opensnackbar is ", opensnack)
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

    //-------------------------------------showCart----------------------------------
    const [cart, setcart] = React.useState({})
    const [CartProductsList, setCartProductsList] = React.useState([])
    var i = 0;
    React.useEffect(() => {
        console.log("userid here is ", localStorage.getItem("username"), localStorage.getItem("userId"));
        axios.post('http://localhost:4000/get/users', { "username": localStorage.getItem("username") }).then(res => {

            localStorage.setItem("userId", res.data[0].userId);
            // localStorage.setItem("userId",localStorage.getItem("userId"));
            console.log('res.data.userId is -----------',res.data[0].userId);
            setisUser(res.data[0].IsUser);
            Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
                console.log("showcart response is ", res.data);
                if (res.data.length > 0) {
                    setcart(res.data[0]);
                    var products = res.data[0].products;
                    while (CartProductsList.length > 0)
                        CartProductsList.pop();
                    products.forEach(element => {
                        CartProductsList.push(element);
                    });
                    console.log("carts product is == cost is ", res.data[0].products[0].product.price * res.data[0].products[0].quantity, " ", cart,);

                    setCartProductsList(CartProductsList);
                    console.log("cart is ", cart);
                }
            }).catch(function (error) {
                console.log(error);
                while (CartProductsList.length > 0)
                    CartProductsList.pop();
            })
            console.log("userdata ======== ", res.data);
        }).catch(function (error) {
            console.log(error);
        })
    }, []);

    const [value, setValue] = React.useState(0);
    const [isuererror, setIsUserError] = React.useState("");

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        isUser: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value, name)
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        const phonePattern = /^\d{10}$/; // Adjusting regex for phone format
        const zipPattern = /^\d{6}$/;

        if (!formData.username) newErrors.username = "Username is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.password || formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
        if (!formData.street) newErrors.street = "Street is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.state) newErrors.state = "State is required.";
        if (!zipPattern.test(formData.zipcode)) newErrors.zipcode = "Zip Code must be 6 digits.";
        if (!phonePattern.test(formData.phone)) newErrors.phone = "Phone must be in the format +91XXXXXXXXXX.";
        if (!formData.isUser) { setIsUserError("This Field Is Required"); return false; }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const signup = (e) => {
        e.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            setFormData({
                username: '',
                email: '',
                password: '',
                street: '',
                city: '',
                state: '',
                zipcode: '',
                phone: '',
                isUser: '',
            });
            setErrors({});
            const user = {// Implement a function to generate a unique user ID
                username: formData.username,
                email: formData.email,
                password: formData.password, // Implement a function to hash the password
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipcode: formData.zipcode,
                },
                phone: formData.phone,
                createdAt: new Date(),
                updatedAt: new Date(),
                IsUser: formData.isUser == "true" ? true : false,
            };
            console.log('Form data submitted:', user);
            axios.post('http://localhost:4000/signup', user).then(res => {
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
        } else {
            console.log('Validation failed:', errors);
        }
        setIsUserError("");

    };

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <nav className="NavBar">
                        <a href="/home">
                            <img src={logo} alt="Company Logo" className="logo" />
                        </a>
                    </nav>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/home"
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
                    {/* {localStorage.getItem("userId")} */}
                    {((localStorage.getItem("userId") == 'undefined') || isUser) &&
                        <CartModal></CartModal>
                    }
                    {token ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleMenuClick('user')} sx={{ p: 0 }}>
                                    <Avatar sx={{ bgcolor: deepOrange[500] }} alt="User Avatar" src="/static/images/avatar/2.jpg" />
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
                                    <Avatar sx={{ bgcolor: deepOrange[500] }} alt="User Avatar" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                style={{ overflow: 'scroll', height: '700px !important' }}
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
                                                <Button className='button-89' sx={{ margin: 'auto', display: 'block' }} onClick={submitLogin} variant="contained" style={{ backgroundColor: '#616161' }}>
                                                    Log In
                                                </Button>
                                            </form>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={value} index={1}>
                                            <form className='form' onSubmit={signup}>
                                                <Typography variant="h5" gutterBottom>User Information</Typography>

                                                <Grid2 container spacing={2}>
                                                    <Grid2 item xs={6} md={1} mr={2} ml={2}>
                                                        <TextField
                                                            id="username"
                                                            name="username"
                                                            label="Username"
                                                            variant="outlined"
                                                            value={formData.username}
                                                            onChange={handleChange}
                                                            error={!!errors.username}
                                                            helperText={errors.username}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>

                                                    <Grid2 item xs={24} md={8} mr={2} ml={2}>
                                                        <TextField
                                                            id="email"
                                                            name="email"
                                                            label="Email"
                                                            variant="outlined"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            error={!!errors.email}
                                                            helperText={errors.email}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={8} mr={2} ml={2}>
                                                        <TextField
                                                            id="password"
                                                            name="password"
                                                            label="Password"
                                                            variant="outlined"
                                                            type="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            error={!!errors.password}
                                                            helperText={errors.password}
                                                            required
                                                            inputProps={{ minLength: 8 }}
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={8} mr={2} ml={2}>
                                                        <Typography variant="h6" gutterBottom>
                                                            Account Type
                                                        </Typography>

                                                        <RadioGroup
                                                            id="IsUser"
                                                            name="isUser"
                                                            value={formData.isUser} // Ensure this is a string like "true" or "false"
                                                            onChange={handleChange}
                                                            row // Aligns radio buttons horizontally
                                                        >
                                                            <FormControlLabel
                                                                value="true" // Value for User
                                                                control={<Radio />}
                                                                label="User"
                                                            />
                                                            <FormControlLabel
                                                                value="false" // Value for Seller
                                                                control={<Radio />}
                                                                label="Seller"
                                                            />
                                                        </RadioGroup>

                                                        {/* Error Handling */}
                                                        {isuererror && <FormHelperText error>{isuererror}</FormHelperText>}
                                                    </Grid2>
                                                </Grid2>
                                                <Typography variant="h6" gutterBottom>Address</Typography>
                                                <Grid2 container spacing={3}>
                                                    <Grid2 item xs={12} md={6} mr={2} ml={2}>
                                                        <TextField
                                                            id="street"
                                                            name="street"
                                                            label="Street"
                                                            variant="outlined"
                                                            value={formData.street}
                                                            onChange={handleChange}
                                                            error={!!errors.street}
                                                            helperText={errors.street}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6} mr={2} ml={2}>
                                                        <TextField
                                                            id="city"
                                                            name="city"
                                                            label="City"
                                                            variant="outlined"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            error={!!errors.city}
                                                            helperText={errors.city}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6} mr={2} ml={2}>
                                                        <TextField
                                                            id="state"
                                                            name="state"
                                                            label="State"
                                                            variant="outlined"
                                                            value={formData.state}
                                                            onChange={handleChange}
                                                            error={!!errors.state}
                                                            helperText={errors.state}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6} mr={2} ml={2}>
                                                        <TextField
                                                            id="zipcode"
                                                            name="zipcode"
                                                            label="Zip Code"
                                                            variant="outlined"
                                                            value={formData.zipcode}
                                                            onChange={handleChange}
                                                            error={!!errors.zipcode}
                                                            helperText={errors.zipcode}
                                                            inputProps={{ pattern: "\\d{6}" }}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                    <Grid2 item xs={12} md={6} mr={2} ml={2}>
                                                        <TextField
                                                            id="phone"
                                                            name="phone"
                                                            label="Phone"
                                                            variant="outlined"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            error={!!errors.phone}
                                                            helperText={errors.phone}
                                                            required
                                                            fullWidth
                                                            margin="normal"
                                                        />
                                                    </Grid2>
                                                </Grid2>
                                                <Grid2 item xs={12} mr={2} ml={2} mt={4}>
                                                    <Button variant="contained" color="primary" type="submit">
                                                        Submit
                                                    </Button>
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