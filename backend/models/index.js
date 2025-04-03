import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import process from 'process';
import configData from '../config/config.js';
import UserModel from './user.js';
import FriendModel from './friend.js';
import FamilyModel from './family.js';
import StrangerModel from './stranger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configData[env];

const db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Initialize models
const User = UserModel(sequelize);
const Friend = FriendModel(sequelize);
const family = FamilyModel(sequelize);
const Stranger = StrangerModel(sequelize);

// Add models to db object
db.User = User;
db.Friend = Friend;
db.family = family;
db.Stranger = Stranger;

// Set up associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
