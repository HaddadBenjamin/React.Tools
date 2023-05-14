/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

interface IUseWebSocket<TMessage>
{
  url : string,
  connectOnMount?: boolean,

  onWebSocketConnexionOpen?: (event: Event) => any;
  onReceiveWebSocketMessage?: (event : MessageEvent, message : IWebSocketMessage<TMessage>) => void;
  onWebSocketConnexionClose?: (event: CloseEvent) => any;
  onWebSocketError?: (event: Event) => any;
}

interface IWebSocketMessage<TMessage> {
  data : TMessage
}

interface IUseWebSocketResponse<TMessage> {
  messages : TMessage[];
  isConnected : boolean;
  websocket? : WebSocket;

  connect: () => void;
  sendMessage: (message : string | ArrayBufferLike | Blob | ArrayBufferView) => void;
  disconnect: (code?: number, reason?: string) => void;
}

const useWebSocket = <TMessage, >({
  url,
  connectOnMount = true,

  onWebSocketConnexionOpen,
  onReceiveWebSocketMessage,
  onWebSocketConnexionClose,
  onWebSocketError,
} : IUseWebSocket<TMessage>) : IUseWebSocketResponse<TMessage> => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket | undefined>();

  useEffect(() => {
    if (connectOnMount) connect();
  }, [connectOnMount]);

  const connect = () => {
    const ws = new WebSocket(url);

    ws.onopen = (event) => { setIsConnected(true); onWebSocketConnexionOpen?.(event); };
    ws.onmessage = (event) => { setMessages((previousMessages) => [...previousMessages, event.data]); onReceiveWebSocketMessage?.(event, event.data); };
    ws.onclose = (event) => { setIsConnected(false); onWebSocketConnexionClose?.(event); };
    ws.onerror = (event) => onWebSocketError?.(event);

    setWebsocket(ws);
  };
  const sendMessage = (message: string | ArrayBufferLike | Blob | ArrayBufferView): void => websocket?.send(message);
  const disconnect = (code?: number, reason?: string): void => websocket?.close(code, reason);

  return {
    websocket,
    messages,
    isConnected,
    connect,
    sendMessage,
    disconnect,
  };
};

export default useWebSocket;
