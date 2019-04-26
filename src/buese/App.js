import React, {Component} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import ImgMark from '../component/imgmark/imgmark';
import MarkList from '../component/marklist/marklist';
import Test from '../component/test';
import 'antd/dist/antd.css';
import '../css/App.css';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Test}/>
                    <Route path="/img_mark" exact component={ImgMark}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
