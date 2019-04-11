import React, {Component} from 'react';
import {Layer, Rect, Stage} from 'react-konva';

import URLImage from './urlimg';

import bgImg from '../../img/bg.jpg';

let allData = [];

let startX, startY;
let data = {};
let drag = false;

let newData = [];
let scrollX, scrollY;

let isRect = false;


class Home extends Component {

    state = {
        rectNumbers: []
    };

    showLine = (data) => {

        let showDatas = [];

        if (newData.length > 0) {
            for (let i = 0; i < newData.length; i++) {
                showDatas.push(newData[i]);
            }

        }

        showDatas.push(data[0]);

        this.setState({rectNumbers: showDatas});


    };

    changeSize = (item, index, e) => {
        isRect = true;
        newData[index].x = e.target.attrs.x;
        newData[index].y = e.target.attrs.y;
    };

    componentDidMount() {
        let _that = this;
        document.onmousedown = function (ev) {
            if (isRect) {
                return;
            }
            let e = ev || window.event;
            scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            startX = e.pageX || e.clientX + scrollX;
            startY = e.pageY || e.clientY + scrollY;
            drag = true;
        };

        document.onmouseup = function (ev) {
            drag = false;
            if (allData.length > 0) {
                let item = {
                    x: allData[0].x,
                    y: allData[0].y,
                    width: allData[0].width,
                    height: allData[0].height,
                    color: allData[0].color
                };
                newData.push(item);
            }
        };

        document.onmousemove = function (ev) {
            if (isRect) {
                return;
            }
            allData = [];
            if (drag) {
                let width = (ev.pageX - scrollX) - startX;
                let height = (ev.pageY - scrollY) - startY;
                data.x = startX;
                data.y = startY;
                data.width = width;
                data.height = height;
                data.color = "rgba(255,255,255,0.3)";
                allData.push(data);
                _that.showLine(allData);
            }
        };
        //监听esc事件 取消
        document.onkeydown = function (event) {
            let e = event || window.event;
            if (e && e.keyCode === 27) {
                allData = [];
                newData = [];
                isRect = false;
                _that.setState({rectNumbers: []})
            }
        };
    }

    static onmouseover() {
        isRect = true;
    }

    static onmouseout() {
        isRect = false;
    }


    render() {
        return (
            <div style={{height: '100%'}}>
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}>
                    <Layer>
                        <URLImage
                            x={10}
                            y={10}
                            src={bgImg}/>
                        {this.state.rectNumbers.map((item, i) => (

                            <Rect
                                key={i}
                                x={item.x}
                                y={item.y}
                                draggable
                                stroke='blue'
                                strokeWidth={1}
                                width={item.width}
                                height={item.height}
                                fill={item.color}
                                onmouseover={Home.onmouseover}
                                onmouseout={Home.onmouseout}
                                onDragEnd={(e) => this.changeSize(item, i, e)}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>

        );
    }
}


export default Home;