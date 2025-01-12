const api = `${process.env.API_WEBSOCKET_URL}`;

// Events
export const eventsWebSocket: (id: string) => string = (id) => `${api}/environments/${id}`;
