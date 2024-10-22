import React from 'react'
import './ExploreProduct.css'
import {jewellery} from '../../Assets/jewellery.png'
import Product from '../../Assets/Product'

const ExploreProducts = (categories,setcategories) => {
    return (
        <div className='explore-products' id='explore-products'>
            <h1>Explore Our Products</h1>
            <p className='explore-products-text'>Choose from our diverse products feauturing array of Ooty Products.</p>
            <div className='explore-products-list'>
                {Product.map((item,index)=>{
                    return (
                        <div onClick={()=>setcategories(prev=>prev===item.product.name?"ALL":item.Product_name)} key={index} className='explore-products-list-item'>

                            <img className={categories===item.Product_name?"active":" "} src={item.Product_image} alt=""/>
                            <p>{item.Product_name}</p>

                        </div>
                    )
                }
            )}
            </div>
            <hr/>
        </div>
    )
}

export default ExploreProducts