import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    const url = "http://localhost:4000"; // Ensure your backend is running at this address

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className='food-item-img' src={`${url}/images/${image}`} alt={name} />
                {!cartItems?.[id] ? ( // Safe access with optional chaining
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
                    </div>
                )}
            </div>
            <div className='food-item-info'>
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
