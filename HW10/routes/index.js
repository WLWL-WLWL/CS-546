const userRoutes = require('./users');
const privateRoutes = require('./private');

const constructorMethod = (app) => {
    app.use('/', userRoutes);
    app.use('/private', privateRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;