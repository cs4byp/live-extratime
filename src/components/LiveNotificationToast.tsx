import React from 'react';
import { X, Flame } from 'lucide-react';

export interface LiveNotification {
  id: string;
  matchId: string;
  type: 'goal' | 'red_card';
  title: string;
  subtitle: string;
  score: string;
  minute: number;
}

interface LiveNotificationToastProps {
  notification: LiveNotification | null;
  onDismiss: () => void;
  onViewMatch: (matchId: string) => void;
}

export const LiveNotificationToast: React.FC<LiveNotificationToastProps> = ({
  notification,
  onDismiss,
  onViewMatch,
}) => {
  if (!notification) return null;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 max-w-sm w-full animate-bounce">
      <div className="bg-[#0f172a] border-2 border-emerald-500 rounded-2xl p-3.5 shadow-2xl shadow-emerald-950/60 text-white flex items-center justify-between gap-3">
        <div
          onClick={() => onViewMatch(notification.matchId)}
          className="flex items-center gap-3 cursor-pointer flex-1"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xl shrink-0">
            {notification.type === 'goal' ? '⚽' : '🟥'}
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold uppercase text-emerald-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                {notification.title}
              </span>
              <span className="text-[10px] font-mono text-gray-400">({notification.minute}&apos;)</span>
            </div>
            <div className="text-sm font-bold text-white truncate">{notification.subtitle}</div>
            <div className="text-xs font-mono font-bold text-amber-400">{notification.score}</div>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
