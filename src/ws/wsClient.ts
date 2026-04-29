/**
 * WebSocket 客户端封装
 * 预留消息订阅、断线重连、心跳、事件分发
 */

type EventHandler = (data: unknown) => void;

export type WsEventType =
  | 'notification'
  | 'chat'
  | 'combat'
  | 'system'
  | 'heartbeat'
  | string;

interface WsMessage {
  type: WsEventType;
  data: unknown;
  timestamp?: number;
}

class WsClient {
  private ws: WebSocket | null = null;
  private url: string = '';
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private handlers = new Map<WsEventType, Set<EventHandler>>();
  private reconnectDelay = 3000;
  private maxReconnectAttempts = 5;
  private reconnectAttempts = 0;
  private isManualClose = false;

  /** 连接 WebSocket 服务器 */
  connect(url: string): void {
    this.url = url;
    this.isManualClose = false;
    this._connect();
  }

  private _connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    // TODO: 取消注释以接入真实 WebSocket 服务器
    // this.ws = new WebSocket(this.url);
    // this.ws.onopen = this._onOpen.bind(this);
    // this.ws.onmessage = this._onMessage.bind(this);
    // this.ws.onclose = this._onClose.bind(this);
    // this.ws.onerror = this._onError.bind(this);

    console.log('[WS] 模拟连接:', this.url);
    // 模拟连接成功
    setTimeout(() => this._onOpen(), 100);
  }

  private _onOpen(): void {
    console.log('[WS] 连接成功');
    this.reconnectAttempts = 0;
    this._startHeartbeat();
    this._emit('system', { message: 'connected' });
  }

  private _onMessage(event: MessageEvent): void {
    try {
      const msg: WsMessage = JSON.parse(event.data);
      this._emit(msg.type, msg.data);
    } catch {
      console.warn('[WS] 无法解析消息:', event.data);
    }
  }

  private _onClose(): void {
    console.log('[WS] 连接断开');
    this._stopHeartbeat();
    if (!this.isManualClose) {
      this._scheduleReconnect();
    }
  }

  private _onError(event: Event): void {
    console.error('[WS] 连接错误:', event);
  }

  /** 断线重连 */
  private _scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn('[WS] 达到最大重连次数，停止重连');
      return;
    }
    this.reconnectAttempts++;
    console.log(`[WS] ${this.reconnectDelay / 1000}s 后尝试重连（第${this.reconnectAttempts}次）`);
    this.reconnectTimer = setTimeout(() => this._connect(), this.reconnectDelay);
  }

  /** 心跳 */
  private _startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'heartbeat', data: { timestamp: Date.now() } });
    }, 30000);
  }

  private _stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  /** 发送消息 */
  send(msg: WsMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    } else {
      // 模拟：直接记录
      console.log('[WS] 模拟发送:', msg);
    }
  }

  /** 订阅事件 */
  subscribe(event: WsEventType, handler: EventHandler): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
    // 返回取消订阅函数
    return () => this.unsubscribe(event, handler);
  }

  /** 取消订阅 */
  unsubscribe(event: WsEventType, handler: EventHandler): void {
    this.handlers.get(event)?.delete(handler);
  }

  /** 内部触发事件 */
  private _emit(event: WsEventType, data: unknown): void {
    this.handlers.get(event)?.forEach((h) => h(data));
  }

  /** 模拟推送消息（开发调试用） */
  mockPush(event: WsEventType, data: unknown): void {
    this._emit(event, data);
  }

  /** 手动断开连接 */
  disconnect(): void {
    this.isManualClose = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this._stopHeartbeat();
    this.ws?.close();
    this.ws = null;
    console.log('[WS] 已断开连接');
  }

  /** 手动重连 */
  reconnect(): void {
    this.disconnect();
    this.isManualClose = false;
    this._connect();
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// 全局单例
const wsClient = new WsClient();
export default wsClient;
