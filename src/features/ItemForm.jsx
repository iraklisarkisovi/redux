import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './itemsSlice';

const ItemForm = () => {
  const [itemName, setItemName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName) {
      const newItem = { name: itemName }; 
      dispatch(addItem(newItem));  
      setItemName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Add new item"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
