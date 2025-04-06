'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsTo(models.RelationshipType, {
        foreignKey: 'relationship_type_id',
        as: 'relationship_type'
      });
      this.hasMany(models.Comment, {
        foreignKey: 'category_id',
        as: 'comments'
      });
    }
  }
  
  Category.init({
    relationship_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'relationship_types',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    underscored: true
  });
  
  return Category;
}; 