"use client";

import { Payment } from "@/types/payment";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { formatDistanceToNow } from "date-fns";
import {
  CreditCard,
  User,
  Calendar,
  DollarSign,
  Hash,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  AlertCircle
} from "lucide-react";

interface PaymentDetailsViewProps {
  payment: Payment;
}

export function PaymentDetailsView({ payment }: PaymentDetailsViewProps) {
  const getStatusIcon = () => {
    switch (payment.status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "processing":
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case "refunded":
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  const getMethodDisplay = () => {
    const methods = {
      card: "Credit Card",
      crypto: "Cryptocurrency",
      bank_transfer: "Bank Transfer",
      paypal: "PayPal",
      stripe: "Stripe",
    };
    return methods[payment.method] || payment.method;
  };

  const getTypeDisplay = () => {
    const types = {
      subscription: "Subscription",
      one_time: "One-time Payment",
      refund: "Refund",
      chargeback: "Chargeback",
    };
    return types[payment.type] || payment.type;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-background p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getStatusIcon()}
              <h1 className="text-2xl font-bold">Payment #{payment.id}</h1>
              <PaymentStatusBadge status={payment.status} />
            </div>
            <p className="text-muted-foreground mt-1">{payment.description}</p>

            {/* Payment Amount */}
            <div className="mt-4">
              <div className="text-4xl font-bold text-green-600">
                ${payment.amount.toFixed(2)} {payment.currency}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Information */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              User Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{payment.userName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{payment.userEmail}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-mono text-sm">{payment.userId}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="font-medium">{getMethodDisplay()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transaction Type</p>
                <p className="font-medium">{getTypeDisplay()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-mono text-sm">{payment.transactionId}</p>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timestamps
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">
                  {new Date(payment.createdAt).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(payment.createdAt), { addSuffix: true })}
                </p>
              </div>
              {payment.processedAt && (
                <div>
                  <p className="text-sm text-muted-foreground">Processed</p>
                  <p className="font-medium">
                    {new Date(payment.processedAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(payment.processedAt), { addSuffix: true })}
                  </p>
                </div>
              )}
              {payment.refundedAt && (
                <div>
                  <p className="text-sm text-muted-foreground">Refunded</p>
                  <p className="font-medium">
                    {new Date(payment.refundedAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(payment.refundedAt), { addSuffix: true })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          {payment.metadata && Object.keys(payment.metadata).length > 0 && (
            <div className="border border-border rounded-lg p-4 bg-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Additional Information
              </h2>
              <div className="space-y-3">
                {payment.metadata.botId && (
                  <div>
                    <p className="text-sm text-muted-foreground">Bot</p>
                    <p className="font-medium">{payment.metadata.botName || payment.metadata.botId}</p>
                  </div>
                )}
                {payment.metadata.subscriptionId && (
                  <div>
                    <p className="text-sm text-muted-foreground">Subscription ID</p>
                    <p className="font-mono text-sm">{payment.metadata.subscriptionId}</p>
                  </div>
                )}
                {payment.metadata.invoiceId && (
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice ID</p>
                    <p className="font-mono text-sm">{payment.metadata.invoiceId}</p>
                  </div>
                )}
                {payment.metadata.failureReason && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-muted-foreground">Failure Reason</p>
                    <p className="font-medium text-red-700">{payment.metadata.failureReason}</p>
                  </div>
                )}
                {payment.metadata.refundReason && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                    <p className="text-sm text-muted-foreground">Refund Reason</p>
                    <p className="font-medium text-orange-700">{payment.metadata.refundReason}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {payment.status === "completed" && (
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 rounded-md text-sm font-medium border border-orange-300 text-orange-700 hover:bg-orange-50">
              Issue Refund
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium border border-border text-foreground hover:bg-muted">
              Download Receipt
            </button>
          </div>
        )}
        {payment.status === "failed" && (
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
              Retry Payment
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium border border-border text-foreground hover:bg-muted">
              Contact User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
