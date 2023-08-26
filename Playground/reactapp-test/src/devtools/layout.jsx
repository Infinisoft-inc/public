import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import { currentState, mockMutations } from "./mock";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";

const StateGraph = ({ currentState }) => {
  const nodes = [];
  const links = [];

  // Create nodes and links based on the currentState object
  for (const key in currentState) {
    nodes.push({ id: key, name: `${key}: ${currentState[key]}` });
    if (currentState[key] !== null && typeof currentState[key] === "object") {
      for (const subKey in currentState[key]) {
        nodes.push({
          id: `${key}.${subKey}`,
          name: `${key}.${subKey}: ${currentState[key][subKey]}`,
        });
        links.push({ source: key, target: `${key}.${subKey}` });
      }
    }
  }

  return (
    <ForceGraph2D
      graphData={{
        nodes,
        links,
      }}
    />
  );
};

const FocusGraph = ({ currentState }) => {
  const nodes = [];
  const links = [];

  // Create nodes and links based on the currentState object
  for (const key in currentState) {
    nodes.push({ id: key, name: `${key}: ${currentState[key]}` });
    if (currentState[key] !== null && typeof currentState[key] === "object") {
      for (const subKey in currentState[key]) {
        nodes.push({
          id: `${key}.${subKey}`,
          name: `${key}.${subKey}: ${currentState[key][subKey]}`,
        });
        links.push({ source: key, target: `${key}.${subKey}` });
      }
    }
  }

  const fgRef = useRef();

  const handleClick = useCallback(
    (node) => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
    },
    [fgRef]
  );

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={{
        nodes,
        links,
      }}
      nodeLabel="id"
      nodeAutoColorBy="group"
      onNodeClick={handleClick}
    />
  );
};

const EventPanel = ({ events, setSelectedEvent }) => {
  return (
    <Col md={6}>
      <h2>Events Panel</h2>
      <ListGroup>
        {events.map((event, index) => (
          <ListGroup.Item key={index}>
            <strong>{event.name}</strong>
            <div>
              <strong>Subscribers:</strong> {event.subscribers.join(", ")}
            </div>
            <div>{event.info}</div>
            <Button
              variant="info"
              size="sm"
              onClick={() => setSelectedEvent(event)}
            >
              View Details
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
};

const PayloadViewer = ({ selectedEvent }) => {
  return (
    <Col md={6}>
      <h2>Payload Viewer</h2>
      <Card>
        <Card.Body>
          <Card.Title>{selectedEvent.name}</Card.Title>
          <Card.Text>{selectedEvent.info}</Card.Text>
          <pre>{JSON.stringify(selectedEvent.payload, null, 2)}</pre>
        </Card.Body>
      </Card>
    </Col>
  );
};

const StatusPanel = ({ status }) => {
  return (
    <Col md={12}>
      <h2>Status Panel</h2>
      <Card>
        <Card.Body>
          <Card.Title>Application Status</Card.Title>
          <Card.Text>{status}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const StatePanel = ({ stateData, mutations }) => {
  const [selectedMutation, setSelectedMutation] = useState(null);

  return (
    <Col md={12}>
      <h2>State Panel</h2>
      <Card>
        <Card.Body>
          <Card.Title>Application State</Card.Title>
          <ListGroup>
            {mutations.map((mutation, index) => (
              <ListGroup.Item key={index}>
                <div>
                  <strong>Timestamp:</strong> {mutation.timestamp}
                </div>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => setSelectedMutation(mutation)}
                >
                  View Details
                </Button>
                {selectedMutation === mutation && (
                  <div>
                    <h4>Mutation Details</h4>
                    <pre>{JSON.stringify(mutation, null, 2)}</pre>
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Layout = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [appStatus, setAppStatus] = useState("Running");

  useEffect(() => {
    const simulatedEvents = [
      {
        name: "Event 1",
        subscribers: ["Component A", "Component B"],
        info: "Event details...",
        payload: { example: "payload data" },
        codeLocation: "src/components/ComponentA.js",
      },
      {
        name: "Event 2",
        subscribers: ["Component C"],
        info: "Event details...",
        payload: { example: "payload data" },
        codeLocation: "src/components/ComponentC.js",
      },
      // ... more events
    ];

    setEvents(simulatedEvents);
  }, []);

  return (
    // <Container>
    //   <Row>
    //     <EventPanel events={events} setSelectedEvent={setSelectedEvent} />
    //     {selectedEvent && <PayloadViewer selectedEvent={selectedEvent} />}
    //     <StatusPanel status={appStatus} />
    //     <StatePanel stateData={currentState} mutations={mockMutations} />
    //   </Row>
    // </Container>

    <Container>
      <Row>
        <Col md={4}>
          <EventPanel events={events} setSelectedEvent={setSelectedEvent} />
          {selectedEvent && <PayloadViewer selectedEvent={selectedEvent} />}
        </Col>
        <Col md={4}>
          <StatusPanel status={appStatus} />
          <StatePanel stateData={currentState} mutations={mockMutations} />
        </Col>
        <Col md={4}>
          {/* <StateGraph currentState={currentState} />  */}
          
          <FocusGraph currentState={currentState} />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
