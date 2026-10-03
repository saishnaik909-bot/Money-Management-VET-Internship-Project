// Returns { start, end } for a month (or a whole year if month is not given).
// Use as: date >= start AND date < end
function dateRange(year, month) {
  const y = Number(year);
  if (month) {
    const m = Number(month);
    return { start: new Date(y, m - 1, 1), end: new Date(y, m, 1) };
  }
  return { start: new Date(y, 0, 1), end: new Date(y + 1, 0, 1) };
}

module.exports = dateRange;
