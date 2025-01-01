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
import store from '../../Store';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { a, addQtyToPrdct } from '../../Services/Serve';




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
  const [isHovered, setIsHovered] = React.useState(false);
  const navigate = useNavigate();

  const buttonStyle = {
    background: 'linear-gradient(45deg, rgb(0, 0, 0), rgb(85, 85, 85))',
    borderRadius: '15px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '5px 15px',
    margin: '0 5px',
    minWidth: '40px',
    boxShadow: '0 0 3px rgb(48, 34, 38), 0 0 4px #ff4b2b, 0 0 6px #ff4b2b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  };

  const hoverStyle = {
    boxShadow: '0 0 4px rgb(59, 23, 32), 0 0 6px rgb(56, 55, 54), 0 0 8px rgb(61, 35, 30)',
  };

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
  }, [token]);

  const handleCartClose = () => setOpencart(false);


  const handleCloseSnakbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpensnack(false);
  }
  const handleClicksnack = () => {
    setOpensnack(true);
  };
  const handlecartOpen = () => {
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
          handlecartOpen();
        }).catch(function (error) {
          console.log(error);
        });
      }
      else
        axios.post("http://localhost:4000/post/addToCart", { productId: index, userId: luserid }).then(res => {
          console.log(res.data);
          handlecartOpen();
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
          handlecartOpen();
        }).catch(function (error) {
          console.log(error);
        });
      else
        axios.post("http://localhost:4000/post/addToCart", { productId: index, userId: luserid }).then(res => {
          console.log(res.data);
          handlecartOpen();
        }).catch(function (error) {
          console.log(error);
        });
      console.log("{productId: prd, userId: luserid, additionalQuantity: qty }", { productId: prd, userId: luserid, additionalQuantity: qty })
    }
  }

  const deleteitem = (prdId) => {
    console.log("deleting item", prdId);
    Axios.delete('http://localhost:4000/post/deleteProductFromCart', { data: { userId: localStorage.getItem("userId"), productId: prdId } }).then(res => {
      console.log("cart.products.find(e => e.productId === prdId)[0].name  ", cart.products.find(e => e.productId === prdId).name);
      setsnackMessage("Deleted " + cart.products.find(e => e.productId === prdId).name + " from cart");
      handleClicksnack();
      handlecartOpen();
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



  const goToCartPage = (userId) => navigate('/Cart')


  return (
    <>
      {<Box sx={{ flexGrow: 0.2 }} >
        <Tooltip title="Show Cart" sx={{ p: 1, m: 1 }} >
          <IconButton onClick={handlecartOpen} sx={{ p: 1, m: 0, bgcolor: deepPurple[300], ":hover": { bgcolor: deepPurple[500] } }}>
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
          PaperProps={{ sx: { borderRadius: "25px" } }}
        >
          <div className='center' fullWidth>
          <DialogTitle id="dialog-title" sx= {{fontWeight: 'bold', fontSize: '30px'}}>
            My Cart
            <IconButton onClick={handleCartClose} aria-label="close" style={{ position: 'absolute', right: 8, top: 8, color: 'red' }}>
              <CancelRoundedIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent id="dialog-description" >

            <List sx={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
              {CartProductsList.length > 0 && CartProductsList.map((item, index) => (
                <React.Fragment key={index}>
                  <Card variant="outlined" sx={{ p: 2, m: 1, boxShadow: 6 ,borderRadius: "15px"}} className='innercardui'>
                    <ListItem sx={{ alignItems: 'center' }} >
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white',fontSize:'20px' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="red" fontSize='17px' sx={{ ml: 1 }}>
                              x {cart.products.find(e => e.name === item.name)?.quantity}
                            </Typography>
                            <Typography variant="body1" color="red" fontSize='20px' sx={{ ml: 2 }}>
                              ₹{cart.products[index].quantity * cart.products[index].price}
                            </Typography>
                          </Box>
                        }

                        secondary={
                          <Box display="flex" alignItems="center" mt={1} >
                            <Typography variant="body2" color="white" fontSize='20px'sx={{ flexGrow: 1 }}>
                             <span style={{color: 'red'}}>₹ </span> {item.price}
                            </Typography>
                            <Tooltip title="Add Item">
                              <Button sx={{
                                  background: 'linear-gradient(45deg,rgb(0, 255, 98),rgb(152, 255, 57))',
                                  borderRadius: '15px',
                                  color: 'black',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  padding: '5px 15px',
                                  margin: '0 5px',
                                  minWidth: '40px',
                                  boxShadow: '0 0 3px rgb(169, 224, 39), 0 0 4px rgb(127, 201, 31), 0 0 6px rgb(130, 170, 20)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    boxShadow: '0 0 4px rgb(50, 165, 50), 0 0 6px rgb(126, 194, 81), 0 0 8px rgb(97, 138, 22)',
                                    
                                  },
                                }}
                                onClick={() => increasecountof(cart.products.find(e => e.name === item.name) ? cart.products.find(e => e.name === item.name).productId : "")}><AddIcon /></Button>
                              {/* <Button
                                className="cartactions"
                                endIcon={<AddIcon />}
                                onClick={() => increasecountof(cart.products.find(e => e.name === item.name) ? cart.products.find(e => e.name === item.name).productId : "")}
                                // sx={{ color: 'success.main', ml: 1 }}
                                sx={{
                                  background: 'linear-gradient(45deg,rgb(0, 255, 98),rgb(152, 255, 57))',
                                  borderRadius: '15px',
                                  color: 'black',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  padding: '5px 15px',
                                  margin: '0 5px',
                                  minWidth: '40px',
                                  boxShadow: '0 0 3px rgb(169, 224, 39), 0 0 4px rgb(127, 201, 31), 0 0 6px rgb(130, 170, 20)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    boxShadow: '0 0 4px rgb(50, 165, 50), 0 0 6px rgb(126, 194, 81), 0 0 8px rgb(97, 138, 22)',
                                    
                                  },
                                }}
                              >
                              </Button> */}
                            </Tooltip>
                            <Tooltip title="Remove Item">
                              <Button sx={{
                                  background: 'linear-gradient(45deg,rgb(71, 53, 63),rgb(47, 25, 66))',
                                  borderRadius: '15px',
                                  color: '#fff',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  padding: '5 15px',
                                  margin: '15px',
                                  minWidth: '40px',
                                  boxShadow: '0 0 3px rgb(58, 42, 51), 0 0 4px rgb(35, 20, 49), 0 0 6px rgb(46, 39, 53)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    boxShadow: '0 0 4px rgb(58, 36, 48), 0 0 6px rgb(40, 25, 54), 0 0 8px rgb(44, 28, 58)',                                    
                                  },
                                }}                                 onClick={() => decreasecountof(cart.products.find(e => e.name === item.name)?.productId)}> <RemoveIcon /> </Button>
                              {/* <Button 
                                className="cartactions"
                                endIcon={<RemoveIcon />}
                                onClick={() => decreasecountof(cart.products.find(e => e.name === item.name)?.productId)}
                                // sx={{ color: 'warning.main', ml: 1 }}
                                variant="contained"
                                sx={{
                                  background: 'linear-gradient(45deg,rgb(71, 53, 63),rgb(47, 25, 66))',
                                  borderRadius: '15px',
                                  color: '#fff',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  padding: '5 15px',
                                  margin: '15px',
                                  minWidth: '40px',
                                  boxShadow: '0 0 3px rgb(58, 42, 51), 0 0 4px rgb(35, 20, 49), 0 0 6px rgb(46, 39, 53)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    boxShadow: '0 0 4px rgb(58, 36, 48), 0 0 6px rgb(40, 25, 54), 0 0 8px rgb(44, 28, 58)',                                    
                                  },
                                }}
                              >
                              </Button> */}
                            </Tooltip>
                            <Tooltip title="Delete Item">
                              <Button style={{ ...buttonStyle, ...(isHovered ? hoverStyle : {}) }} 
                              onClick={() => {
                                console.log("cart is ", item.name)
                                deleteitem(cart.products.find(e => e.name === item.name)?.productId)
                              }}
                              ><DeleteIcon /></Button>
                              {/* <Button
                                className="cartdeleteactions"
                                startIcon={<DeleteIcon />}
                                onClick={() => {
                                  console.log("cart is ", item.name)
                                  deleteitem(cart.products.find(e => e.name === item.name)?.productId)
                                }}
                                sx={{
                                   margin: '0',
                                  background: 'linear-gradient(45deg,rgb(0, 0, 0),rgb(85, 85, 85))',
                                  borderRadius: '15px',
                                  color: '#fff',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  padding: '5px 15px',
                                  margin: '0 5px',
                                  minWidth: '40px',
                                  boxShadow: '0 0 3px rgb(48, 34, 38), 0 0 4px #ff4b2b, 0 0 6px #ff4b2b',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    boxShadow: '0 0 4px rgb(59, 23, 32), 0 0 6px rgb(56, 55, 54), 0 0 8px rgb(61, 35, 30)',
                                    
                                  },
                                }}
                              >
                              </Button> */}
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
                  <Button variant="contained" style={{ backgroundColor: 'red' }} 
                  onClick={() => { goToCartPage(localStorage.getItem("userId")) }}>Proceed To Buy</Button>
                </Typography>
              </Grid>}
              <Grid item xs={4}>
                <Typography variant="h6" align='right'>
                  Total: ₹ {cart && cart.totalAmount} {!cart && "0"}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          </div>
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