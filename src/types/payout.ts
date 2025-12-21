export type PayoutStatus = "pending" | "approved" | "rejected" | "processing" | "completed" | "failed";
export type PayoutMethod = "bank_transfer" | "paypal" | "crypto" | "wire";

export interface Developer {
  id: string;
  name: string;
  email: string;
  country: string;
  totalEarnings: number;
  availableBalance: number;
  totalPayouts: number;
  botsCount: number;
  joinedAt: string;
}

export interface Payout {
  id: string;
  developerId: string;
  developerName: string;
  developerEmail: string;
  amount: number;
  currency: string;
  status: PayoutStatus;
  method: PayoutMethod;
  requestedAt: string;
  processedAt?: string;
  completedAt?: string;
  rejectedAt?: string;
  approvedBy?: string;
  rejectedBy?: string;
  rejectionReason?: string;
  metadata?: {
    bankAccount?: string;
    paypalEmail?: string;
    cryptoAddress?: string;
    invoiceId?: string;
    taxId?: string;
    notes?: string;
  };
}

export interface PayoutStats {
  totalRequests: number;
  pendingRequests: number;
  approvedAmount: number;
  completedAmount: number;
  rejectedRequests: number;
  averagePayoutAmount: number;
  totalDevelopers: number;
}
