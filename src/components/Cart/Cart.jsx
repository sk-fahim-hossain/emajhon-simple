import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cart, handleClearCart, children }) => {

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {
        // product.quantity = product.quantity || 1;
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }

    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + tax + totalShipping;

    return (
        <div className='cart'>
            <h3>Order Summery</h3>
            <p>Selected Product:{quantity}</p>
            <p>Total Price:${totalPrice}</p>
            <p>Shipping:{totalShipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h6>Grand Total:$ {grandTotal.toFixed(2)}</h6>
            <button onClick={handleClearCart} className='btn-clear-cart'>
                Clear Cart
                <FontAwesomeIcon className="clear-icon" icon={faTrashCan} />
            </button>
            {
                children
            }
        </div>
    );
};

export default Cart;