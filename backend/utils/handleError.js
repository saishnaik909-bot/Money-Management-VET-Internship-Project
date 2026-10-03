// One place for error responses. Users never see SQL errors or stack traces.
function handleError(res, error, fallbackMessage) {
  if (error.name === "SequelizeValidationError") {
    const message = error.errors.map((e) => e.message).join(", ");
    return res.status(400).json({ message });
  }
  console.error(error); // full error only in the server terminal
  res.status(500).json({ message: fallbackMessage || "Something went wrong" });
}

module.exports = handleError;
