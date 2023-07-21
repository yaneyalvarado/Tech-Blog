const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'secret',
    cookie: {
        expires: 10 * 60 * 1000
    },
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(('public')));
app.use(session(sess));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
