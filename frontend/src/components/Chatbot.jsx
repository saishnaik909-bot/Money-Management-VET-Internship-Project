// Floating chatbot: a small round button in the corner. Click it to open a small chat window.
// Rule-based: the user clicks a question, the backend answers from the database. No AI.
// WEEK 12 - useRef: keeps a reference to a DOM element (used to auto-scroll).
import { useEffect, useRef, useState } from "react";
import { request } from "../api";
import { ChatIcon, CloseIcon } from "./Icons";

const OPTIONS = [
  { id: "total-income", label: "Total income" },
  { id: "total-expenses", label: "Total expenses" },
  { id: "month-expenses", label: "Spent this month?" },
  { id: "year-expenses", label: "This year's expenses" },
  { id: "count", label: "Number of transactions" },
  { id: "top-category", label: "Top expense category" },
  { id: "recent", label: "Recent transaction" },
];

function Chatbot() {
  const [open, setOpen] = useState(false); // is the chat window open?
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm the SMM bot. Tap a question below." },
  ]);
  const bottomRef = useRef(null);

  // Scroll to the newest message (only possible when the window is open)
  useEffect(() => {
    if (open && bottomRef.current) bottomRef.current.scrollIntoView({ block: "nearest" });
  }, [messages, open]);

  async function ask(option) {
    const question = { from: "user", text: option.label };
    let answer;
    try {
      const data = await request("/chatbot/" + option.id);
      answer = { from: "bot", text: data.reply };
    } catch (error) {
      answer = { from: "bot", text: "Sorry, I could not get that answer." };
    }
    setMessages((old) => [...old, question, answer]);
  }

  return (
    <>
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar"><ChatIcon size={18} /></div>
            <div>
              <strong>SMM Bot</strong>
              <div className="chat-sub">Ask about your money</div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat"><CloseIcon size={18} /></button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>{m.text}</div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="chat-chips">
            {OPTIONS.map((o) => (
              <button key={o.id} onClick={() => ask(o)}>{o.label}</button>
            ))}
          </div>
        </div>
      )}

      <button className={`chat-fab ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label="Open chat">
        {open ? <CloseIcon size={26} /> : <ChatIcon size={26} />}
      </button>
    </>
  );
}

export default Chatbot;
