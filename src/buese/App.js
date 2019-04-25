import React, {Component} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import ImgMark from '../component/imgmark/imgmark';
import MarkList from '../component/marklist/marklist';
import 'antd/dist/antd.css';
import '../css/App.css';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={MarkList}/>
                    <Route path="/img_mark" exact component={ImgMark}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
