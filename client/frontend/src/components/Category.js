import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

function Category()
{
    const location = useLocation();
  const value = location.state;
  console.log(value.name)
    return (
        <>
        <NavBar></NavBar>
        <div>
            <h1>Category Page</h1>
            <h5>{value.name}</h5>
        </div>
        </>
    )
}

export default Category;