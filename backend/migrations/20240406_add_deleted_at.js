'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add deleted_at to comments table only
    await queryInterface.addColumn('comments', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove deleted_at from comments table
    await queryInterface.removeColumn('comments', 'deleted_at');
  }
}; 