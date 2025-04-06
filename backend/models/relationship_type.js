'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RelationshipType extends Model {
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: 'relationship_type_id',
        as: 'users'
      });
      this.hasMany(models.Category, {
        foreignKey: 'relationship_type_id',
        as: 'categories'
      });
    }
  }
  
  RelationshipType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dropdown_label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RelationshipType',
    tableName: 'relationship_types',
    underscored: true
  });
  
  return RelationshipType;
}; 