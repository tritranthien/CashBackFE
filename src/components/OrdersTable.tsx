import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Order } from '../services/api';

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadOrders();
  }, [page]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await api.getOrders(undefined, page, 10);
      setOrders(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.error('Failed to load orders:', err);
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: Order['status']) => {
    const badges = {
      PENDING: 'badge badge-pending',
      APPROVED: 'badge badge-approved',
      COMPLETED: 'badge badge-completed',
      REJECTED: 'badge badge-rejected',
    };
    const labels = {
      PENDING: 'Chờ duyệt',
      APPROVED: 'Đã duyệt',
      COMPLETED: 'Hoàn thành',
      REJECTED: 'Từ chối',
    };
    return <span className={badges[status]}>{labels[status]}</span>;
  };

  if (loading && orders.length === 0) {
    return (
      <div className="glass-card p-6">
        <div className="skeleton h-6 w-40 mb-6"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-20 mb-4 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Lịch sử đơn hàng</h2>
        <button
          onClick={() => loadOrders()}
          className="btn-secondary text-sm py-2 px-4"
          disabled={loading}
        >
          {loading ? 'Đang tải...' : 'Làm mới'}
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <p className="text-gray-400">Chưa có đơn hàng nào</p>
          <p className="text-gray-500 text-sm mt-1">Hãy mua sắm qua link hoàn tiền để nhận cashback!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {order.productImage ? (
                    <img
                      src={order.productImage}
                      alt={order.productName || 'Product'}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-800"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate mb-1">
                      {order.productName || `Đơn hàng #${order.orderSn}`}
                    </h4>
                    <p className="text-gray-400 text-sm">{formatDate(order.purchaseTime)}</p>
                  </div>

                  <div className="text-right">
                    {getStatusBadge(order.status)}
                    <p className="text-gray-400 text-sm mt-2">
                      Giá trị: {formatMoney(order.orderAmount)}
                    </p>
                    <p className="text-green-400 font-medium">
                      +{formatMoney(order.cashbackAmount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-secondary py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="text-gray-400 px-4">
                Trang {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-secondary py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
