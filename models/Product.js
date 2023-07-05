const { sequelize, DataTypes } = require("./../DatabaseConnection");
const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      require: true
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50]
      }
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
module.exports = Product;
