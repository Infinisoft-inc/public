import React from 'react';
import { Rnd } from 'react-rnd';
import ChatWidget from './ChatWidget';
import CornerBorders from './CornerBorders';

const ChatWidgetDragResize = () => {
  return (
    <Rnd
    // style={{ border: '1px solid #ccc' }} // Add a border to make resize handles more visible
    className="rnd-corner-borders" // Apply the custom CSS class
    default={{
      x: 0,
      y: 0,
      width: 400,
      height: 400,
    }}
    minWidth={300}
    minHeight={300}
    // bounds="parent"
    dragHandleClassName="card-header"
    enableResizing={{
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true,
    }}
  >
      <ChatWidget />
      <CornerBorders />
    </Rnd>
  );
};

export default ChatWidgetDragResize;
