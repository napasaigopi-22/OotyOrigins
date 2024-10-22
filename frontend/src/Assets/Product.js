import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import * as React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Typography from '@mui/material/Typography';
import { CardMedia, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';








export default function Product(props) {

    const [prd, setPrd] = React.useState("");
    const [msg,setMsg] = React.useState("Added To Cart Succesfully");
    const [token, setToken] = React.useState("");

    const navigate = useNavigate();

    React.useEffect(() => {
        setPrd(props.prdId);
    }, [prd]);

    React.useEffect(() => {
        setToken(localStorage.getItem('Token'));
    }, [token]);


    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const addToCart = () => {
        console.log("added to cart == ", prd);
        if(token) setMsg("Added To Cart Succesfully");
        else setMsg("Please Login to continue")
        handleClick();
    }

    const handleProdClick = () =>{
        console.log("clicked on ",prd );
        navigate('/ProductDetail',{state:prd});
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Card>
                <React.Fragment>
                    <CardContent >
                        <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h4">{props.name}</Typography>
                        <CardMedia onClick={handleProdClick}
                            component="img"
                            height="194"
                            image={props.img}
                            alt="Product Image"
                        />
                    </CardContent>
                    <CardContent onClick={handleProdClick}>
                        <p style={{ textAlign: 'right' }}><b>Rs: </b>{props.cost}/-</p>
                    </CardContent>
                    <CardActions>
                        <Button onClick={addToCart} startIcon={<AddShoppingCartIcon />} sx={{ width: '45%', margin: 'auto' }} variant="contained" color="success" size="large">Add To Cart</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={action}
            />
        </Box>
    );
}


// function Product(props)
// {
//     return (
//         <>
//             <div>
//                 <p>{props.name}</p>
//             </div>
//         </>
//     )

// }

// export default Product;