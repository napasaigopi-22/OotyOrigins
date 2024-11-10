import * as React from 'react';
import { Box, Button, Typography, Card, Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, Snackbar, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Axios from 'axios';
import axios from 'axios'
import { blueGrey, deepOrange, deepPurple } from '@mui/material/colors';
import store from '../Store';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { a, addQtyToPrdct } from '../Services/Serve';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CartModal(props) {
  //-----------------------------cart modal-------------------------
  const [opencart, setOpencart] = React.useState(false);
  const [cart, setcart] = React.useState({})
  const [CartProductsList, setCartProductsList] = React.useState([]);
  const [snackMessage, setsnackMessage] = React.useState("");
  const [opensnack, setOpensnack] = React.useState(false);
  const [token, setToken] = React.useState("");
  const navigate = useNavigate();


  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
  }, [token]);

  const handleCartClose = () => setOpencart(false);


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
  const handlecartOpen = () => {
    console.log("localStorage.getItem('userId')  ",localStorage.getItem("userId"))
    if (localStorage.getItem("userId") != "undefined" && localStorage.getItem("userId"))
      Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
        if (res.data.length > 0) {

          console.log("use ris ", store.getState().userId)
          var products = res.data[0].products;
          while (CartProductsList.length > 0)
            CartProductsList.pop();
          products.forEach(element => {
            CartProductsList.push(element);
          });
          setCartProductsList(CartProductsList);
          setcart(res.data[0]);
          console.log("Cart Values ======== ", CartProductsList, " ", CartProductsList.length, "  ", localStorage.getItem("userId"));
          setOpencart(true);
        }
        else {
          console.log("no data");
          setcart([]);
          setCartProductsList([]);
          setOpencart(true);
        }
      }).catch(function (error) {
        console.log(error);
      });
    else {
      setsnackMessage("Log In For Adding To Cart");
      handleClicksnack();
    }

  };
  const handlecartClose = () => setOpencart(false);


  const decreasecountof = (index) => {
    cart.products.filter(e => e.productId == index)[0].quantity++;
    console.log(cart.products.filter(e => e.productId == index)[0].product)
    var prd = cart.products.filter(e => e.productId == index)[0].productId;
    var luserid = localStorage.getItem("userId");
    if (token) {
      var qty;
      qty = cart.products.filter(e => e.productId == index);
      console.log("qty is ", qty[0].productId);
      if (qty.length != 0) {
        axios.post("http://localhost:4000/post/addQuantityToProduct", { productId: index, userId: luserid, additionalQuantity: -1 }).then(res => {
          console.log("add qty to prod is -", res.data);
          Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
            var products = res.data[0].products;
            while (CartProductsList.length > 0)
              CartProductsList.pop();
            products.forEach(element => {
              CartProductsList.push(element);
            });
            setCartProductsList(CartProductsList);
            setcart(res.data[0]);

            console.log("cart is ", cart);
          }).catch(function (error) {
            console.log(error);
            while (CartProductsList.length > 0)
              CartProductsList.pop();
          });
        }).catch(function (error) {
          console.log(error);
        });
      }
      else
        axios.post("http://localhost:4000/post/addToCart", { productId: index, userId: luserid }).then(res => {
          console.log(res.data);
          Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
            var products = res.data[0].products;
            while (CartProductsList.length > 0)
              CartProductsList.pop();
            products.forEach(element => {
              CartProductsList.push(element);
            });
            setCartProductsList(CartProductsList);
            setcart(res.data[0]);
            console.log("cart is ", cart);
          }).catch(function (error) {
            console.log(error);
            while (CartProductsList.length > 0)
              CartProductsList.pop();
          });
        }).catch(function (error) {
          console.log(error);
        });
      console.log("{productId: prd, userId: luserid, additionalQuantity: qty }", { productId: prd, userId: luserid, additionalQuantity: qty })

    }

  }

  const increasecountof = (index) => {
    cart.products.filter(e => e.productId == index)[0].quantity++;
    console.log(cart.products.filter(e => e.productId == index)[0].product)
    var prd = cart.products.filter(e => e.productId == index)[0].productId;
    var luserid = localStorage.getItem("userId");
    if (token) {
      var qty;
      qty = cart.products.filter(e => e.productId == index);
      console.log("qty is ", qty[0].productId);
      if (qty.length != 0)
        axios.post("http://localhost:4000/post/addQuantityToProduct", { productId: index, userId: luserid, additionalQuantity: 1 }).then(res => {
          console.log("add qty to prod is -", res.data);
          Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
            var products = res.data[0].products;
            while (CartProductsList.length > 0)
              CartProductsList.pop();
            products.forEach(element => {
              CartProductsList.push(element);
            });
            setCartProductsList(CartProductsList);
            setcart(res.data[0]);

            console.log("cart is ", cart);
          }).catch(function (error) {
            console.log(error);
            while (CartProductsList.length > 0)
              CartProductsList.pop();
          });
        }).catch(function (error) {
          console.log(error);
        });
      else
        axios.post("http://localhost:4000/post/addToCart", { productId: index, userId: luserid }).then(res => {
          console.log(res.data);
          Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {

            var products = res.data[0].products;
            while (CartProductsList.length > 0)
              CartProductsList.pop();
            products.forEach(element => {
              CartProductsList.push(element);
            });
            setCartProductsList(CartProductsList);
            setcart(res.data[0]);
            console.log("cart is ", cart);
          }).catch(function (error) {
            console.log(error);
            while (CartProductsList.length > 0)
              CartProductsList.pop();
          });
        }).catch(function (error) {
          console.log(error);
        });
      console.log("{productId: prd, userId: luserid, additionalQuantity: qty }", { productId: prd, userId: luserid, additionalQuantity: qty })

    }

  }

  const deleteitem = (prdId) => {
    console.log("deleting item", prdId);
    Axios.delete('http://localhost:4000/post/deleteProductFromCart', { data: { userId: localStorage.getItem("userId"), productId: prdId } }).then(res => {
      console.log(res.data);
      setsnackMessage("Deleted " + res.data.deleted.name + " from cart");
      handleClicksnack();
      Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
        console.log("showcart after deletion is ", res.data)
        if (res.data.length > 0) {
          var products = res.data[0].products;
          while (CartProductsList.length > 0)
            CartProductsList.pop();
          products.forEach(element => {
            CartProductsList.push(element);
          });
          setCartProductsList(CartProductsList);
          setcart(res.data[0]);
          console.log("cart is ", cart);
        }
        else {
          console.log("empty cart");
          setcart([]);
          setCartProductsList([]);
        }
      }).catch(function (error) {
        console.log(error);
        while (CartProductsList.length > 0)
          CartProductsList.pop();
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

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



  const goToCartPage = (userId) => {
    console.log(userId);
    navigate('/Cart')

  }


  return (
    <>
      {<Box sx={{ flexGrow: 0.2 }}>
        <Tooltip title="Show Cart" sx={{ p: 1, m: 1 }} >
          <IconButton onClick={handlecartOpen} sx={{ p: 1, m: 0, bgcolor: deepPurple[300] }}>
            <ShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={opencart}
          onClose={handlecartClose}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          fullWidth
          maxWidth="md" // Adjust the dialog width as needed
        >
          <DialogTitle id="dialog-title">
            My Cart
            <IconButton onClick={handleCartClose} aria-label="close" style={{ position: 'absolute', right: 8, top: 8, color: 'red' }}>
            <CancelRoundedIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent id="dialog-description">

            <List sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
              {CartProductsList.length > 0 && CartProductsList.map((item, index) => (<p>{item.stock}</p>))}
               {CartProductsList.length > 0 && CartProductsList.map((item, index) => (
                <React.Fragment key={index}>
                  <Card variant="outlined" sx={{ p: 2, m: 1, boxShadow: 3 }}>
                    <ListItem sx={{ alignItems: 'center' }}>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              x {cart.products.find(e => e.name === item.name)?.quantity}
                            </Typography>
                            <Typography variant="body1" color="secondary" sx={{ ml: 2 }}>
                              ₹{cart.products[index].quantity * cart.products[index].price}
                            </Typography>
                          </Box>
                        }
                        
                        secondary={
                          <Box display="flex" alignItems="center" mt={1}>
                            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                              ₹ {item.price}
                            </Typography>
                            <Tooltip title="Add Item">
                              <Button
                                className="cartactions"
                                endIcon={<AddIcon />}
                                onClick={() => increasecountof(cart.products.find(e => e.name === item.name)?cart.products.find(e => e.name === item.name).productId:"")}
                                // sx={{ color: 'success.main', ml: 1 }}
                                sx={{
                                  background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
                                  borderRadius: '15px',
                                  color: '#fff',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  padding: '5px 15px',
                                  margin: '0 5px',
                                  minWidth: '40px',
                                  boxShadow: '0 0 3px #00c6ff, 0 0 4px #0072ff, 0 0 6px #0072ff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    boxShadow: '0 0 4px #00c6ff, 0 0 6px #0072ff, 0 0 8px #0072ff',
                                    transform: 'scale(1.1)',
                                  },
                                }}
                              >
                                Add
                              </Button>
                            </Tooltip>
                            <Tooltip title="Remove Item">
                              <Button
                                className="cartactions"
                                endIcon={<RemoveIcon />}
                                onClick={() => decreasecountof(cart.products.find(e => e.name === item.name)?.productId)}
                                // sx={{ color: 'warning.main', ml: 1 }}
                                variant="contained"
                                sx={{
                                  background: 'linear-gradient(45deg, #ff3cac, #784ba0)',
                                  borderRadius: '15px',
                                  color: '#fff',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  padding: '5 15px',
                                  margin: '15px',
                                  minWidth: '40px',
                                  boxShadow: '0 0 3px #ff3cac, 0 0 4px #784ba0, 0 0 6px #784ba0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    boxShadow: '0 0 4px #ff3cac, 0 0 6px #784ba0, 0 0 8px #784ba0',
                                    transform: 'scale(1.1)',
                                  },
                                }}
                              >
                                Remove
                              </Button>
                            </Tooltip>
                            <Tooltip title="Delete Item">
                              <Button
                                className="cartdeleteactions"
                                startIcon={<DeleteIcon />}
                                onClick={() => deleteitem(cart.products.find(e => e.product.name === item.product.name)?.productId)}
                                // sx={{ color: 'error.main', ml: 1 }}
                                sx={{
                                  background: 'linear-gradient(45deg, #ff4e50, #f9d423)',
                                  borderRadius: '15px',
                                  color: '#fff',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  padding: '5px 15px',
                                  margin: '0 5px',
                                  minWidth: '40px',
                                  boxShadow: '0 0 3px #ff416c, 0 0 4px #ff4b2b, 0 0 6px #ff4b2b',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    boxShadow: '0 0 4px #ff416c, 0 0 6px #ff4b2b, 0 0 8px #ff4b2b',
                                    transform: 'scale(1.1)',
                                  },
                                }}
                              >
                                Delete
                              </Button>
                            </Tooltip>
                          </Box>
                        }
                      />
                    </ListItem>
                  </Card>
                  {index < CartProductsList.length - 1 && <Divider />}
                </React.Fragment>
              ))} 
            </List>

            {CartProductsList.length == 0 && "Cart Is Empty"}

            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              {CartProductsList.length != 0 && <Grid item xs={6} md={8}>
                <Typography variant="h6" align="left">
                  <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => { goToCartPage(localStorage.getItem("userId")) }}>Proceed To Buy</Button>
                </Typography>
              </Grid>}
              <Grid item xs={4}>
                <Typography variant="h6" align="right">
                  Total: ₹ {cart && cart.totalAmount} {!cart && "0"}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

      </Box>}
      <Snackbar
        open={opensnack}
        autoHideDuration={6000}
        onClose={handleCloseSnakbar}
        message={snackMessage}
        action={action}
      />
    </>

  );
}