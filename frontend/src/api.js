// WEEK 15 - Talks to the Express backend using fetch().
export const API_URL = "http://localhost:5000/api";

// Small helper: sends a request and returns the JSON.
// Throws an Error with a friendly message if something goes wrong.
export async function request(path, options) {
  let response;
  try {
    response = await fetch(API_URL + path, options);
  } catch (error) {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

// Helpers to send JSON
export const sendJson = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
