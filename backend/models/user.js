'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.RelationshipType, {
        foreignKey: 'relationship_type_id',
        as: 'relationship_type'
      });
      this.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'comments'
      });
    }
  }
  
  User.init({
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    relationship_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'relationship_types',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW')
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  
  return User;
}; 