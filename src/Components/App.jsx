import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/itemsSlice';
import { fetchItems, deleteItem } from './toggle';
import ItemForm from '../features/ItemForm';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const items = useSelector((state) => state.items.items);
  const itemsStatus = useSelector((state) => state.items.status);

  useEffect(() => {
    if (itemsStatus === 'idle') {
      dispatch(fetchItems());
    }
  }, [itemsStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className={theme}>
      <h1>CRUD App</h1>
      <button onClick={() => dispatch(toggleTheme())}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <ItemForm />
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} 
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
