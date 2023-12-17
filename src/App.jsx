import { useState, useEffect } from "react";
import "./App.css";
import shopping_cart_img from "./assets/shopping_cart.svg";
import { render } from "ejs";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    determineCompletedStatus();
  }, [groceryItems]);

  //giving inputValue whatever we enter inside input
  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const determineCompletedStatus = () => {
    if (!groceryItems.length) {
      return setIsCompleted(false);
    }
    let isAllCompleted = true;

    groceryItems.forEach((item) => {
      if (!item.completed) isAllCompleted = false;
    });

    setIsCompleted(isAllCompleted);
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
        setInputValue("");
        setGroceryItems(updatedGroceryList);
        determineCompletedStatus();
      }
    }
  };

  const handleDeleteItem = (name) => {
    const updatedGroceryList = [...groceryItems].filter(
      (item) => item.name !== name
    );
    setGroceryItems(updatedGroceryList);
    determineCompletedStatus();
  };

  const handleUpdateCompleteStatus = (status, index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
    determineCompletedStatus();
  };

  const renderGroceryList = () => {
    return groceryItems.map((item, index) => (
      <li key={item.name}>
        <div className="flex-row">
          <span>
            <input
              type="checkbox"
              onChange={(e) => {
                handleUpdateCompleteStatus(e.target.checked, index);
              }}
            />
            <p className={item.completed ? "finished" : ""}>
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
        {isCompleted ? <h4 className="done">You're done</h4> : null}
        <h3>Shopping List</h3>
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
