import { EEventType, IEvent } from "../interfaces/websockets/IWebSocketEvents.ts";
import { useContext, useEffect } from "react";
import { EventWebSocketContext } from "../providers/EventProvider.tsx";

export const useWebSocketEvent = (eventType: EEventType, handler: (event: IEvent) => void) => {
    const context = useContext(EventWebSocketContext);
    useEffect(() => {
        context?.subscribe(eventType, handler);
        return () => context?.unsubscribe(eventType, handler);
    }, [context, eventType, handler]);
};
