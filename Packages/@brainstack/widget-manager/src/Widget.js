import React from 'react';
import { useMicroStore } from '@brainstack/microstore-react';

const Widget = ({ id, title, ContentComponent, context }) => {
  const { emit } = useMicroStore();

  const onClose = () => {
    emit('widget.close', { widgetId: id });
  };

  return (
    <div className="widget-card">
      <div className="widget-header">
        <h2>{title}</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="widget-content">
        <ContentComponent {...context} />
          </div>
    </div>
  );
};

export default Widget;
