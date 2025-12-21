"use client";

import { useState } from "react";
import { Developer } from "@/types/developer";
import { DeveloperStatusBadge } from "./DeveloperStatusBadge";
import { DeveloperDocuments } from "./tabs/DeveloperDocuments";
import { DeveloperVerification } from "./tabs/DeveloperVerification";
import { DeveloperRevenue } from "./tabs/DeveloperRevenue";
import { DeveloperViolations } from "./tabs/DeveloperViolations";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface DeveloperDetailsViewProps {
  developer: Developer;
}

type TabId = "documents" | "verification" | "revenue" | "violations";

const tabs: { id: TabId; label: string }[] = [
  { id: "documents", label: "Documents" },
  { id: "verification", label: "Verification" },
  { id: "revenue", label: "Revenue" },
  { id: "violations", label: "Violations" },
];

export function DeveloperDetailsView({ developer }: DeveloperDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>("documents");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Developer banned!");
      setIsProcessing(false);
    }, 1000);
  };

  const handleSuspend = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Developer suspended!");
      setIsProcessing(false);
    }, 1000);
  };

  const handleRestrict = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Restrictions applied!");
      setIsProcessing(false);
    }, 1000);
  };

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Developer approved!");
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-background p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{developer.name}</h1>
              <DeveloperStatusBadge status={developer.status} />
            </div>
            <div className="flex gap-4 mt-3 text-sm">
              <span>
                <span className="text-muted-foreground">Email:</span>{" "}
                <span className="font-medium">{developer.email}</span>
              </span>
              {developer.company && (
                <span>
                  <span className="text-muted-foreground">Company:</span>{" "}
                  <span className="font-medium">{developer.company}</span>
                </span>
              )}
              <span>
                <span className="text-muted-foreground">Country:</span>{" "}
                <span className="font-medium">{developer.country}</span>
              </span>
            </div>
            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <span>
                Joined {formatDistanceToNow(new Date(developer.joinedAt), { addSuffix: true })}
              </span>
              <span>•</span>
              <span>
                Last active {formatDistanceToNow(new Date(developer.lastActive), { addSuffix: true })}
              </span>
            </div>
            {developer.restrictionLevel && developer.restrictionLevel !== "none" && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                <p className="text-sm font-medium text-orange-900">
                  Restriction: {developer.restrictionLevel}
                </p>
                {developer.restrictionReason && (
                  <p className="text-sm text-orange-700 mt-1">{developer.restrictionReason}</p>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {developer.status === "pending" && (
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Approve"}
              </button>
            )}
            {developer.status !== "banned" && developer.status !== "suspended" && (
              <>
                <button
                  onClick={handleRestrict}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-md text-sm font-medium border border-yellow-300 text-yellow-700 hover:bg-yellow-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Restrict
                </button>
                <button
                  onClick={handleSuspend}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-md text-sm font-medium border border-orange-300 text-orange-700 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suspend
                </button>
              </>
            )}
            {developer.status !== "banned" && (
              <button
                onClick={handleBan}
                disabled={isProcessing}
                className="px-4 py-2 rounded-md text-sm font-medium border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ban
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-background">
        <div className="flex gap-1 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {tab.id === "violations" && developer.violations.filter((v) => !v.resolvedAt).length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {developer.violations.filter((v) => !v.resolvedAt).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "documents" && <DeveloperDocuments developer={developer} />}
        {activeTab === "verification" && <DeveloperVerification developer={developer} />}
        {activeTab === "revenue" && <DeveloperRevenue developer={developer} />}
        {activeTab === "violations" && <DeveloperViolations developer={developer} />}
      </div>
    </div>
  );
}
