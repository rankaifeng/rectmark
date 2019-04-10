import React, {Component} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import Home from '../component/home/home';
import '../css/App.css';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
