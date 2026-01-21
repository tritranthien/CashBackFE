import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { WalletBalance } from '../services/api';

export function WalletCard() {
  const [wallet, setWallet] = useState<WalletBalance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const response = await api.getWallet();
      setWallet(response.data);
    } catch (err) {
      console.error('Failed to load wallet:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="skeleton h-6 w-32 mb-4"></div>
        <div className="skeleton h-10 w-48 mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="skeleton h-20 rounded-xl"></div>
          <div className="skeleton h-20 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="glass-card p-6 text-center text-gray-400">
        Không thể tải thông tin ví
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Tổng số dư</p>
          <h2 className="text-3xl font-bold gradient-text">
            {formatMoney(wallet.balance.total)}
          </h2>
        </div>
        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">Khả dụng</span>
          </div>
          <p className="text-xl font-semibold text-white">{formatMoney(wallet.balance.available)}</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-yellow-400 font-medium">Chờ duyệt</span>
          </div>
          <p className="text-xl font-semibold text-white">{formatMoney(wallet.balance.pending)}</p>
        </div>
      </div>
    </div>
  );
}
