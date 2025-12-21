import { User, ComplaintStatus } from "@/types/user";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

interface UserComplaintsProps {
  user: User;
}

const statusConfig: Record<ComplaintStatus, { label: string; icon: any; className: string }> = {
  open: {
    label: "Open",
    icon: AlertCircle,
    className: "text-orange-600 bg-orange-100",
  },
  investigating: {
    label: "Investigating",
    icon: Clock,
    className: "text-blue-600 bg-blue-100",
  },
  resolved: {
    label: "Resolved",
    icon: CheckCircle,
    className: "text-green-600 bg-green-100",
  },
  closed: {
    label: "Closed",
    icon: XCircle,
    className: "text-gray-600 bg-gray-100",
  },
};

const priorityConfig = {
  low: { label: "Low", className: "bg-blue-100 text-blue-700" },
  medium: { label: "Medium", className: "bg-yellow-100 text-yellow-700" },
  high: { label: "High", className: "bg-orange-100 text-orange-700" },
  urgent: { label: "Urgent", className: "bg-red-100 text-red-700" },
};

const typeLabels: Record<string, string> = {
  bot_performance: "Bot Performance",
  technical_issue: "Technical Issue",
  billing: "Billing",
  support: "Support",
  other: "Other",
};

export function UserComplaints({ user }: UserComplaintsProps) {
  const openComplaints = user.complaints.filter((c) => c.status === "open" || c.status === "investigating");
  const closedComplaints = user.complaints.filter((c) => c.status === "resolved" || c.status === "closed");

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Total Complaints</div>
          <div className="text-2xl font-bold">{user.complaints.length}</div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Open</div>
          <div className="text-2xl font-bold text-orange-600">{openComplaints.length}</div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Resolved</div>
          <div className="text-2xl font-bold text-green-600">{closedComplaints.length}</div>
        </div>
      </div>

      {/* Active Complaints */}
      {openComplaints.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Active Complaints</h3>
          <div className="space-y-4">
            {openComplaints.map((complaint) => {
              const statusCfg = statusConfig[complaint.status];
              const StatusIcon = statusCfg.icon;
              const priorityCfg = priorityConfig[complaint.priority];

              return (
                <div
                  key={complaint.id}
                  className="border border-orange-300 rounded-lg p-5 bg-orange-50/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{complaint.subject}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityCfg.className}`}>
                          {priorityCfg.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{typeLabels[complaint.type]}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${statusCfg.className}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">{statusCfg.label}</span>
                    </div>
                  </div>

                  <p className="text-sm mb-3">{complaint.description}</p>

                  <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                    <span>
                      Submitted {formatDistanceToNow(new Date(complaint.submittedAt), { addSuffix: true })}
                    </span>
                    {complaint.assignedTo && (
                      <span>
                        Assigned to: <span className="font-medium text-foreground">{complaint.assignedTo}</span>
                      </span>
                    )}
                  </div>

                  {complaint.responses.length > 0 && (
                    <div className="border-t border-orange-200 pt-3 mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Responses ({complaint.responses.length})</p>
                      <div className="space-y-2">
                        {complaint.responses.map((response) => (
                          <div key={response.id} className="bg-white p-3 rounded-md">
                            <div className="flex items-start justify-between mb-1">
                              <span className="text-xs font-medium">{response.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(response.timestamp), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm">{response.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resolved Complaints */}
      {closedComplaints.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Resolved Complaints</h3>
          <div className="space-y-3">
            {closedComplaints.map((complaint) => {
              const statusCfg = statusConfig[complaint.status];
              const StatusIcon = statusCfg.icon;

              return (
                <div
                  key={complaint.id}
                  className="border border-border rounded-lg p-4 bg-card opacity-75"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{complaint.subject}</h4>
                      <p className="text-sm text-muted-foreground">{typeLabels[complaint.type]}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${statusCfg.className}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">{statusCfg.label}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {complaint.resolvedAt && (
                      <span className="text-green-600">
                        Resolved {formatDistanceToNow(new Date(complaint.resolvedAt), { addSuffix: true })}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Complaints */}
      {user.complaints.length === 0 && (
        <div className="text-center py-12 bg-green-50 rounded-lg border border-green-200">
          <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-900 mb-1">No Complaints</h3>
          <p className="text-sm text-green-700">This user has not submitted any complaints</p>
        </div>
      )}
    </div>
  );
}
