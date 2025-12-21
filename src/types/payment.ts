export type PaymentStatus = "completed" | "pending" | "failed" | "refunded" | "processing";
export type PaymentMethod = "card" | "crypto" | "bank_transfer" | "paypal" | "stripe";
export type TransactionType = "subscription" | "one_time" | "refund" | "chargeback";

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  type: TransactionType;
  description: string;
  createdAt: string;
  processedAt?: string;
  refundedAt?: string;
  transactionId: string;
  metadata?: {
    botId?: string;
    botName?: string;
    subscriptionId?: string;
    invoiceId?: string;
    failureReason?: string;
    refundReason?: string;
  };
}

export interface PaymentStats {
  totalRevenue: number;
  monthlyRevenue: number;
  dailyRevenue: number;
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  refundedAmount: number;
  averageTransactionValue: number;
  topPaymentMethod: PaymentMethod;
  revenueGrowth: number;
}
