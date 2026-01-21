import { LinkGenerator } from '../components/LinkGenerator';

export function HomePage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-orange-400 text-sm font-medium">Hoàn tiền lên đến 80%</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Mua hàng Shopee,{' '}
            <span className="gradient-text">nhận tiền hoàn lại</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Dán link sản phẩm Shopee, chúng tôi sẽ tạo link hoàn tiền cho bạn. 
            Mua hàng qua link này và nhận tiền hoàn lại sau khi đơn hàng hoàn thành.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">10K+</p>
              <p className="text-gray-500 text-sm">Người dùng</p>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">50K+</p>
              <p className="text-gray-500 text-sm">Đơn hàng</p>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold gradient-text">1.5 tỷ VND</p>
              <p className="text-gray-500 text-sm">Đã hoàn tiền</p>
            </div>
          </div>
        </div>

        {/* Link Generator */}
        <LinkGenerator />

        {/* How it works */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Cách thức hoạt động</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="glass-card p-6 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Dán link Shopee</h3>
              <p className="text-gray-400 text-sm">
                Copy link sản phẩm từ Shopee và dán vào ô trên
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-6 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Nhận link hoàn tiền</h3>
              <p className="text-gray-400 text-sm">
                Hệ thống tạo link affiliate và trả về cho bạn
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-6 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Mua & nhận tiền</h3>
              <p className="text-gray-400 text-sm">
                Mua hàng qua link đó và nhận hoàn tiền sau khi đơn hoàn thành
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
