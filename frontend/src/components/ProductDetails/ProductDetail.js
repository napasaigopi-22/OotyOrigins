import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Typography, Rating, Snackbar, IconButton, CardMedia, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, CardHeader } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import NavBar from "../../Assets/NavBar/NavBar";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../ProductDetails/ProductDetail.css';
import EditProductForm from "./ProductEdit";



function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [msg, setMsg] = React.useState("Added To Cart Succesfully");
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // For the review dialog
  const [rating, setRating] = useState(0); // For user rating
  const [comment, setComment] = useState(""); // For user comment
  const [alreadyReviwed, setAlreadyReviwed] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [user, setuser] = useState([]);

  const [users, setusers] = useState([]);

  useEffect(() => {
    console.log("getting username", localStorage.getItem("username"));
    axios.post('http://localhost:4000/get/users', { "username": localStorage.getItem("username") }).
      then(res => {
        setuser(res.data[0]);
        console.log("user ======== ", product);
      }).catch(function (error) {
        console.log(error);
      })

  }, [])




  const location = useLocation();
  var value = location.state;
  console.log("value is ===", value);
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("role");

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  const handleDialogClose = () => setOpenDialog(false);

  const action = (
    <React.Fragment>
      <IconButton aria-label="close" color="inherit" size="small" onClick={handleSnackbarClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );



  useEffect(() => {
    axios.get('http://localhost:4000/get/AllUsers').then(res => setusers(res.data));
    axios.post('http://localhost:4000/get/GetproductById', { "id": value.prdId }).
      then(res => {
        setProduct(res.data[0]);
        getReviews();
      }).catch(function (error) {
        console.log(error);
      })
  }, [value.prdId]);


  const getReviews = () => {
    axios.get('http://localhost:4000/get/reviews')
      .then(res => {
        setReviews(res.data.filter(ele => {
          return ele.productId == value.prdId;
        }));
      }) // Fetch reviews from backend
      .catch(error => console.log(error))
  };


  useEffect(() => {
    // Check if the user has already reviewed this product
    axios.post('http://localhost:4000/get/userReviewForProduct', { productId: value.prdId, userId })
      .then(res => {
        if (res.data.alreadyReviewed) {
          setAlreadyReviwed(true);
          setRating(res.data.review.rating); // Set existing rating and comment if reviewed
          setComment(res.data.review.comment);
        }
      })
      .catch(error => console.log(error));
    getReviews();
  }, [value.prdId, userId]);


  useEffect(() => {
    axios.post('http://localhost:4000/get/productReviews', { productId: value.prdId })
      .then(res => setReviews(res.data.reviews))
      .catch(error => console.log(error));
  }, [value.prdId]);


  const addToCart = () => {
    var luserid = localStorage.getItem("userId");
    var token = localStorage.getItem("Token");
    var prd = value.prdId;
    if (token) {
      var qty;
      axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
        console.log("res.data length = ", res.data.length > 0)
        if (res.data.length > 0) {
          qty = res.data[0].products.filter(ele => ele.productId == prd);
          if (qty.length != 0)
            axios.post("http://localhost:4000/post/addQuantityToProduct", { productId: prd, userId: luserid, additionalQuantity: 1 }).then(res => {
              setMsg("Added To Cart Succesfully");
            }).catch(function (error) {
              console.log(error);
            });
          else
            axios.post("http://localhost:4000/post/addToCart", { productId: prd, userId: luserid }).then(res => {
              setMsg("Added To Cart Succesfully");
            }).catch(function (error) {
              console.log(error);
            });
        }
        else {
          console.log("no data");
          axios.post("http://localhost:4000/post/addToCart", { productId: prd, userId: luserid }).then(res => {
            setMsg("Added To Cart Succesfully");
          }).catch(function (error) {
            console.log(error);
          });
        }
      }).catch(function (error) {
        console.log(error);
      });

    }
    else {
      setMsg("Please Login to continue");
    }
    setOpenSnackbar(true);
  };

  const submitReview = () => {
    axios.post('http://localhost:4000/post/addReview', {
      productId: product.productId,
      userId: localStorage.getItem("userId"),
      rating,
      comment,
    })
      .then(() => {
        setMsg("Your review is valuable to us. Visit Again!");
        setOpenDialog(false);
        setOpenSnackbar(true);
        setAlreadyReviwed(true);
        setReviews();
      })

      .catch(error => {
        console.error("Error submitting review:", error);
        setMsg("Review Already Submitted!!");
        setOpenDialog(false);
        setOpenSnackbar(true);
        setAlreadyReviwed(true);
        setReviews();
      });

  };

  const submitProductEdit = (form) => {
    console.log(form);
    axios.post('http://localhost:4000/post/UpdateProduct', form).then(res => {
      console.log(res);
      window.location.reload();
    })

  };

  // product review retrieving
  // const ReviewRetriew = () => {
  //   axios.post('  http://localhost:4000/get/reviews', {
  // productId: product._id,
  // userId: localStorage.getItem("userId"),
  // rating,
  // comment,
  //   })
  //   .then(() => {
  //     setOpenDialog(false);
  //     setOpenSnackbar(true);
  //     setAlreadyReviwed(true);


  //     axios
  //     .get(`http://localhost:4000/get/reviews?productId=${product._id}`)
  //     .then((response) => {
  //       setReviews(response.data.reviews); // Assuming the API response contains a 'reviews' array
  //     });
  // })
  // .catch((error) => {
  //   console.error("Error submitting review:", error);
  // });

  // };



  if (!product) {
    return <div><h1>Loading....</h1></div>;
  }


    return (
      <>
      <NavBar/>
      {((localStorage.getItem("Token") || user?user.IsUser:true) && 
      <div>
        <Box className= 'box' sx={{ display: 'flex',  background: "#fff !important", justifyContent: 'center', padding: '20px'}}> 
            <Card className="card" sx={{color:'red'}}>
            <div className= 'box'>
            <div className="title-name">
  <h1 style={{ color: "orange" }}>{product.name}</h1>
</div>

            <div className= "left">
            <CardMedia 
              component="img"
              height="500"
              src={`http://localhost:4000/images/${value.imageUrl[0]}`}
              alt={product.name}
              className="product-image"
            />
            </div>
            
            <div className="right">
            <CardContent className="product-info">
              <Typography variant="h4" className="product-name">{product.name}</Typography>
              <Typography variant="body1" className="product-description">{product.description}</Typography>
              <Typography variant="h5"className="product-price" style={{ marginTop: "30px" }}>
                Price: Rs {product.price}/- 
                </Typography>
              <Typography variant="h5" className="product-rating">
                Rating: {product.rating}
              </Typography>
              <Box sx= {{display: 'flex', gap: 2, mt:2, flexDirection: 'column', alignItems: 'center'}}>
              <Button onClick={addToCart} startIcon={<AddShoppingCartIcon />} variant="contained" color="success" size="large">Add To Cart</Button>
              {userRole !== 'admin' && (
              <Button onClick={() => setOpenDialog(true)}  variant="contained" color="success" size="large">Review</Button>
              )}
              </Box>
              </CardContent>
              </div>
              </div>
            </Card>
          </Box>


          <Box sx={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <Typography variant="h5">Customer Reviews</Typography>
            {reviews && reviews.length > 0 ? reviews.map((review, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1">
                    <strong>Reviewer:</strong> {users.find(ele => ele.userId = review.userId).username || "Anonymous"}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Product:</strong> {product.name}
                  </Typography>
                  <Typography variant="subtitle1">Rating: {review.rating} / 5</Typography>
                  <Typography variant="body2">{review.comment}</Typography>
                </CardContent>
              </Card>
            )) : (
              <Typography variant="body2" color="text.secondary">
                No reviews yet. Be the first to review!
              </Typography>
            )}
          </Box>



          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Write a Review for {product.name}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Share your experience with this product by rating it and leaving a comment below.
              </DialogContentText>
              <Rating
                name="product-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                sx={{ my: 2 }}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Comment"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
              <Button onClick={submitReview} color="primary">Submit</Button>
            </DialogActions>
          </Dialog>


          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={msg}
            action={
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </div>
      )}
      {(!(user ? user.IsUser : true) &&

        <EditProductForm product={product} onSubmit={submitProductEdit} />
      )}

    </>
  );
}



export default ProductDetail;



