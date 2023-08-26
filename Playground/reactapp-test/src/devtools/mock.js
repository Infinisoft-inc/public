export const mockMutations = [
  {
    timestamp: "2023-08-26 10:30:00",
    before: { count: 5 },
    after: { count: 6 },
    details: "Incremented count by 1",
  },
  {
    timestamp: "2023-08-26 11:45:00",
    before: { count: 6 },
    after: { count: 4 },
    details: "Decreased count by 2",
  },
  {
    timestamp: "2023-08-26 14:20:00",
    before: { count: 4 },
    after: { count: 10 },
    details: "Increased count by 6",
  },
];

export const currentState = {
  count: 10,
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  },
  settings: {
    theme: "dark",
    notifications: true,
  },
};
