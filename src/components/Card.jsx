import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function Card({ cardName, parent}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id:  parent + "_" +cardName,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style} className='card'>
      {cardName}
    </div>
  );
}

export default Card;
