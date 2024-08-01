import React from 'react';
import Card from './Card';
import CreateForm from './CreateForm';
import { useDroppable } from '@dnd-kit/core';

function List({ listName, cards, addCard, removeCard, removeList }) {
  const { setNodeRef } = useDroppable({
    id: listName,
  });

  const handleDrop = (event) => {
    const cardName = event.dataTransfer.getData('text/plain');
    addCard(listName, cardName);
  };

  return (
    <div ref={setNodeRef} className='list' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <h3 className='title'>{listName}</h3>
      <span className='close-list' onClick={() => removeList(listName)}>X</span>
      {cards.map((card, i) => (
        <Card key={i} cardName={card} parent={listName} />
      ))}
      <CreateForm setState={(cardName) => addCard(listName, cardName)} submitText='Add card' type='card' />
    </div>
  );
}

export default List;
