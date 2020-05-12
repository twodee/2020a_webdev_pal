import React, {useEffect} from 'react';
import './App.css';
import {Memory} from './Memory';
import {useSelector, useDispatch} from 'react-redux';
import {loadDay, startAddingMemory} from './actions';

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

function App() {
  const memories = useSelector(state => state.memories);
  const isWaiting = useSelector(state => state.isWaiting);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDay(month, day));
  }, [dispatch]);

  const onAdd = () => {
    dispatch(startAddingMemory(year, month, day));
  }

  return (
    <div className="memories-root">
      {isWaiting && <div className="spinner" />}
      <button onClick={onAdd}>new memory</button>
      {memories.map(memory => <Memory key={memory.id} memory={memory} />)}
    </div>
  );
}

export default App;
