import React from "react";
import { useMicroContext } from "@brainstack/microstore-react";

const Widget = ({
  id,
  title,
  ContentComponent = () => <h1>Error</h1>,
  context,
}) => {
  const { emit } = useMicroContext();

  const onClose = () => {
    emit("widget.close", { widgetId: id });
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
