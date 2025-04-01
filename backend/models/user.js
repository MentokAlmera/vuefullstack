import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    comment: DataTypes.TEXT,
    deleted_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};