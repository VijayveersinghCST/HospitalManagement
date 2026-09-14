// TODO: replace `any` with a proper history-entry type once the shape is known
interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  entries?: any[];
}

export default function HistoryDrawer({
  open,
  onClose,
  entries = [],
}: HistoryDrawerProps) {
  if (!open) return null;
  return (
    <div>
      {/* TODO: audit-trail history list */}
    </div>
  );
}
