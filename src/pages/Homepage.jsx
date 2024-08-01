import React, { useState } from 'react';
import List from '../components/List';
import CreateForm from '../components/CreateForm';
import { DndContext } from '@dnd-kit/core';

function Homepage() {
  const [state, setState] = useState({
    "Sss": ["noel"],
    "ssddds": []
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
console.log(active, over);
    if (active && over) {

    let oldList = active.id.split("_")[0];  
    let newList = over.id;
    let cardName = active.id.split("_")[1];  
    console.log(oldList, newList, cardName);

      if (active.id !== over.id) {
        setState((prevState) => {
          const newState = { ...prevState };

          // Remove card from old list
          newState[oldList] = newState[oldList].filter(card => card !== cardName);

          // Add card to new list
          newState[newList] = [...newState[over.id], cardName];

          return newState;
        });
      }
    }
  };

  const addCardToList = (listId, cardName) => {
    setState((prevState) => ({
      ...prevState,
      [listId]: [...prevState[listId], cardName]
    }));
  };

  const addList = (listName) => {
    setState((prevState) => ({
      ...prevState,
      [listName]: []
    }));
  };

  const removeCardFromList = (listId, cardName) => {
    setState((prevState) => ({
      ...prevState,
      [listId]: prevState[listId].filter(card => card !== cardName)
    }));
  };

  const removeList = (listId) => {
    const { [listId]: _, ...rest } = state;
    setState(rest);
  };

  return (
    <div className='dashboard'>
      <DndContext onDragEnd={handleDragEnd}>
        {Object.keys(state).map((listId) => {
          const listName = listId;
          const cards = state[listId];

          return (
            <List
              key={listId}
              listName={listName}
              cards={cards}
              addCard={addCardToList}
              removeCard={removeCardFromList}
              removeList={removeList}
            />
          );
        })}
      </DndContext>
      <CreateForm setState={addList} submitText='Add list' type='list' />
    </div>
  );
}

export default Homepage;
