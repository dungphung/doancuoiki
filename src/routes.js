var React = require('react');
var ReactRouter = require('react-router');

var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var useRouterHistory = ReactRouter.useRouterHistory;
var createHashHistory = require('react-router/node_modules/history').createHashHistory;

var appHistory = useRouterHistory(createHashHistory) ({
    queryKey: false
});

var NavBar = require('./js/components/NavBar/NavBar');
var SignUp = require('./js/components/SignUp/SignUp');
var HomeLogin = require('./js/components/Home/HomeLogin');
var Login = require('./js/components/Login/Login');
var MyJourney = require('./js/components/MyJourney/MyJourney');

var Routes = (
    <Router history={appHistory} >
            <Route path="/" component={NavBar}>
                <Route path="signup" component={SignUp} />
                <Route path="home" component={HomeLogin} />
                <Route path="login" component={Login} />
                <Route path="MyJourney" component={MyJourney} />
            </Route>
    </Router>
);

module.exports = Routes;
