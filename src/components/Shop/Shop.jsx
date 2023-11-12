import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currrentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const { totalProducts } = useLoaderData();


    const totalPages = Math.ceil(totalProducts / itemsPerPage)
  
    const pageNumbers = [...Array(totalPages).keys()];


   

    
    useEffect(()=>{
        async function fetchData(){
             fetch(`http://localhost:5000/products?page=${currrentPage}&itemsPerPage=${itemsPerPage}`)
             .then(res => res.json())
             .then(data =>{
                console.log(data)
                setProducts(data)
             } )
            // const data = await response.json();
            // setProducts(data)
        }
        fetchData()
    },[currrentPage,setItemsPerPage])



    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart)

        fetch('http://localhost:5000/productsByIds', {
            method:'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(ids)
        })
        .then(res => res.json())
        .then(cartProducts=> {
            
            const savedCart = [];
            for (const id in storedCart) {
                const addedProduct = cartProducts.find(product => product._id === id)
                if (addedProduct) {
                    const quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct);
                }
            }
            setCart(savedCart)
        })





       
    }, [products])


    const handleAddToCart = (product) => {
        let newCart = [];
        const exists = cart.find(pd => pd._id === product._id)
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            product.quantity = product.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id)
            newCart = [...remaining, exists];
        }



        setCart(newCart);
        addToDb(product._id)
    }


    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart()
    }


    const options = [5, 10, 20]
    const handleSelectChange = (event) => {
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(0)
    }



    return (
        <>
            <div className="shop-container">
                <div className="product-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            handleAddToCart={handleAddToCart}
                            product={product}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link to="/orders" className='proceed-link'>
                            <button className='proceed-btn'>
                                Review Orders
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
            {/* pagination */}
            <div className="pagination">
                <p>Current Page:{currrentPage}and Items per page: {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currrentPage === number ? 'selected': ""}
                        onClick={() => setCurrentPage(number)}
                    >{number}</button>)
                }

                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }

                </select>

            </div>
        </>
    );
};

export default Shop;