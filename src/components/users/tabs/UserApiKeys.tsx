import { User } from "@/types/user";
import { formatDistanceToNow } from "date-fns";
import { Key, CheckCircle, XCircle, Clock } from "lucide-react";

interface UserApiKeysProps {
  user: User;
}

const statusConfig = {
  active: {
    label: "Active",
    icon: CheckCircle,
    className: "text-green-600 bg-green-100",
  },
  revoked: {
    label: "Revoked",
    icon: XCircle,
    className: "text-red-600 bg-red-100",
  },
  expired: {
    label: "Expired",
    icon: Clock,
    className: "text-gray-600 bg-gray-100",
  },
};

export function UserApiKeys({ user }: UserApiKeysProps) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Total API Keys</div>
          <div className="text-2xl font-bold">{user.apiKeys.length}</div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Active</div>
          <div className="text-2xl font-bold text-green-600">
            {user.apiKeys.filter((k) => k.status === "active").length}
          </div>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-1">Revoked</div>
          <div className="text-2xl font-bold text-red-600">
            {user.apiKeys.filter((k) => k.status === "revoked").length}
          </div>
        </div>
      </div>

      {/* API Keys List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">API Keys</h3>
        {user.apiKeys.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg border border-border">
            <Key className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">No API Keys</h3>
            <p className="text-sm text-muted-foreground">This user hasn't created any API keys yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {user.apiKeys.map((apiKey) => {
              const config = statusConfig[apiKey.status];
              const StatusIcon = config.icon;

              return (
                <div
                  key={apiKey.id}
                  className="border border-border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{apiKey.name}</h4>
                        {apiKey.isTestnet && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            Testnet
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Exchange: <span className="font-medium text-foreground">{apiKey.exchange}</span>
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${config.className}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">{config.label}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Created</p>
                      <p className="font-medium">
                        {formatDistanceToNow(new Date(apiKey.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    {apiKey.lastUsed && (
                      <div>
                        <p className="text-muted-foreground">Last Used</p>
                        <p className="font-medium">
                          {formatDistanceToNow(new Date(apiKey.lastUsed), { addSuffix: true })}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Permissions</p>
                    <div className="flex flex-wrap gap-2">
                      {apiKey.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-0.5 bg-accent text-accent-foreground rounded text-xs font-medium"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>

                  {apiKey.status === "active" && (
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-1.5 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50">
                        Revoke
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
