const Sequelize = require('sequelize');

const sequelize = new Sequelize('doannganh', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true
    },
    dialectOptions: {
        multipleStatements: true
    }
});

module.exports = sequelize;