module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      type: { type: Sequelize.STRING, allowNull: false }, // income | expense
      title: { type: Sequelize.STRING, allowNull: false },
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false }, // always positive
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "categories", key: "id" }, // foreign key
      },
      paymentMode: { type: Sequelize.STRING, allowNull: false }, // UPI | Cash
      date: { type: Sequelize.DATE, allowNull: false },
      description: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("transactions");
  },
};
