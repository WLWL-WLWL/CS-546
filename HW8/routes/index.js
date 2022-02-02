const charactersRoutes = require('./characters');
const searchRoutes = require('./search');
const mainRoutes = require('./main');

const constructorMethod = (app) => {
    app.use('/', mainRoutes);
    app.use('/search', searchRoutes);
    app.use('/characters', charactersRoutes);
    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Page Not found' });
    });
};

module.exports = constructorMethod;