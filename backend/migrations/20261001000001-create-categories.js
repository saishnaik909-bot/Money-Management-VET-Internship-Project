// WEEK 8 - A migration = version-controlled change to the database structure.
// "up" applies the change, "down" reverses it.
// Why use migrations? Everyone gets the same tables, and changes are tracked
// (like Git for the database). sync({alter:true}) can silently lose data.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("categories");
  },
};
