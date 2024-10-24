import { createContext, FC, ReactNode, useCallback, useEffect, useRef } from "react";
import { eventsWebSocket } from "../endpoints/websockets.ts";
import { useEnvironmentContext } from "../hooks/useEnvironmentContext.ts";
import { EEventType, IEvent } from "../interfaces/websockets/IWebSocketEvents.ts";

interface EventWebSocketContextType {
    subscribe: (eventType: EEventType, handler: (event: IEvent) => void) => void;
    unsubscribe: (eventType: EEventType, handler: (event: IEvent) => void) => void;
}

export const EventWebSocketContext = createContext<EventWebSocketContextType | undefined>(undefined);

export const EventProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const eventHandlers = useRef<Map<string, Set<(event: IEvent) => void>>>(new Map());
    const websocketRef = useRef<WebSocket | null>(null);
    const environmentRef = useRef<number | null>(null);
    const isDisconnected = useRef<boolean | null>(true);
    const firstReconnect = useRef<boolean>(true);

    const { environment } = useEnvironmentContext();

    const connectWebSocket = useCallback(() => {
        if (environment?.id && (environment?.id !== environmentRef.current || isDisconnected.current)) {
            if (websocketRef.current) {
                websocketRef.current.close();
            }
            const websocket = new WebSocket(eventsWebSocket(environment.id));
            websocketRef.current = websocket;
            environmentRef.current = environment.id;

            websocket.onopen = () => {
                console.log("Events WebSocket Connected - Environment Id", environment?.id);
                isDisconnected.current = false;
                firstReconnect.current = true;
            };

            websocket.onclose = () => {
                console.info("Events WebSocket Disconnected - Environment Id", environment?.id);
                const reconnectDelay = firstReconnect.current ? 0 : 5000;
                setTimeout(() => {
                    if (environment?.id === environmentRef.current) {
                        console.log("Attempting to reconnect... Environment Id", environment?.id);
                        connectWebSocket();
                    }
                }, reconnectDelay);
                firstReconnect.current = false;
                isDisconnected.current = true;
            };

            websocket.onerror = (error) => {
                console.error("Events WebSocket Error", error);
            };

            websocket.onmessage = async (eventData) => {
                try {
                    const data: IEvent = JSON.parse(eventData.data);
                    const handlers = eventHandlers.current.get(data.eventType) || [];
                    handlers.forEach((handler) => handler(data));
                } catch (error) {
                    console.error("Error parsing JSON from server", error);
                }
            };

            const pingInterval = setInterval(() => {
                if (websocket.readyState === WebSocket.OPEN) {
                    websocket.send("ping");
                }
            }, 30000);

            return () => {
                clearInterval(pingInterval);
                websocket.close();
            };
        }
    }, [environment?.id]);

    useEffect(() => {
        connectWebSocket();
    }, [connectWebSocket]);

    const subscribe = (eventType: string, handler: (event: IEvent) => void) => {
        const handlers = eventHandlers.current.get(eventType) || new Set();
        handlers.add(handler);
        eventHandlers.current.set(eventType, handlers);
    };

    const unsubscribe = (eventType: string, handler: (event: IEvent) => void) => {
        const handlers = eventHandlers.current.get(eventType);
        if (handlers) {
            handlers.delete(handler);
            if (handlers.size === 0) {
                eventHandlers.current.delete(eventType);
            }
        }
    };

    return (
        <EventWebSocketContext.Provider value={{ subscribe, unsubscribe }}>{children}</EventWebSocketContext.Provider>
    );
};
