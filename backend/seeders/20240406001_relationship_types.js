'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('relationship_types', [
      {
        name: 'stranger',
        dropdown_label: 'Stranger',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'friends',
        dropdown_label: 'Friends',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'family',
        dropdown_label: 'Family',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('relationship_types', null, {});
  }
}; 