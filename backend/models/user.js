import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Friend, {
        foreignKey: 'userId',
        as: 'friends'
      });
      User.hasMany(models.family, {
        foreignKey: 'userId',
        as: 'family'
      });
      User.hasMany(models.Stranger, {
        foreignKey: 'userId',
        as: 'strangers'
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    comment: DataTypes.TEXT,
    relationship: {
      type: DataTypes.ENUM('friend', 'family', 'stranger'),
      allowNull: true
    },
    relationshipDetail: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('relationshipDetail');
      },
      set(value) {
        this.setDataValue('relationshipDetail', value);
      }
    },
    deleted_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      afterCreate: async (user, options) => {
        if (user.relationship) {
          const { relationship, relationshipDetail, id } = user;
          
          switch (relationship) {
            case 'friend':
              await sequelize.models.Friend.create({
                userId: id,
                relationship: 'friend',
                metOn: relationshipDetail || null
              }, { transaction: options.transaction });
              break;
            case 'family':
              await sequelize.models.family.create({
                userId: id,
                relationship: 'family',
                relationshipType: relationshipDetail || null
              }, { transaction: options.transaction });
              break;
            case 'stranger':
              await sequelize.models.Stranger.create({
                userId: id,
                relationship: 'stranger',
                foundOn: relationshipDetail || null
              }, { transaction: options.transaction });
              break;
          }
        }
      },
      afterUpdate: async (user, options) => {
        if (user.relationship) {
          const { relationship, relationshipDetail, id } = user;
          
          // Delete any existing relationship entries
          await Promise.all([
            sequelize.models.Friend.destroy({ where: { userId: id } }, { transaction: options.transaction }),
            sequelize.models.family.destroy({ where: { userId: id } }, { transaction: options.transaction }),
            sequelize.models.Stranger.destroy({ where: { userId: id } }, { transaction: options.transaction })
          ]);

          // Create new relationship entry
          switch (relationship) {
            case 'friend':
              await sequelize.models.Friend.create({
                userId: id,
                relationship: 'friend',
                metOn: relationshipDetail || null
              }, { transaction: options.transaction });
              break;
            case 'family':
              await sequelize.models.family.create({
                userId: id,
                relationship: 'family',
                relationshipType: relationshipDetail || null
              }, { transaction: options.transaction });
              break;
            case 'stranger':
              await sequelize.models.Stranger.create({
                userId: id,
                relationship: 'stranger',
                foundOn: relationshipDetail || null
              }, { transaction: options.transaction });
              break;
          }
        }
      }
    }
  });
  return User;
};