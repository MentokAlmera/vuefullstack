'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Sequelize from 'sequelize';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = (await import('../config/config.js')).default[env];
const db = {};

// Import models
import userModel from './user.js';
import relationshipTypeModel from './relationship_type.js';
import categoryModel from './category.js';
import commentModel from './comment.js';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Initialize models
db.User = userModel(sequelize, Sequelize.DataTypes);
db.RelationshipType = relationshipTypeModel(sequelize, Sequelize.DataTypes);
db.Category = categoryModel(sequelize, Sequelize.DataTypes);
db.Comment = commentModel(sequelize, Sequelize.DataTypes);

// Set up associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
