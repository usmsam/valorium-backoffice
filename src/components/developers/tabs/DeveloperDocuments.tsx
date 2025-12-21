import { Developer } from "@/types/developer";
import { formatDistanceToNow } from "date-fns";

interface DeveloperDocumentsProps {
  developer: Developer;
}

const documentTypeLabels: Record<string, string> = {
  identity: "Identity Document",
  address: "Address Proof",
  tax: "Tax Document",
  business: "Business License",
  other: "Other",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  pending: {
    label: "Pending Review",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export function DeveloperDocuments({ developer }: DeveloperDocumentsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
        {developer.documents.length === 0 ? (
          <div className="text-center py-8 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {developer.documents.map((doc) => (
              <div
                key={doc.id}
                className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{doc.name}</h4>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          statusConfig[doc.status].className
                        }`}
                      >
                        {statusConfig[doc.status].label}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Type: {documentTypeLabels[doc.type]}</p>
                      <p>
                        Uploaded: {formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })}
                      </p>
                      {doc.notes && <p className="mt-2 text-foreground">{doc.notes}</p>}
                    </div>
                  </div>
                  {doc.url && (
                    <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">
                      View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Documents</div>
          <div className="text-2xl font-bold">{developer.documents.length}</div>
        </div>
        <div className="border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Approved</div>
          <div className="text-2xl font-bold text-green-600">
            {developer.documents.filter((d) => d.status === "approved").length}
          </div>
        </div>
        <div className="border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {developer.documents.filter((d) => d.status === "pending").length}
          </div>
        </div>
        <div className="border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Rejected</div>
          <div className="text-2xl font-bold text-red-600">
            {developer.documents.filter((d) => d.status === "rejected").length}
          </div>
        </div>
      </div>
    </div>
  );
}
