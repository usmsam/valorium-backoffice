interface ContentAreaProps {
  children: React.ReactNode;
}

export function ContentArea({ children }: ContentAreaProps) {
  return (
    <main className="flex-1 h-screen overflow-y-auto bg-background">
      <div className="p-6">
        {children}
      </div>
    </main>
  );
}
