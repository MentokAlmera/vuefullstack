import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Friend extends Model {
    static associate(models) {
      Friend.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  Friend.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'friend'
    },
    metOn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Friend',
    paranoid: true,
    deletedAt: 'deleted_at'
  });
  return Friend;
}; 