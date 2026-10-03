// Inserts the default categories.
const names = ["Food", "Travel", "Shopping", "Bills", "Education", "Salary", "Freelance", "Gift", "Other"];

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const rows = names.map((name) => ({ name, createdAt: now, updatedAt: now }));
    await queryInterface.bulkInsert("categories", rows);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
