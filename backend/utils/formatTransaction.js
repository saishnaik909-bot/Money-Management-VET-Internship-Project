// Turns a Sequelize row into the simple JSON the frontend uses.
function formatTransaction(t) {
  return {
    id: t.id,
    type: t.type,
    title: t.title,
    amount: Number(t.amount), // DECIMAL comes from MySQL as a string
    category: t.Category ? t.Category.name : "Other",
    categoryId: t.categoryId,
    paymentMode: t.paymentMode,
    date: t.date,
    description: t.description || "",
  };
}

module.exports = formatTransaction;
