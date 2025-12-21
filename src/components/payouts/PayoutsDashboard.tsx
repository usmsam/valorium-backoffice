"use client";

import { Payout } from "@/types/payout";
import {
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  AlertCircle,
  FileText
} from "lucide-react";
import { useMemo } from "react";

interface PayoutsDashboardProps {
  payouts: Payout[];
}

export function PayoutsDashboard({ payouts }: PayoutsDashboardProps) {
  const stats = useMemo(() => {
    const totalRequests = payouts.length;
    const pendingRequests = payouts.filter(p => p.status === "pending").length;
    const approvedRequests = payouts.filter(p => p.status === "approved" || p.status === "processing").length;
    const completedRequests = payouts.filter(p => p.status === "completed").length;
    const rejectedRequests = payouts.filter(p => p.status === "rejected").length;
    const failedRequests = payouts.filter(p => p.status === "failed").length;

    const pendingAmount = payouts
      .filter(p => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0);

    const approvedAmount = payouts
      .filter(p => p.status === "approved" || p.status === "processing")
      .reduce((sum, p) => sum + p.amount, 0);

    const completedAmount = payouts
      .filter(p => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);

    const totalPaidOut = completedAmount;
    const averagePayoutAmount = completedRequests > 0 ? completedAmount / completedRequests : 0;

    // #=8:0;L=K5 @07@01>BG8:8
    const uniqueDevelopers = new Set(payouts.map(p => p.developerId)).size;

    // CFO Reports - 8AB>@8O 2K?;0B
    const payoutHistory = payouts
      .filter(p => p.status === "completed")
      .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
      .slice(0, 10);

    // !B0B8AB8:0 ?> <5B>40<
    const methodStats = payouts.reduce((acc, p) => {
      acc[p.method] = (acc[p.method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalRequests,
      pendingRequests,
      approvedRequests,
      completedRequests,
      rejectedRequests,
      failedRequests,
      pendingAmount,
      approvedAmount,
      completedAmount,
      totalPaidOut,
      averagePayoutAmount,
      uniqueDevelopers,
      payoutHistory,
      methodStats,
    };
  }, [payouts]);

  const getMethodName = (method: string) => {
    const names: Record<string, string> = {
      bank_transfer: "Bank Transfer",
      paypal: "PayPal",
      crypto: "Crypto",
      wire: "Wire Transfer",
    };
    return names[method] || method;
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Payouts Management</h1>
        <p className="text-muted-foreground">Developer payout requests, approvals, and payment history</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending Requests</p>
            <Clock className="w-4 h-4 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendingRequests}</p>
          <p className="text-xs text-muted-foreground mt-1">${stats.pendingAmount.toFixed(2)} pending</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Approved</p>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.approvedRequests}</p>
          <p className="text-xs text-muted-foreground mt-1">${stats.approvedAmount.toFixed(2)} approved</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Paid Out</p>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">${stats.totalPaidOut.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">{stats.completedRequests} completed</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Average Payout</p>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">${stats.averagePayoutAmount.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Per completed payout</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Requests</p>
            <FileText className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{stats.totalRequests}</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Active Developers</p>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.uniqueDevelopers}</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Rejected</p>
            <XCircle className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.rejectedRequests}</p>
        </div>

        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Failed</p>
            <AlertCircle className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{stats.failedRequests}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CFO Report - Payment History */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            CFO Report - Recent Payouts
          </h2>
          <div className="space-y-3">
            {stats.payoutHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground">No completed payouts yet</p>
            ) : (
              stats.payoutHistory.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{payout.developerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {getMethodName(payout.method)} " {new Date(payout.completedAt!).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">${payout.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{payout.metadata?.invoiceId}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payment Methods Stats */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-semibold mb-4">Payout Methods Distribution</h2>
          <div className="space-y-3">
            {Object.entries(stats.methodStats)
              .sort((a, b) => b[1] - a[1])
              .map(([method, count]) => {
                const percentage = (count / stats.totalRequests) * 100;
                return (
                  <div key={method}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{getMethodName(method)}</span>
                      <span className="text-sm text-muted-foreground">
                        {count} ({percentage.toFixed(1)}%)
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
      </div>

      {/* Pending Requests Alert */}
      {stats.pendingRequests > 0 && (
        <div className="mt-6 border border-yellow-200 bg-yellow-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-yellow-900">
                {stats.pendingRequests} Payout Request{stats.pendingRequests > 1 ? 's' : ''} Awaiting Review
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Total amount pending approval: ${stats.pendingAmount.toFixed(2)}. Click on requests in the list to review and approve/reject.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
