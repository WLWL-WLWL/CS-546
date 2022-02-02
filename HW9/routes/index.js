const palindromesRoutes = require('./palindromes');

const constructorMethod = (app) => {
    app.use('/', palindromesRoutes);
    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;