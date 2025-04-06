'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, get the relationship type IDs
    const relationshipTypes = await queryInterface.sequelize.query(
      `SELECT id, name FROM relationship_types;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const strangerId = relationshipTypes.find(rt => rt.name === 'stranger').id;
    const friendsId = relationshipTypes.find(rt => rt.name === 'friends').id;
    const familyId = relationshipTypes.find(rt => rt.name === 'family').id;

    // Insert categories for each relationship type
    await queryInterface.bulkInsert('categories', [
      // Stranger categories
      {
        relationship_type_id: strangerId,
        label: 'Instagram',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        relationship_type_id: strangerId,
        label: 'Facebook',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        relationship_type_id: strangerId,
        label: 'Twitter',
        created_at: new Date(),
        updated_at: new Date()
      },
      // Family categories
      {
        relationship_type_id: familyId,
        label: 'Sister',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        relationship_type_id: familyId,
        label: 'Brother',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        relationship_type_id: familyId,
        label: 'Mother',
        created_at: new Date(),
        updated_at: new Date()
      },
      // Friends categories
      {
        relationship_type_id: friendsId,
        label: 'Childhood',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        relationship_type_id: friendsId,
        label: 'High School',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        relationship_type_id: friendsId,
        label: 'Senior High School',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        relationship_type_id: friendsId,
        label: 'College',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
}; 