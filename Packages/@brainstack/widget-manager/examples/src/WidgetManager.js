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

const widgetslist = {
  1:{
    id: 1,
    title: "Widget 1",
    component: () => <h1>My Widget</h1>,
    context: { name: "Alice" },
  },
  2:{
    id: 2,
    title: "Widget 2",
    component: () => <h1>My Widget</h1>,
    context: { name: "Bob" },
  },
  3:{
    id: 3,
    title: "Widget 3",
    component: () => <h1>My Widget</h1>,
    context: { name: "Charlie" },
  },
}

const WidgetManagerContainer = ({ children }) => {
  const [widgets, setWidgets] = useState({ list:widgetslist });
  const { useOn } = useMicroContext();

  useOn(/\*.open/, (payload) => {
    const { eventName, widgetMeta } = payload;
    if (eventName && widgetMeta) {
      setWidgets((prev) => ({
        list: { ...prev.list, [eventName]: widgetMeta },
      }));
    }
  });

  useOn("widget.close", (e, payload) => {
    const { widgetId } = payload;
    setWidgets((prev) => {
      const newWidgets = { ...prev.list };
      delete newWidgets[widgetId];
      return { list: newWidgets };
    });
  });

  return (
    <div className="widget-manager">
      {children}
      {Object?.entries?.(widgets.list)?.map(([event, widgetMeta]) => (
        <Widget
          key={widgetMeta?.id ?? 1}
          id={widgetMeta?.id ??1 }
          title={widgetMeta?.title ?? ""}
          ContentComponent={widgetMeta?.component}
          context={widgetMeta?.context ?? ""}
        />
      ))}
    </div>
  );
};
