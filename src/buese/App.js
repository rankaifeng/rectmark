import React, {Component} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import MarkList from '../component/marklist/marklist';
import DrawRect from '../component/rect/drawrect';
import 'antd/dist/antd.css';
import '../css/App.css';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={MarkList}/>
                    <Route path="/mark_list" exact component={MarkList}/>
                    <Route path="/draw_rect" exact component={DrawRect}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
