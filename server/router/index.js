
module.exports = function (app, express) {
    
    var apiRouter = express.Router();
    var api = require('./routes/api.js');
    
    app.use('/api', apiRouter);
    
    //var users = require('./routes/users.js');
    //apiRouter.get('/api/users', users.getAll);
    //apiRouter.get('/api/user/:id', users.getOne);
    //apiRouter.post('/api/user/', users.create);
    //apiRouter.put('/api/user/:id', users.update);
    //apiRouter.delete('/api/user/:id', users.delete);

    
    var adminRouter = express.Router();
    var admin = require('./routes/admin.js');
    adminRouter.get('/dashboard', admin.dashboard);
    app.use('/super', adminRouter);

};
