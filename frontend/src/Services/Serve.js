import axios from "axios";

export function addQtyToPrdct(productId, userid, additionalQuantity)
{
console.log("a", productId, userid, additionalQuantity);
axios.post("http://localhost:4000/post/addQuantityToProduct", { productId: productId, userId: userid, additionalQuantity: additionalQuantity }).then(res => {
    console.log("add qty to prod is -", res.data);
    axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
      return res;
    }).catch(function (error) {
      console.log(error);
      return error;
    });
    return res;
  }).catch(function (error) {
    console.log(error);
    return error;
  });
}

export function addToCart(productId,userId )
{
    console.log("b")
}