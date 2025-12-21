import { User } from "@/types/user";
import { formatDistanceToNow } from "date-fns";
import { Activity as ActivityIcon, LogIn, Key, Bot, TrendingUp, ArrowDownCircle, ArrowUpCircle, Settings } from "lucide-react";

interface UserActivityProps {
  user: User;
}

const activityIcons = {
  login: LogIn,
  api_key_created: Key,
  bot_subscribed: Bot,
  bot_unsubscribed: Bot,
  trade: TrendingUp,
  withdrawal: ArrowUpCircle,
  deposit: ArrowDownCircle,
  settings_changed: Settings,
};

const activityColors = {
  login: "text-blue-600 bg-blue-100",
  api_key_created: "text-purple-600 bg-purple-100",
  bot_subscribed: "text-green-600 bg-green-100",
  bot_unsubscribed: "text-orange-600 bg-orange-100",
  trade: "text-indigo-600 bg-indigo-100",
  withdrawal: "text-red-600 bg-red-100",
  deposit: "text-green-600 bg-green-100",
  settings_changed: "text-gray-600 bg-gray-100",
};

export function UserActivity({ user }: UserActivityProps) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h3 className="text-lg font-semibold mb-4">Activity Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Activities</p>
            <p className="text-2xl font-bold">{user.activities.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Last Active</p>
            <p className="text-lg font-medium">
              {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        {user.activities.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg border border-border">
            <ActivityIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">No Activity</h3>
            <p className="text-sm text-muted-foreground">No recent activity to display</p>
          </div>
        ) : (
          <div className="space-y-3">
            {user.activities.map((activity, index) => {
              const Icon = activityIcons[activity.type];
              const colorClass = activityColors[activity.type];

              return (
                <div
                  key={activity.id}
                  className="border border-border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{activity.description}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        {activity.ipAddress && (
                          <span>
                            IP: <span className="font-medium text-foreground">{activity.ipAddress}</span>
                          </span>
                        )}
                        {activity.location && (
                          <span>
                            Location: <span className="font-medium text-foreground">{activity.location}</span>
                          </span>
                        )}
                      </div>
                      {activity.metadata && (
                        <div className="mt-2 p-2 bg-muted rounded text-xs">
                          <pre className="font-mono">{JSON.stringify(activity.metadata, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
