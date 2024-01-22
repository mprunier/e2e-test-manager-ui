const api = `${process.env.API_WEBSOCKET_URL}`;

// Events
export const eventsWebSocket: (id: number) => string = (id) => `${api}/events/environments/${id}`;
