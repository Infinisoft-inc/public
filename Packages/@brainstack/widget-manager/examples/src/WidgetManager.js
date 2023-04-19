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
  [1]:{
    id: 1,
    title: "Widget 1",
    component: () => <h1>My Widget</h1>,
    context: { name: "Alice" },
  },
  [2]:{
    id: 2,
    title: "Widget 2",
    component: () => <h1>My Widget</h1>,
    context: { name: "Bob" },
  },
  [3]:{
    id: 3,
    title: "Widget 3",
    component: () => <h1>My Widget</h1>,
    context: { name: "Charlie" },
  },
}

const WidgetManagerContainer = ({ children }) => {
  const [widgets, setWidgets] = useState({ widgetslist });
  const { useOn } = useMicroContext();

  useOn("widget.add", (e, payload) => {
    const { event, widgetMeta } = payload;
    if (event && widgetMeta) {
      setWidgets((prev) => ({
        widgets: { ...(prev?.widgets ?? {}), [event]: widgetMeta },
      }));
    }
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
      {children}
      {Object?.entries?.(widgets)?.map(([event, widgetMeta]) => (
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
