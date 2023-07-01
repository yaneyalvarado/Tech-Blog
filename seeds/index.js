const seedPosts = require('./post-seeds');
const seedUsers = require ('./user-seeds');
const seedComments = require ('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    console.log(databaseSynced)

    await seedUsers();
    console.log(users)

    await seedPosts();
    console.log(posts)

    await seedComments();
    console.log(comments);

    process.exit(0);
};

seedAll();
