import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>TOP DISHES NEAR YOU</h2>
      <div className="food-display-list">
        {foodList.map((item, index) => {
          if ((category === "All" || category === item.category)) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              ></FoodItem>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
