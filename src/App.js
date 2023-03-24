import './App.css';
import { useState, useRef } from 'react';

function App() {
  const [groceryList, setGroceryList] = useState([])
  const [currentItem, setCurrentItem] = useState("");

  const inputItem = useRef(null)

  const addItem= () => {
      setGroceryList([...groceryList, { item: currentItem, bought: false }]);
      inputItem.current.value = "";
      setCurrentItem("");
  };

  const deleteItem= (itemToDelete) => {
    setGroceryList(
      groceryList.filter((item) => {
        return item.item !== itemToDelete;
      })
    );
  };

  const boughtItem = (itemToBuy) => {
    setGroceryList(
      groceryList.map((item) => {
        return item.item === itemToBuy
          ? {item: itemToBuy, bought: true}
          : {item: item.item, bought: item.bought ? true : false };
      })
    );
  };

  return (
    <div className='App'>
      <h1> GROCERY LIST </h1>
      <div className='Input'>
          <input
            ref={inputItem}
            type="text"
            placeholder='Need to buy...'
            onKeyDown={(event)=> {
              if (event.keyCode === 13) addItem();
            }}
            onChange={(event)=> {
              setCurrentItem(event.target.value);
            }}
          />
            <button onClick={addItem}> + </button>
      </div>
      <hr/>
      <ul>
        {groceryList.map((val, key) => {
          return (
            <div id="item" >
              <li style={{ backgroundColor: val.bought ? "gray" : {} }} key={key}> {val.item}</li>
              <button className='boughtItem'  onClick={() => boughtItem(val.item)}>OK</button>
              <button className='deleteItem' onClick={() => deleteItem(val.item)}>X</button>
              {/* {val.bought ? (
                <h1>OK</h1>
              ) : (
                <h1>OOO</h1>
              )} */}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;