"use client";

import { Payment } from "@/types/payment";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  CheckCircle,
  XCircle,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useMemo } from "react";

interface PaymentsDashboardProps {
  payments: Payment[];
}

export function PaymentsDashboard({ payments }: PaymentsDashboardProps) {
  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // $8;LB@K ?> ?5@8>40<
    const completedPayments = payments.filter(p => p.status === "completed");
    const todayPayments = completedPayments.filter(p => new Date(p.createdAt) >= today);
    const thisMonthPayments = completedPayments.filter(p => new Date(p.createdAt) >= thisMonth);
    const lastMonthPayments = completedPayments.filter(
      p => new Date(p.createdAt) >= lastMonth && new Date(p.createdAt) <= lastMonthEnd
    );

    // 1I85 4>E>4K
    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const monthlyRevenue = thisMonthPayments.reduce((sum, p) => sum + p.amount, 0);
    const dailyRevenue = todayPayments.reduce((sum, p) => sum + p.amount, 0);
    const lastMonthRevenue = lastMonthPayments.reduce((sum, p) => sum + p.amount, 0);

    //  >AB 4>E>4>2
    const revenueGrowth = lastMonthRevenue > 0
      ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 0;

    // !B0B8AB8:0 B@0=70:F89
    const totalTransactions = payments.length;
    const successfulTransactions = completedPayments.length;
    const failedTransactions = payments.filter(p => p.status === "failed").length;
    const refundedTransactions = payments.filter(p => p.status === "refunded").length;
    const refundedAmount = payments
      .filter(p => p.status === "refunded")
      .reduce((sum, p) => sum + p.amount, 0);

    const successRate = totalTransactions > 0
      ? (successfulTransactions / totalTransactions) * 100
      : 0;

    // !@54=89 G5:
    const averageTransactionValue = successfulTransactions > 0
      ? totalRevenue / successfulTransactions
      : 0;

    // !B0B8AB8:0 ?> <5B>40< >?;0BK
    const paymentMethodStats = completedPayments.reduce((acc, p) => {
      acc[p.method] = (acc[p.method] || 0) + p.amount;
      return acc;
    }, {} as Record<string, number>);

    const topPaymentMethod = Object.entries(paymentMethodStats).sort((a, b) => b[1] - a[1])[0];

    // !B0B8AB8:0 ?> B8?0< B@0=70:F89
    const transactionTypeStats = completedPayments.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Daily cash flow 70 ?>A;54=85 7 4=59
    const dailyCashFlow = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

      const dayPayments = completedPayments.filter(p => {
        const pDate = new Date(p.createdAt);
        return pDate >= dayStart && pDate < dayEnd;
      });

      return {
        date: dayStart,
        revenue: dayPayments.reduce((sum, p) => sum + p.amount, 0),
        count: dayPayments.length,
      };
    });

    return {
      totalRevenue,
      monthlyRevenue,
      dailyRevenue,
      revenueGrowth,
      totalTransactions,
      successfulTransactions,
      failedTransactions,
      refundedTransactions,
      refundedAmount,
      successRate,
      averageTransactionValue,
      paymentMethodStats,
      topPaymentMethod,
      transactionTypeStats,
      dailyCashFlow,
    };
  }, [payments]);

  const getMethodName = (method: string) => {
    const names: Record<string, string> = {
      card: "Credit Card",
      crypto: "Crypto",
      bank_transfer: "Bank Transfer",
      paypal: "PayPal",
      stripe: "Stripe",
    };
    return names[method] || method;
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Payments Dashboard</h1>
        <p className="text-muted-foreground">Platform revenue, cash flow, and purchase statistics</p>
      </div>

      {/* Main Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <DollarSign className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">${stats.monthlyRevenue.toFixed(2)}</p>
          <div className="flex items-center gap-1 mt-1">
            {stats.revenueGrowth >= 0 ? (
              <ArrowUp className="w-3 h-3 text-green-600" />
            ) : (
              <ArrowDown className="w-3 h-3 text-red-600" />
            )}
            <p className={`text-xs ${stats.revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
              {Math.abs(stats.revenueGrowth).toFixed(1)}% vs last month
            </p>
          </div>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Daily Revenue</p>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">${stats.dailyRevenue.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Today</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Average Transaction</p>
            <DollarSign className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">${stats.averageTransactionValue.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Per completed payment</p>
        </div>
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <CreditCard className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{stats.totalTransactions}</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Successful</p>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.successfulTransactions}</p>
          <p className="text-xs text-muted-foreground mt-1">{stats.successRate.toFixed(1)}% success rate</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Failed</p>
            <XCircle className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.failedTransactions}</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Refunded</p>
            <XCircle className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{stats.refundedTransactions}</p>
          <p className="text-xs text-muted-foreground mt-1">${stats.refundedAmount.toFixed(2)} refunded</p>
        </div>
      </div>

      {/* Daily Cash Flow */}
      <div className="border border-border rounded-lg p-6 bg-card mb-6">
        <h2 className="text-lg font-semibold mb-4">Daily Cash Flow (Last 7 Days)</h2>
        <div className="space-y-3">
          {stats.dailyCashFlow.map((day, index) => {
            const maxRevenue = Math.max(...stats.dailyCashFlow.map(d => d.revenue));
            const width = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;

            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm text-muted-foreground">
                  {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1">
                  <div className="h-8 bg-muted rounded-md overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center px-3"
                      style={{ width: `${width}%` }}
                    >
                      {day.revenue > 0 && (
                        <span className="text-xs font-medium text-white">
                          ${day.revenue.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-16 text-sm text-muted-foreground text-right">
                  {day.count} txn
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Methods & Transaction Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-semibold mb-4">Revenue by Payment Method</h2>
          <div className="space-y-3">
            {Object.entries(stats.paymentMethodStats)
              .sort((a, b) => b[1] - a[1])
              .map(([method, amount]) => {
                const percentage = (amount / stats.totalRevenue) * 100;
                return (
                  <div key={method}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{getMethodName(method)}</span>
                      <span className="text-sm text-muted-foreground">
                        ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Transaction Types */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-semibold mb-4">Transactions by Type</h2>
          <div className="space-y-4">
            {Object.entries(stats.transactionTypeStats)
              .sort((a, b) => b[1] - a[1])
              .map(([type, count]) => {
                const percentage = (count / stats.successfulTransactions) * 100;
                const typeNames: Record<string, string> = {
                  subscription: "Subscription",
                  one_time: "One-time Payment",
                  refund: "Refund",
                  chargeback: "Chargeback",
                };
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{typeNames[type] || type}</p>
                      <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}% of transactions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{count}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
