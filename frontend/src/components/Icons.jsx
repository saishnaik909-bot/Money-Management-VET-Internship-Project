// Small SVG icons (no icon library needed). Colour follows the text colour.
function Base({ size = 20, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {children}
    </svg>
  );
}

export const IncomeIcon = (p) => (<Base {...p}><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></Base>);
export const ExpenseIcon = (p) => (<Base {...p}><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></Base>);
export const CalendarIcon = (p) => (<Base {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></Base>);
export const TrendIcon = (p) => (<Base {...p}><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></Base>);
export const WalletIcon = (p) => (<Base {...p}><rect x="2" y="6" width="20" height="14" rx="3" /><path d="M2 10h20" /><circle cx="17" cy="15" r="1" /></Base>);
export const ChatIcon = (p) => (<Base {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Base>);
export const CloseIcon = (p) => (<Base {...p}><path d="M18 6L6 18M6 6l12 12" /></Base>);
export const PlusIcon = (p) => (<Base {...p}><path d="M12 5v14M5 12h14" /></Base>);
export const EditIcon = (p) => (<Base {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></Base>);
export const TrashIcon = (p) => (<Base {...p}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /></Base>);
export const DownloadIcon = (p) => (<Base {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></Base>);
export const BackIcon = (p) => (<Base {...p}><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></Base>);
export const BookIcon = (p) => (<Base {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" /><path d="M4 19.5V21h16" /></Base>);
