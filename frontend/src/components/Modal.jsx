// A pop-up window that appears over the page ("modal").
// children = whatever we put inside it (the transaction form).
import { useEffect } from "react";
import { CloseIcon } from "./Icons";

function Modal({ title, onClose, children }) {
  // Close with the Esc key + stop the page behind from scrolling
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    // clicking the dark background closes the pop-up
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation: clicking inside the pop-up should NOT close it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close"><CloseIcon size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
