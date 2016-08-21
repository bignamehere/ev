module.exports = {
    'port' : process.env.PORT || 1337,
    'authTimeout' : 120, // in minutes, 120 = 2 hours
    'database' : 'mongodb://localhost:27017/db_ev', // local
    'webStart' : '/public/web/views/index.html',
    'adminStart' : '/views/admin',
    'memberStart' : '/member/dashboard',
    'staticLocation' : '/public/web/',
    'secret' : 'porkandbeansporksandbeans'
};