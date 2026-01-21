import { WalletCard } from '../components/WalletCard';
import { OrdersTable } from '../components/OrdersTable';

export function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Quản lý ví và theo dõi đơn hàng của bạn</p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Wallet - Takes 1 column */}
          <div className="lg:col-span-1">
            <WalletCard />
            
            {/* Quick Actions */}
            <div className="glass-card p-6 mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Hành động nhanh</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Rút tiền
                </button>
                <button className="w-full btn-secondary py-3 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Lịch sử giao dịch
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="glass-card p-6 mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Thống kê</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Tổng đơn hàng</span>
                  <span className="text-white font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Đơn hoàn thành</span>
                  <span className="text-green-400 font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Đang chờ duyệt</span>
                  <span className="text-yellow-400 font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Link đã tạo</span>
                  <span className="text-white font-medium">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table - Takes 2 columns */}
          <div className="lg:col-span-2">
            <OrdersTable />
          </div>
        </div>
      </div>
    </div>
  );
}
