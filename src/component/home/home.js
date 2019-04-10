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

let datas = [];

class Home extends Component {

    state = {
        rectNumbers: []
    };

    uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
            if (temp.indexOf(array[i]) == -1) {
                temp.push(array[i]);
            }
        }
        return temp;
    }

    showLine = (data) => {
        // newData.push(data[0]);
        // let uniq1 = this.uniq(newData);
        //
        // let item = {
        //     x: uniq1[0].x,
        //     y: uniq1[0].y,
        //     width: uniq1[0].width,
        //     height: uniq1[0].height,
        //     color: uniq1[0].color
        // };
        //
        // datas.push(item);


        this.setState({rectNumbers: data});


        console.log(data[0])
    };

    changeSize = (e) => {
        const {width, height, rectNumbers} = this.state;

        let index = e.currentTarget.index;

        rectNumbers[index - 1].x = e.evt.offsetX - width / 2;
        rectNumbers[index - 1].y = e.evt.offsetY - height / 2;

        console.log(e);
        this.setState({rectNumbers: rectNumbers});
    };

    componentDidMount() {
        let _that = this;
        document.onmousedown = function (ev) {
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
                _that.setState({rectNumbers: newData});

            }

        };

        document.onmousemove = function (ev) {
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
        }
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
                                onDragEnd={this.changeSize}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>

        );
    }
}


export default Home;