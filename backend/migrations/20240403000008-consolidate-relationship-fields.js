'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add relationship ENUM field to Users table if it doesn't exist
    const userTable = await queryInterface.describeTable('users');
    if (!userTable.relationship) {
      await queryInterface.addColumn('users', 'relationship', {
        type: Sequelize.ENUM('friend', 'family', 'stranger'),
        allowNull: true
      });
    }

    // Add relationship field to Friends table if it doesn't exist
    const friendsTable = await queryInterface.describeTable('friends');
    if (!friendsTable.relationship) {
      await queryInterface.addColumn('friends', 'relationship', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'friend'
      });
    }

    // Add relationship field to Family table if it doesn't exist
    const familyTable = await queryInterface.describeTable('family');
    if (!familyTable.relationship) {
      await queryInterface.addColumn('family', 'relationship', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'family'
      });
    }

    // Add relationship field to Stranger table if it doesn't exist
    const strangersTable = await queryInterface.describeTable('strangers');
    if (!strangersTable.relationship) {
      await queryInterface.addColumn('strangers', 'relationship', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'stranger'
      });
    }

    // Update metOn in Friends to be nullable
    await queryInterface.changeColumn('friends', 'metOn', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Update foundOn in Strangers to be nullable
    await queryInterface.changeColumn('strangers', 'foundOn', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove relationship fields
    await queryInterface.removeColumn('users', 'relationship');
    await queryInterface.removeColumn('friends', 'relationship');
    await queryInterface.removeColumn('family', 'relationship');
    await queryInterface.removeColumn('strangers', 'relationship');

    // Revert metOn and foundOn to non-nullable
    await queryInterface.changeColumn('friends', 'metOn', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('strangers', 'foundOn', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
}; 