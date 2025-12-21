"use client";

import { useState } from "react";
import { User } from "@/types/user";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserApiKeys } from "./tabs/UserApiKeys";
import { UserExchanges } from "./tabs/UserExchanges";
import { UserActivity } from "./tabs/UserActivity";
import { UserComplaints } from "./tabs/UserComplaints";
import { UserRiskProfile } from "./tabs/UserRiskProfile";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";

interface UserDetailsViewProps {
  user: User;
}

type TabId = "api-keys" | "exchanges" | "activity" | "complaints" | "risk";

const tabs: { id: TabId; label: string }[] = [
  { id: "api-keys", label: "API Keys" },
  { id: "exchanges", label: "Exchanges" },
  { id: "activity", label: "Activity" },
  { id: "complaints", label: "Complaints" },
  { id: "risk", label: "Risk Profile" },
];

export function UserDetailsView({ user }: UserDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>("api-keys");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSuspend = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("User suspended!");
      setIsProcessing(false);
    }, 1000);
  };

  const handleBan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("User banned!");
      setIsProcessing(false);
    }, 1000);
  };

  const handleActivate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("User activated!");
      setIsProcessing(false);
    }, 1000);
  };

  const openComplaints = user.complaints.filter((c) => c.status === "open" || c.status === "investigating");
  const riskFlags = user.riskProfile.flags.filter((f) => !f.resolved);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-background p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <UserStatusBadge status={user.status} />
            </div>
            <div className="flex gap-4 mt-3 text-sm">
              <span>
                <span className="text-muted-foreground">Email:</span>{" "}
                <span className="font-medium">{user.email}</span>
              </span>
              {user.phone && (
                <span>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  <span className="font-medium">{user.phone}</span>
                </span>
              )}
              <span>
                <span className="text-muted-foreground">Country:</span>{" "}
                <span className="font-medium">{user.country}</span>
              </span>
            </div>
            <div className="flex gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                {user.emailVerified ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <span className={user.emailVerified ? "text-green-600" : "text-red-600"}>
                  Email {user.emailVerified ? "verified" : "not verified"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {user.phoneVerified ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <span className={user.phoneVerified ? "text-green-600" : "text-red-600"}>
                  Phone {user.phoneVerified ? "verified" : "not verified"}
                </span>
              </div>
            </div>
            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <span>Joined {formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true })}</span>
              <span>•</span>
              <span>Last active {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="border border-border rounded-lg p-2 bg-card">
                <p className="text-xs text-muted-foreground">Subscriptions</p>
                <p className="text-lg font-bold">{user.subscriptions.filter(s => s.status === "active").length}</p>
              </div>
              <div className="border border-border rounded-lg p-2 bg-card">
                <p className="text-xs text-muted-foreground">Total Spent</p>
                <p className="text-lg font-bold">${user.totalSpent.toLocaleString()}</p>
              </div>
              <div className="border border-border rounded-lg p-2 bg-card">
                <p className="text-xs text-muted-foreground">Balance</p>
                <p className="text-lg font-bold">${user.accountBalance.toLocaleString()}</p>
              </div>
              <div className="border border-border rounded-lg p-2 bg-card">
                <p className="text-xs text-muted-foreground">Risk Level</p>
                <p className={`text-lg font-bold ${
                  user.riskProfile.overallRisk === "low" ? "text-green-600" :
                  user.riskProfile.overallRisk === "medium" ? "text-yellow-600" :
                  user.riskProfile.overallRisk === "high" ? "text-orange-600" : "text-red-600"
                }`}>
                  {user.riskProfile.overallRisk.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {user.status === "suspended" && (
              <button
                onClick={handleActivate}
                disabled={isProcessing}
                className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Activate
              </button>
            )}
            {user.status !== "banned" && user.status !== "suspended" && (
              <button
                onClick={handleSuspend}
                disabled={isProcessing}
                className="px-4 py-2 rounded-md text-sm font-medium border border-orange-300 text-orange-700 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suspend
              </button>
            )}
            {user.status !== "banned" && (
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
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors relative",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {tab.id === "complaints" && openComplaints.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {openComplaints.length}
                </span>
              )}
              {tab.id === "risk" && riskFlags.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-orange-100 bg-orange-600 rounded-full">
                  {riskFlags.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "api-keys" && <UserApiKeys user={user} />}
        {activeTab === "exchanges" && <UserExchanges user={user} />}
        {activeTab === "activity" && <UserActivity user={user} />}
        {activeTab === "complaints" && <UserComplaints user={user} />}
        {activeTab === "risk" && <UserRiskProfile user={user} />}
      </div>
    </div>
  );
}
