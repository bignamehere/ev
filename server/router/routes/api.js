var jwt = require('jsonwebtoken');

module.exports = function (app, express) {
    
    var User = app.user;
    
    // ROUTES FOR OUR API
    var apiRouter = express.Router();

    // AUTH ROUTE
    apiRouter.post('/auth', function(req, res){

        // find the user
        // select the email and password explicitly
        User.findOne({ email: req.body.email })

        .select('firstName email password')

        .exec(function(err, user){
            if(err) throw err;

            // no user with that email found
            if(!user){
                res.json({
                    success: false,
                    message: 'Authentication failed. USER NOT FOUND.'
                });
            } else if(user){
                // check if password matches
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword){
                    res.json({
                        success: false,
                        message: 'Authentication failed. WRONG PASSWORD.'
                    });
                } else {
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({
                        email: user.email
                    }, app.config.secret, {
                        expiresIn: 86400 // seconds in 24 hours
                    });

                    // return the information including the token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your tasty Token!',
                        token: token
                    });
                }
            }
        });
    });

    // middleware to use for all Requests
    
    
    apiRouter.use(function(req, res, next){
       // do logging
        console.log('Somebody just came to our API');

        // Adding more here later

        // check header or URL params or POST params for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if(token){

            // verifies secret and checks exp
            jwt.verify(token, app.config.secret, function(err, decoded){
                if(err){
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to Authenticate Token'
                    });
                } else {
                    // if everything is cool, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {

            // if there is no token
            // return an HTTP res of 403 (access forbidden) and an error messsage
            return res.status(403).send({
                success: false,
                message: 'No Token Provided.'
            });
        }
        // uncomment to bypass Authentication
        // next();
    });


    // accessed at GET http://localhost:1337/api
    apiRouter.get('/',function(req, res){
        res.json({message: 'Hooray! we have an API!'});
    });



    // API routes for /users
    apiRouter.route('/users')
        // create a user (accessed at POST localhost:1337/api/users)
        .post(function(req, res){

            console.log('posting');
            // create a new Instance of a User Model
            var user = new User();

            // set the users infomation
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password;
            if(req.body.userType) user.userType = req.body.userType;
            else user.userType = 'member';

            // save the user and check for errors
            user.save(function(err){
                if(err){
                    if(err.code = 11000)
                        return res.json({success: false, message: 'A user with that user name already exists'});
                    else
                        return res.send(err);
                }
                res.json({message: "User Created! #BOOM"});
            });

        })
        .get(function(req, res){
            // This finds ALL users and shows them
            User.find(function(err, users){
                if(err) res.send(err);

                //return the user
                res.json(users);
            });
        });

    apiRouter.get('/me', function(req, res){
       res.send(req.decoded); 
    });

    apiRouter.route('/users/:user_id')
        .get(function(req, res){
            User.findById(req.params.user_id, function(err, user){
                if(err) res.send(err);
                res.json(user);
            });
        })
        .put(function(req,res){
            User.findById(req.params.user_id, function(err, user){
                if(err) res.send(err);

                if(req.body.firstName) user.firstName = req.body.firstName;
                if(req.body.lastName) user.lastName = req.body.lastName;
                if(req.body.email) user.email = req.body.email;
                if(req.body.password) user.password = req.body.password;
                if(req.body.userType) user.userType = req.body.userType;

                user.save(function(err){
                    if(err) res.send(err);

                    res.json({message: 'User updated!!'});
                });
            });
        })
        .delete(function(req, res){
            if(req.params.userType != 'super'){  
                User.remove({
                    _id: req.params.user_id
                }, function(err, user){
                    if(err) return res.send(err);
                    res.json({message: 'Successfully deleted! #KILL'});
                });
            } else {
                res.json({message: 'YOU CANT DESTOY ME! HA HA HA!!'});
            }
        });


    //REGISTER OUR ROUTES
    app.use('/api', apiRouter);
    
};
