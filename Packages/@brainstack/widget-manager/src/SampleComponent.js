import React from 'react';

const SampleComponent = ({ name, description, context }) => (
  <div>
    <h3>{name}</h3>
    <p>{description}</p>
    <p>File handle: {context.fileHandle}</p>
  </div>
);

export default SampleComponent;
