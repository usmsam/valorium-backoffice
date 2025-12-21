import { Developer } from "@/types/developer";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface DeveloperVerificationProps {
  developer: Developer;
}

export function DeveloperVerification({ developer }: DeveloperVerificationProps) {
  const { verification } = developer;

  const verificationItems = [
    { label: "Email Verified", value: verification.emailVerified },
    { label: "Phone Verified", value: verification.phoneVerified },
    { label: "Identity Verified", value: verification.identityVerified },
    { label: "Address Verified", value: verification.addressVerified },
    { label: "Tax Info Verified", value: verification.taxInfoVerified },
  ];

  const statusConfig = {
    verified: { label: "Verified", color: "text-green-600", bgColor: "bg-green-100" },
    pending: { label: "Pending", color: "text-yellow-600", bgColor: "bg-yellow-100" },
    rejected: { label: "Rejected", color: "text-red-600", bgColor: "bg-red-100" },
    incomplete: { label: "Incomplete", color: "text-gray-600", bgColor: "bg-gray-100" },
  };

  const currentStatus = statusConfig[verification.status];

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
        <div className="flex items-center gap-4">
          <div
            className={`px-4 py-2 rounded-lg ${currentStatus.bgColor} ${currentStatus.color} font-semibold text-lg`}
          >
            {currentStatus.label}
          </div>
          {verification.lastVerified && (
            <div className="text-sm text-muted-foreground">
              Last verified {formatDistanceToNow(new Date(verification.lastVerified), { addSuffix: true })}
              {verification.verifiedBy && ` by ${verification.verifiedBy}`}
            </div>
          )}
        </div>
        {verification.rejectionReason && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm font-medium text-red-900">Rejection Reason:</p>
            <p className="text-sm text-red-700 mt-1">{verification.rejectionReason}</p>
          </div>
        )}
      </div>

      {/* Verification Checklist */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4">Verification Checklist</h3>
        <div className="space-y-3">
          {verificationItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-lg border border-border"
            >
              <span className="font-medium">{item.label}</span>
              {item.value ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <XCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Not Verified</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4">Verification Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completed</span>
            <span className="font-medium">
              {verificationItems.filter((item) => item.value).length} / {verificationItems.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full transition-all"
              style={{
                width: `${(verificationItems.filter((item) => item.value).length / verificationItems.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {verification.status === "pending" && (
        <div className="border border-border rounded-lg p-6 bg-card">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium">
              Approve Verification
            </button>
            <button className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 font-medium">
              Reject Verification
            </button>
            <button className="px-4 py-2 border border-border rounded-md hover:bg-muted font-medium">
              Request More Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
