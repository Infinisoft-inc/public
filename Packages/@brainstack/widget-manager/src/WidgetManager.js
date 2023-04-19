import React from 'react';
import { useMicroStore, useOn } from '@brainstack/microstore-react';
import Widget from './Widget';

export const WidgetContext = createMicrostore({
  widgets: {},
});

export const WidgetManager = ({ initialWidgets }) => {
  const { state, mutate } = useMicrostore({ widgets: initialWidgets });

  useOn('widget.add', (e, payload) => {
    const { event, widgetMeta } = payload;
    mutate((prev) => ({
      widgets: { ...prev.widgets, [event]: widgetMeta },
    }));
  });

  useOn('widget.close', (e, payload) => {
    const { widgetId } = payload;
    mutate((prev) => {
      const newWidgets = { ...prev.widgets };
      delete newWidgets[widgetId];
      return { widgets: newWidgets };
    });
  });

  return (
    <div className="widget-manager">
      {Object.entries(state.widgets).map(([event, widgetMeta]) => (
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
