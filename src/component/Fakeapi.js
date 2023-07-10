import React, {useEffect, useState} from 'react'
import axios from 'axios';


const API = 'https://fakestoreapi.com'

const Fakeapi = () => {    
    const [productsList, setProductsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [productsCategories, setProductsCategories] = useState([])
    const [allproducts, setAllproducts] = useState([]);
    const [active, setActive] = useState();

    const [cart, setCart] = useState(0);

    const getApiData = (url) => {
      try {
        axios.get(url)
          .then((response) =>{
            setProductsList(response.data)
            setAllproducts(response.data)
            setIsLoading(false)            
          })                
      } catch (error) {
        console.log(error.message)
      }
    }
    const getProductsCategories = (url) => {
      try {
        axios.get(url)
          .then((response) =>{
            const data = response.data
            const newData = ['All', ...data];
            setProductsCategories(newData)
          })       
      } catch (error) {
        console.log(error.message)
      }
    }

    useEffect(() => {
      getApiData(API+'/products');
      getProductsCategories(API+'/products/categories');
    }, [])

    const filterCategories = (categoriesItem) => {
      setActive(categoriesItem);
      if(categoriesItem == 'All'){
        return setProductsList(allproducts)
      }
      const updatedItem = allproducts.filter( (currentItem) => {
          return currentItem.category == categoriesItem;
      })
      setProductsList(updatedItem)
    }


  return (
    <>

    <div className='products-categories'>
      <ul>
        {productsCategories.map((categories, index) => {
          return (
              <li key={index} className={active === categories ? "active" : "inactive"}  onClick={ ()=> {
                filterCategories(categories)
              }}>{categories}</li>
          )
        })} 
        </ul>
    </div>

    <div className='addedtoCart'>{cart}</div>
      <div className='box-wrapper'>
                {isLoading ? <h3>Loading data...</h3> : productsList.map((products) =>{
            const {id, category, description, image, price, title} = products;
            return (
                <div className='box' key={id}>
                    <h2>{category}</h2>
                    <p className='description'>{description}</p>
                    <div>
                        <img src={image} alt={image} />
                    </div>
                    <p>{price}</p>
                    <p>{title}</p>

                    <button onClick={ ()=> {
                      // addTocart()
                    }}>Add to Cart</button>
                </div>
            )
        })}
        </div>
    </>
  )
}

export default Fakeapi;