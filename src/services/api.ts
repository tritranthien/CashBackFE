const API_BASE = '/api';

export interface WalletBalance {
  userId: string;
  email: string;
  name: string;
  balance: {
    available: number;
    pending: number;
    total: number;
  };
}

export interface Order {
  id: string;
  orderSn: string;
  productName: string;
  productImage: string;
  orderAmount: number;
  cashbackAmount: number;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'REJECTED';
  purchaseTime: string;
}

export interface AffiliateLink {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async generateLink(originalUrl: string, userId?: string): Promise<{ success: boolean; data: AffiliateLink }> {
    const url = userId ? `/links/generate?userId=${userId}` : '/links/generate';
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify({ originalUrl }),
    });
  }

  async getWallet(userId?: string): Promise<{ success: boolean; data: WalletBalance }> {
    const url = userId ? `/user/wallet?userId=${userId}` : '/user/wallet';
    return this.request(url);
  }

  async getOrders(userId?: string, page = 1, limit = 20): Promise<PaginatedResponse<Order>> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (userId) params.append('userId', userId);
    return this.request(`/user/orders?${params}`);
  }

  async getLinks(userId?: string, page = 1, limit = 20): Promise<PaginatedResponse<AffiliateLink>> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (userId) params.append('userId', userId);
    return this.request(`/links?${params}`);
  }

  async createDemoUser(email: string, password: string, name?: string): Promise<{ success: boolean; data: { id: string; email: string; name: string } }> {
    return this.request('/user/demo', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }
}

export const api = new ApiService();
