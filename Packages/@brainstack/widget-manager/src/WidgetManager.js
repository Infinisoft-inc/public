import React, { useState } from "react";
import {
  MicroStoreProvider,
  useMicroContext,
} from "@brainstack/microstore-react";
import Widget from "./Widget";

export const WidgetManager = (props) => (
  <MicroStoreProvider>
    <WidgetManagerContainer {...props}></WidgetManagerContainer>
  </MicroStoreProvider>
);

const WidgetManagerContainer = () => {
  const [widgets, setWidgets] = useState()
  const { useOn } = useMicroContext();

  useOn("widget.add", (e, payload) => {
    const { event, widgetMeta } = payload;
    setWidgets((prev) => ({
      widgets: { ...prev.widgets, [event]: widgetMeta },
    }));
  });

  useOn("widget.close", (e, payload) => {
    const { widgetId } = payload;
    setWidgets((prev) => {
      const newWidgets = { ...prev.widgets };
      delete newWidgets[widgetId];
      return { widgets: newWidgets };
    });
  });

  return (
    <div className="widget-manager">
      {Object.entries(widgets).map(([event, widgetMeta]) => (
        <Widget
          key={widgetMeta.id}
          id={widgetMeta.id}
          title={widgetMeta.title}
          ContentComponent={widgetMeta.component}
          context={widgetMeta.context}
        />
      ))}
    </div>
  );
};
