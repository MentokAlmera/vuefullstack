import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Stranger extends Model {
    static associate(models) {
      Stranger.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  Stranger.init({
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
      defaultValue: 'stranger'
    },
    foundOn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Stranger',
    paranoid: true,
    deletedAt: 'deleted_at'
  });
  return Stranger;
}; 