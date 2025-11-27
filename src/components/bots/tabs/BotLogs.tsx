import { Bot } from "@/types/bot";
import { cn } from "@/lib/utils";

interface BotLogsProps {
  bot: Bot;
}

const levelConfig = {
  info: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "INFO",
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    label: "WARNING",
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-800",
    label: "ERROR",
  },
};

export function BotLogs({ bot }: BotLogsProps) {
  return (
    <div className="space-y-4">
      {/* Log Header */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Activity Logs</h3>
          <span className="text-sm text-muted-foreground">{bot.logs.length} entries</span>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-3">
        {bot.logs.map((log) => {
          const config = levelConfig[log.level];
          return (
            <div key={log.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start gap-4">
                {/* Timestamp */}
                <div className="flex-shrink-0 w-32">
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </div>
                  <div className="text-xs font-medium">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                {/* Level Badge */}
                <div className="flex-shrink-0">
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-1 rounded text-xs font-medium",
                      config.bg,
                      config.text
                    )}
                  >
                    {config.label}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="font-medium">{log.action}</div>
                  <div className="text-sm text-muted-foreground mt-1">{log.details}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {bot.logs.length === 0 && (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <div className="text-muted-foreground">No logs available</div>
        </div>
      )}

      {/* Log Export */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Export Logs</h4>
            <p className="text-sm text-muted-foreground">Download complete audit trail</p>
          </div>
          <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-accent">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
