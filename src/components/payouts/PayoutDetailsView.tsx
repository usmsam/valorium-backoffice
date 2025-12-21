"use client";

import { useState } from "react";
import { Payout } from "@/types/payout";
import { PayoutStatusBadge } from "./PayoutStatusBadge";
import { formatDistanceToNow } from "date-fns";
import {
  User,
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Building,
  Hash
} from "lucide-react";

interface PayoutDetailsViewProps {
  payout: Payout;
}

export function PayoutDetailsView({ payout }: PayoutDetailsViewProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Payout #${payout.id} approved! Amount $${payout.amount} will be processed.`);
      setIsProcessing(false);
    }, 1000);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Payout #${payout.id} rejected. Reason: ${rejectionReason}`);
      setIsProcessing(false);
      setShowRejectDialog(false);
      setRejectionReason("");
    }, 1000);
  };

  const handleMarkCompleted = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Payout #${payout.id} marked as completed!`);
      setIsProcessing(false);
    }, 1000);
  };

  const getStatusIcon = () => {
    switch (payout.status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "processing":
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getMethodDisplay = () => {
    const methods = {
      bank_transfer: "Bank Transfer",
      paypal: "PayPal",
      crypto: "Cryptocurrency",
      wire: "Wire Transfer",
    };
    return methods[payout.method] || payout.method;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-background p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getStatusIcon()}
              <h1 className="text-2xl font-bold">Payout Request #{payout.id}</h1>
              <PayoutStatusBadge status={payout.status} />
            </div>

            {/* Payout Amount */}
            <div className="mt-4">
              <div className="text-4xl font-bold text-blue-600">
                ${payout.amount.toFixed(2)} {payout.currency}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Requested {formatDistanceToNow(new Date(payout.requestedAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {payout.status === "pending" && (
              <>
                <button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Approve
                </button>
                <button
                  onClick={() => setShowRejectDialog(true)}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-md text-sm font-medium border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject
                </button>
              </>
            )}
            {(payout.status === "approved" || payout.status === "processing") && (
              <button
                onClick={handleMarkCompleted}
                disabled={isProcessing}
                className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark as Completed
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Rejection Dialog */}
        {showRejectDialog && (
          <div className="mb-6 border border-red-200 bg-red-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-red-900 mb-3">Reject Payout Request</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason (required)"
              className="w-full p-3 border border-red-300 rounded-md text-sm mb-3 min-h-[100px]"
            />
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                disabled={isProcessing || !rejectionReason.trim()}
                className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectionReason("");
                }}
                className="px-4 py-2 rounded-md text-sm font-medium border border-border text-foreground hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Rejected/Failed Notice */}
        {payout.status === "rejected" && payout.rejectionReason && (
          <div className="mb-6 border border-red-200 bg-red-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900">Payout Rejected</h3>
                <p className="text-sm text-red-700 mt-1">{payout.rejectionReason}</p>
                {payout.rejectedBy && (
                  <p className="text-xs text-red-600 mt-2">Rejected by: {payout.rejectedBy}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Developer Information */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Developer Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{payout.developerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{payout.developerEmail}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Developer ID</p>
                <p className="font-mono text-sm">{payout.developerId}</p>
              </div>
            </div>
          </div>

          {/* Payout Method Details */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Method
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Method</p>
                <p className="font-medium">{getMethodDisplay()}</p>
              </div>
              {payout.metadata?.bankAccount && (
                <div>
                  <p className="text-sm text-muted-foreground">Bank Account</p>
                  <p className="font-mono text-sm">{payout.metadata.bankAccount}</p>
                </div>
              )}
              {payout.metadata?.paypalEmail && (
                <div>
                  <p className="text-sm text-muted-foreground">PayPal Email</p>
                  <p className="font-medium">{payout.metadata.paypalEmail}</p>
                </div>
              )}
              {payout.metadata?.cryptoAddress && (
                <div>
                  <p className="text-sm text-muted-foreground">Crypto Address</p>
                  <p className="font-mono text-xs break-all">{payout.metadata.cryptoAddress}</p>
                </div>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Timeline
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Requested</p>
                <p className="font-medium">
                  {new Date(payout.requestedAt).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(payout.requestedAt), { addSuffix: true })}
                </p>
              </div>
              {payout.processedAt && (
                <div>
                  <p className="text-sm text-muted-foreground">Processed</p>
                  <p className="font-medium">
                    {new Date(payout.processedAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(payout.processedAt), { addSuffix: true })}
                  </p>
                </div>
              )}
              {payout.completedAt && (
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="font-medium">
                    {new Date(payout.completedAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(payout.completedAt), { addSuffix: true })}
                  </p>
                </div>
              )}
              {payout.rejectedAt && (
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="font-medium">
                    {new Date(payout.rejectedAt).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(payout.rejectedAt), { addSuffix: true })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tax & Invoice Information */}
          {(payout.metadata?.invoiceId || payout.metadata?.taxId) && (
            <div className="border border-border rounded-lg p-4 bg-card">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Tax & Invoice Information
              </h2>
              <div className="space-y-3">
                {payout.metadata.invoiceId && (
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice ID</p>
                    <p className="font-mono text-sm">{payout.metadata.invoiceId}</p>
                  </div>
                )}
                {payout.metadata.taxId && (
                  <div>
                    <p className="text-sm text-muted-foreground">Tax ID</p>
                    <p className="font-mono text-sm">{payout.metadata.taxId}</p>
                  </div>
                )}
                {payout.approvedBy && (
                  <div>
                    <p className="text-sm text-muted-foreground">Approved By</p>
                    <p className="font-medium">{payout.approvedBy}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Notes */}
          {payout.metadata?.notes && (
            <div className="border border-border rounded-lg p-4 bg-card md:col-span-2">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Notes
              </h2>
              <p className="text-sm text-muted-foreground">{payout.metadata.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
