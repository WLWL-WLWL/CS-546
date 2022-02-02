const peopelRoutes = require('./people');
const stockRoutes = require('./stocks');

const constructorMethod = (app) => {
    app.use('/people', peopelRoutes);
    app.use('/stocks', stockRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;