import React, { useState } from 'react';
/**
A container component that allows users to drop custom logic and display it as text.
 */
export function CustomLogicContainer() {
  const [customLogic, setCustomLogic] = useState('');
  /**
Handles the drop event when custom logic is dropped onto the container.
@param {React.DragEvent<HTMLDivElement>} event - The drop event. 
*/
  const handleDrop = (event) => {
    event.preventDefault();
    const customLogicCode = event.dataTransfer.getData('text/plain');
    setCustomLogic(customLogicCode);
  };
  /**
Handles the drag over event to allow dropping custom logic onto the container.
@param {React.DragEvent<HTMLDivElement>} event - The drag over event. 
*/
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ border: '2px dashed gray', padding: '1rem', margin: '1rem' }}
    >
      <h2>Custom Logic Container</h2>
      <p>Drag and drop your custom logic here</p> 
    </div>
  );
};

export default CustomLogicContainer