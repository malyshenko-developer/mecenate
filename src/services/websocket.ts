import { rootStore } from '../stores/rootStore';

const TOKEN = '550e8400-e29b-41d4-a716-446655440000';
const WS_URL = `ws://k8s.mectest.ru/test-app/ws?token=${TOKEN}`;

type MessageHandler = (data: any) => void;

class WebSocketService {
    private ws: WebSocket | null = null;
    private listeners = new Map<string, Set<MessageHandler>>();
    private reconnectTimer: NodeJS.Timeout | null = null;
    private shouldReconnect = true;

    constructor(private url: string) {}

    connect() {
        if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) return;
        console.log(`WS connecting to ${this.url}`);
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('WS connected');
            rootStore.setWebsocketConnected(true);
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.handleMessage(data);
            } catch (e) {
                console.warn('WS parse error', e);
            }
        };

        this.ws.onclose = () => {
            console.log('WS disconnected');
            rootStore.setWebsocketConnected(false);
            this.scheduleReconnect();
        };

        this.ws.onerror = (error) => {
            console.error('WS error', error);
        };
    }

    private handleMessage(data: any) {
        const { type, ...payload } = data;
        if (type === 'ping') return;
        this.emit(type, payload);
    }

    private scheduleReconnect() {
        if (!this.shouldReconnect || this.reconnectTimer) return;
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.connect();
        }, 3000);
    }

    on(event: string, handler: MessageHandler) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(handler);
        return () => {
            this.listeners.get(event)?.delete(handler);
        };
    }

    private emit(event: string, data: any) {
        this.listeners.get(event)?.forEach(handler => handler(data));
    }

    disconnect() {
        this.shouldReconnect = false;
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.ws?.close();
        this.ws = null;
    }
}

export const wsService = new WebSocketService(WS_URL);