"use client";

import { useState } from "react";
import { Bot } from "@/types/bot";
import { BotStatusBadge } from "./BotStatusBadge";
import { BotOverview } from "./tabs/BotOverview";
import { BotRiskAssessment } from "./tabs/BotRiskAssessment";
import { BotBacktest } from "./tabs/BotBacktest";
import { BotLogs } from "./tabs/BotLogs";
import { BotPolicyCompliance } from "./tabs/BotPolicyCompliance";
import { cn } from "@/lib/utils";

interface BotDetailsViewProps {
  bot: Bot;
}

type TabId = "overview" | "risk" | "backtest" | "logs" | "compliance";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "risk", label: "Risk Assessment" },
  { id: "backtest", label: "Backtest Verification" },
  { id: "logs", label: "Logs" },
  { id: "compliance", label: "Policy Compliance" },
];

export function BotDetailsView({ bot }: BotDetailsViewProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = () => {
    setIsApproving(true);
    // Simulate API call
    setTimeout(() => {
      alert("Bot approved!");
      setIsApproving(false);
    }, 1000);
  };

  const handleReject = () => {
    setIsRejecting(true);
    // Simulate API call
    setTimeout(() => {
      alert("Bot rejected!");
      setIsRejecting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border bg-background p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{bot.name}</h1>
              <BotStatusBadge status={bot.status} />
            </div>
            <p className="text-sm text-muted-foreground">{bot.description}</p>
            <div className="flex gap-4 mt-3 text-sm">
              <span>
                <span className="text-muted-foreground">Developer:</span>{" "}
                <span className="font-medium">{bot.developer.name}</span>
              </span>
              <span>
                <span className="text-muted-foreground">Version:</span>{" "}
                <span className="font-medium">{bot.version}</span>
              </span>
              <span>
                <span className="text-muted-foreground">Strategy:</span>{" "}
                <span className="font-medium">{bot.strategy}</span>
              </span>
            </div>
          </div>

          {/* Actions */}
          {(bot.status === "pending" || bot.status === "under_review") && (
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                disabled={isRejecting || isApproving}
                className="px-4 py-2 rounded-md text-sm font-medium border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRejecting ? "Rejecting..." : "Reject"}
              </button>
              <button
                onClick={handleApprove}
                disabled={isApproving || isRejecting}
                className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApproving ? "Approving..." : "Approve"}
              </button>
            </div>
          )}
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
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "overview" && <BotOverview bot={bot} />}
        {activeTab === "risk" && <BotRiskAssessment bot={bot} />}
        {activeTab === "backtest" && <BotBacktest bot={bot} />}
        {activeTab === "logs" && <BotLogs bot={bot} />}
        {activeTab === "compliance" && <BotPolicyCompliance bot={bot} />}
      </div>
    </div>
  );
}
