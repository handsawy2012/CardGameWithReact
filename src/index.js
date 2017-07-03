import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Home from './components/Home';
import NumberOfPlayersForm from './components/NumberOfPlayersForm';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom'

ReactDOM.render(
    <Router>
        <div>
            <Route exact={true} path="/" component={NumberOfPlayersForm}/>
            <Route path="/App/:noOfPlayers" component={Home}/>
        </div>
    </Router>, 
    document.getElementById('root'));
registerServiceWorker();
