'use strict';

const axios = require('axios');

const sampleComments = [
    {
        firstName: "John",
        lastName: "Smith",
        comment: "Alme is an amazing friend! We've known each other since childhood.",
        relationship: "friend",
        friends: [{ metOn: "childhood" }]
    },
    {
        firstName: "Sarah",
        lastName: "Johnson",
        comment: "My sister is the most talented person I know. So proud of her achievements!",
        relationship: "family",
        family: [{ relationshipType: "sister" }]
    },
    {
        firstName: "Michael",
        lastName: "Brown",
        comment: "Found your content on Instagram. Your work is inspiring!",
        relationship: "stranger",
        strangers: [{ foundOn: "instagram" }]
    },
    {
        firstName: "Emily",
        lastName: "Davis",
        comment: "We met in college and have been best friends ever since.",
        relationship: "friend",
        friends: [{ metOn: "college" }]
    },
    {
        firstName: "David",
        lastName: "Wilson",
        comment: "Your YouTube videos are incredibly helpful. Keep up the great work!",
        relationship: "stranger",
        strangers: [{ foundOn: "youtube" }]
    },
    {
        firstName: "Lisa",
        lastName: "Anderson",
        comment: "As your mother, I couldn't be prouder of the person you've become.",
        relationship: "family",
        family: [{ relationshipType: "mother" }]
    },
    {
        firstName: "Robert",
        lastName: "Taylor",
        comment: "Your Facebook posts always brighten my day. Thanks for sharing!",
        relationship: "stranger",
        strangers: [{ foundOn: "facebook" }]
    },
    {
        firstName: "Jennifer",
        lastName: "Martinez",
        comment: "We've been friends since JHS. So many memories together!",
        relationship: "friend",
        friends: [{ metOn: "jhs" }]
    },
    {
        firstName: "William",
        lastName: "Garcia",
        comment: "Your Instagram stories are my daily dose of inspiration.",
        relationship: "stranger",
        strangers: [{ foundOn: "instagram" }]
    },
    {
        firstName: "Patricia",
        lastName: "Lee",
        comment: "As your sister, I've watched you grow into an amazing person.",
        relationship: "family",
        family: [{ relationshipType: "sister" }]
    },
    {
        firstName: "James",
        lastName: "Clark",
        comment: "We met online through a tech community. Your insights were invaluable!",
        relationship: "friend",
        friends: [{ metOn: "online" }]
    },
    {
        firstName: "Mary",
        lastName: "White",
        comment: "Your YouTube tutorials have helped me learn so much. Thank you!",
        relationship: "stranger",
        strangers: [{ foundOn: "youtube" }]
    },
    {
        firstName: "Thomas",
        lastName: "Harris",
        comment: "Your Facebook group has been such a supportive community.",
        relationship: "stranger",
        strangers: [{ foundOn: "facebook" }]
    },
    {
        firstName: "Elizabeth",
        lastName: "Martin",
        comment: "We've been friends since SHS. Your friendship means the world to me.",
        relationship: "friend",
        friends: [{ metOn: "shs" }]
    },
    {
        firstName: "Daniel",
        lastName: "Thompson",
        comment: "Your Instagram feed is my go-to for daily inspiration.",
        relationship: "stranger",
        strangers: [{ foundOn: "instagram" }]
    },
    {
        firstName: "Susan",
        lastName: "Moore",
        comment: "As your brother, I'm so proud of all your accomplishments.",
        relationship: "family",
        family: [{ relationshipType: "brother" }]
    },
    {
        firstName: "Joseph",
        lastName: "Jackson",
        comment: "We met at a coding bootcamp. Your help was crucial to my success!",
        relationship: "friend",
        friends: [{ metOn: "2021" }]
    },
    {
        firstName: "Nancy",
        lastName: "Allen",
        comment: "Your YouTube channel has been my favorite discovery this year.",
        relationship: "stranger",
        strangers: [{ foundOn: "youtube" }]
    },
    {
        firstName: "Christopher",
        lastName: "Young",
        comment: "Your Facebook page is my daily source of motivation.",
        relationship: "stranger",
        strangers: [{ foundOn: "facebook" }]
    },
    {
        firstName: "Margaret",
        lastName: "King",
        comment: "We've been friends since middle school. So many adventures together!",
        relationship: "friend",
        friends: [{ metOn: "2010" }]
    }
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            console.log('Starting database seeding...');
            
            for (const comment of sampleComments) {
                await queryInterface.bulkInsert('user_comments', [{
                    firstName: comment.firstName,
                    lastName: comment.lastName,
                    comment: comment.comment,
                    relationship: comment.relationship,
                    friends: comment.friends,
                    family: comment.family,
                    strangers: comment.strangers,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }]);
                console.log(`Added comment from ${comment.firstName} ${comment.lastName}`);
            }
            
            console.log('Database seeding completed successfully!');
        } catch (error) {
            console.error('Error seeding database:', error.message);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user_comments', null, {});
    }
};