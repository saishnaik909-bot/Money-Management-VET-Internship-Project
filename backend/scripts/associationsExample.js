// WEEK 10 - Association types in Sequelize (explanation, prints a summary).
// 1) ONE-TO-MANY (used in SMM):  Category.hasMany(Transaction)
//                                Transaction.belongsTo(Category)
//    One category (Food) has many transactions.
//
// 2) ONE-TO-ONE (example only):  User.hasOne(Profile); Profile.belongsTo(User)
//    One user has exactly one profile.
//
// 3) MANY-TO-MANY (example only): Transaction.belongsToMany(Tag, { through: "TransactionTags" })
//                                 Tag.belongsToMany(Transaction, { through: "TransactionTags" })
//    A transaction can have many tags and a tag can be on many transactions.
//    Sequelize creates a third "join" table (TransactionTags).
console.log("1:M  Category -> Transactions   (used in SMM)");
console.log("1:1  User -> Profile            (example)");
console.log("M:N  Transaction <-> Tag        (example, uses a join table)");
