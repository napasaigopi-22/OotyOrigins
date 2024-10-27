import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, Snackbar, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from 'axios';
import axios from 'axios'
import { blueGrey, deepOrange, deepPurple } from '@mui/material/colors';
import store from '../Store';
import CloseIcon from '@mui/icons-material/Close';




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

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
  }, [token]);

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
      while (CartProductsList.length > 0)
        CartProductsList.pop();
      setOpencart(false);
      setsnackMessage("Log In For Adding To Cart");
      handleClicksnack();
    });
  };
  const handlecartClose = () => setOpencart(false);


  const decreasecountof = (index) => {
    cart.products.filter(e => e.productId == index)[0].quantity++;
    console.log(cart.products.filter(e => e.productId == index)[0].product)
    var prd = cart.products.filter(e => e.productId == index)[0].product.productId;
    var luserid = localStorage.getItem("userId");
    if (token) {
      var qty;
      qty = cart.products.filter(e => e.productId == index);
      console.log("qty is ", qty[0].productId);
      if (qty.length != 0)
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
            console.log("total amount is == ",res.data[0].totalAmount)

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

  const increasecountof = (index) => {
    cart.products.filter(e => e.productId == index)[0].quantity++;
    console.log(cart.products.filter(e => e.productId == index)[0].product)
    var prd = cart.products.filter(e => e.productId == index)[0].product.productId;
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
        if(res.data.length>0){
        var products = res.data[0].products;
        while (CartProductsList.length > 0)
          CartProductsList.pop();
        products.forEach(element => {
          CartProductsList.push(element);
        });
        setCartProductsList(CartProductsList);
        setcart(res.data[0]);
        console.log("cart is ", cart);}
        else{
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


  return (
    <>
      <Box sx={{ flexGrow: 0.2 }}>
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
          maxWidth="sm" // Adjust the dialog width as needed
        >
          <DialogTitle id="dialog-title">
            My Cart
          </DialogTitle>
          <DialogContent id="dialog-description">
            <List>
              {CartProductsList.length > 0 && CartProductsList.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ textAlign: 'left' }}
                        >
                          {item.product.name} x {cart.products.find(e => e.product.name === item.product.name)?.quantity} {"->"} {cart.products[index].quantity * cart.products[index].product.price}
                          <Button className='cartactions' onClick={() => increasecountof(cart.products.find(e => e.product.name === item.product.name)?.productId)}>+</Button>
                          <Button className='cartactions' onClick={() => decreasecountof(cart.products.find(e => e.product.name === item.product.name)?.productId)}>-</Button>
                          <Button className='cartdeleteactions' startIcon={<DeleteIcon />} onClick={() => deleteitem(cart.products.find(e => e.product.name === item.product.name)?.productId)} ></Button>
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{ textAlign: 'left' }}
                        >
                          ₹ {item.product.price}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < CartProductsList.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>

            {CartProductsList.length == 0 && "Cart Is Empty"}

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" align="right">
              Total: ₹ {cart && cart.totalAmount} {!cart && "0"}
            </Typography>
          </DialogContent>
        </Dialog>

      </Box>
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