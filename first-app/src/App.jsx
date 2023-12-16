import { useState } from "react";
import "./App.css";
import shopping_cart_img from "./assets/shopping_cart.svg";
import { render } from "ejs";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);

  //giving inputValue whatever we enter inside input
  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };
  //if we press enter and we wrote anything inside input, meaning it's not empty then add it to array
  //BUT if name is repeating just increase quantity
  const handleAddGroceryItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue && inputValue.length !== 0) {
        const updatedGroceryList = [...groceryItems];

        //findIndex function if doesn't find whatever was asked it returns -1
        const itemIndex = updatedGroceryList.findIndex(
          (item) => item.name === inputValue
        );
        if (itemIndex === -1) {
          updatedGroceryList.push({
            name: inputValue,
            quantity: 1,
            completed: false,
          });
        } else {
          updatedGroceryList[itemIndex].quantity++;
        }
        setGroceryItems(updatedGroceryList);
      }
    }
  };

  const handleDeleteItem = (name) => {
    const updatedGroceryList = [...groceryItems].filter(
      (item) => item.name !== name
    );
    setGroceryItems(updatedGroceryList);
  };

  const renderGroceryList = () => {
    return groceryItems.map((item) => (
      <li key={item.name}>
        <div className="flex-row">
          <span>
            <input type="checkbox" />
            <p>
              {item.name} {item.quantity > 1 ? "x" + item.quantity : null}
            </p>
          </span>
          <button onClick={() => handleDeleteItem(item.name)}>x</button>
        </div>
      </li>
    ));
  };

  return (
    <main className="container">
      <div className="App">
        <h4 className="success">You're done!</h4>
        <h3>Shopping list</h3>
        <img
          src={shopping_cart_img}
          alt="shopping cart image"
          width="200px"
          height="200px"
        />
        <input
          type="text"
          placeholder="add an item"
          onChange={handleChangeInputValue}
          onKeyDown={handleAddGroceryItem}
        />
        <ul>{renderGroceryList()}</ul>
      </div>
    </main>
  );
}

export default App;
