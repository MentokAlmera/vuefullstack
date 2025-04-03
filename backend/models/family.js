import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class family extends Model {
    static associate(models) {
      family.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  family.init({
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
      defaultValue: 'family'
    },
    relationshipType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'family',
    tableName: 'family',
    paranoid: true,
    deletedAt: 'deleted_at'
  });
  return family;
}; 