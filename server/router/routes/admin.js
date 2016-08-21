// get an instance of the router
var adminRouter = express.Router();

// log all middleware requests that are made
adminRouter.use(function(req, res, next){
    // log each request to the console
    console.log(req.method, req.url);
    
    // continue do what we were doing and go to the route
    next();
});


// admin main page. the dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, res){
    res.send('I am the dashboard');
});

// users page (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res){
    res.send('I show all the Users!');
});

adminRouter.param('name', function(req, res, next, name){
    // do validation here
    var temp = name;
    if(temp == 'shit'){
        console.log('naughty!');
        temp = 'poo';
    }
    name = temp;
    
    // log validation
    console.log('validating name: '+ name);
    
    // once validatied, save new item in req
    req.name = name;
    // go to the next method
    next();
});

adminRouter.get('/hello/:name', function(req, res){
    res.send('hello '+ req.name + '!');
});

// posts page (http://localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res){
    res.send('I show all the posts!');
});