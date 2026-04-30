import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useSocialStore } from '../../store/socialStore';
import { ONLINE_STATUS_NAMES, ONLINE_STATUS_COLORS, CHANNEL_NAMES } from '../../constants/index';
import type { ChannelType } from '../../types/index';
import Tabs from '../ui/Tabs';
import { formatRelativeTime } from '../../utils/index';


const SocialPanel: React.FC = () => {
  const contacts = useSocialStore((s) => s.contacts);
  const activeChannel = useSocialStore((s) => s.activeChannel);
  const setActiveChannel = useSocialStore((s) => s.setActiveChannel);
  const setActiveContact = useSocialStore((s) => s.setActiveContact);
  const markContactRead = useSocialStore((s) => s.markContactRead);
  const unreadPM = contacts.reduce((n, c) => n + c.unreadCount, 0);

  return (
    <div className="flex h-full gap-4 animate-fade-in" style={{ minHeight: 480 }}>
      {/* 左侧：好友列表 */}
      <div
        className="w-52 shrink-0 flex flex-col rounded-xl overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)' }}
      >
        <div className="px-3 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <span className="text-xs font-semibold text-glow-gold">道友列表</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((c) => (
            <button
              key={c.id}
              className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
              onClick={() => {
                setActiveContact(c.id);
                markContactRead(c.id);
                setActiveChannel('private');
              }}
            >
              <div className="relative shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ background: 'rgba(30,40,60,0.8)', border: '1px solid var(--color-border)' }}
                >
                  {c.avatar || '⚔'}
                </div>
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border"
                  style={{
                    background: ONLINE_STATUS_COLORS[c.onlineStatus],
                    borderColor: 'var(--color-dark)',
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {c.characterName}
                  </span>
                  {c.unreadCount > 0 && (
                    <span
                      className="text-xs rounded-full px-1 ml-1 shrink-0"
                      style={{ background: 'var(--color-vermillion)', color: '#fff', fontSize: '9px' }}
                    >
                      {c.unreadCount}
                    </span>
                  )}
                </div>
                <div className="text-xs" style={{ color: ONLINE_STATUS_COLORS[c.onlineStatus] }}>
                  {ONLINE_STATUS_NAMES[c.onlineStatus]}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 右侧：聊天区 */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)' }}>
        {/* 频道切换 */}
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Tabs
            items={[
              { key: 'world', label: '天下' },
              { key: 'sect', label: '宗门' },
              { key: 'private', label: '私信', badge: unreadPM },
            ]}
            activeKey={activeChannel}
            onChange={(k) => setActiveChannel(k as ChannelType)}
            compact
          />
        </div>

        {/* 消息列表 */}
        <ChatWindow />
      </div>
    </div>
  );
};

const ChatWindow: React.FC = () => {
  const allMessages = useSocialStore((s) => s.messages);
  const activeChannel = useSocialStore((s) => s.activeChannel);
  const activeContactId = useSocialStore((s) => s.activeContactId);
  const sendMessage = useSocialStore((s) => s.sendMessage);
  const [input, setInput] = useState('');

  // For private channel, only show messages involving the selected contact
  const messages = activeChannel === 'private' && activeContactId
    ? allMessages.filter(
        (m) => m.channelType === 'private' &&
          (m.senderId === activeContactId || m.senderId === 'user-001')
      )
    : allMessages;

  const handleSend = () => {
    const content = input.trim();
    if (!content) return;
    sendMessage(content);
    setInput('');
  };

  return (
    <>
      {/* 消息区 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isSelf = msg.senderId === 'user-001';
          return (
            <div key={msg.id} className={`flex gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0"
                style={{ background: 'rgba(30,40,60,0.8)', border: '1px solid var(--color-border)' }}
              >
                {msg.senderAvatar || '⚔'}
              </div>
              <div className={`max-w-[70%] ${isSelf ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: isSelf ? 'var(--color-gold)' : 'var(--color-jade)' }}>
                    {msg.senderName}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {formatRelativeTime(msg.sentAt)}
                  </span>
                </div>
                <div
                  className="px-3 py-2 rounded-xl text-sm"
                  style={{
                    background: isSelf ? 'rgba(212,168,67,0.12)' : 'rgba(30,40,60,0.6)',
                    border: isSelf ? '1px solid rgba(212,168,67,0.2)' : '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 输入框 */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <input
          className="flex-1 bg-transparent outline-none text-sm px-3 py-2 rounded-lg"
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
          placeholder="道友，请留步..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{ background: 'var(--color-border-gold)', color: '#fef3c7' }}
        >
          <Send size={16} />
        </button>
      </div>
    </>
  );
};

export { ChatWindow };
export default SocialPanel;
