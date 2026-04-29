import {ReactNode} from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {useWebSocket} from "../hooks/useWebSocket";

const queryClient = new QueryClient();

function WebSocketInit({ children }: { children: ReactNode }) {
    useWebSocket();
    return <>{children}</>;
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <WebSocketInit>{children}</WebSocketInit>
    </QueryClientProvider>
);