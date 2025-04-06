import db from './models/index.js';
const { RelationshipType } = db;

async function seedRelationshipTypes() {
    try {
        // Delete existing records
        await RelationshipType.destroy({ where: {}, force: true });

        // Insert new records
        await RelationshipType.bulkCreate([
            {
                name: 'Friend',
                dropdown_label: 'Friend'
            },
            {
                name: 'Family',
                dropdown_label: 'Family Member'
            },
            {
                name: 'Stranger',
                dropdown_label: 'Stranger'
            }
        ]);

        console.log('Relationship types seeded successfully');
    } catch (error) {
        console.error('Error seeding relationship types:', error);
    } finally {
        process.exit();
    }
}

seedRelationshipTypes(); 