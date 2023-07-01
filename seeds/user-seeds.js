const { User } = require('../models');

const userData = [
    {
        username: "yaney_alvarado",
        github: "yaneyalvarado",
        email: "alvyaney@gmail.com",
        password: ""
    },
   
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;