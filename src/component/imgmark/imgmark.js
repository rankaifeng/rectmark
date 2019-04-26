import React, {Component} from 'react';
import {Layer, Rect, Stage} from 'react-konva';

import URLImage from './urlimg';
import {Button} from 'antd';
import TransformerComponent from './transformer';
import imgBg from '../../img/bg.jpg'

let allData = [];

let startX, startY;
let data = {};
let drag = false;

let newData = [];
let scrollX, scrollY;

let isRect = false;


class ImgMark extends Component {

    state = {
        rectNumbers: [],
        selectedShapeName: ''
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

        console.log("yuan" + JSON.stringify(this.state.rectNumbers));

        newData[index].x = e.target.attrs.x;
        newData[index].y = e.target.attrs.y;

        console.log("x" + JSON.stringify(newData));
    };


    componentDidMount() {
        let _that = this;


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
    onmousedown=(ev)=>{
        allData = [];

        if (isRect) {
            return;
        }
        console.log(isRect)
        let e = ev || window.event;
        startX = e.pageX
        startY = e.pageY;
        drag = true;
    };

    onmousemove=(ev)=>{
        if (isRect) {
            return;
        }
        if (drag) {
            let width = ev.pageX  - startX;
            let height = ev.pageY - startY;
            data.x = startX;
            data.y = startY;
            data.width = width;
            data.height = height;
            data.color = "rgba(255,255,255,0.3)";
            allData.push(data);
            this.showLine(allData);
        }
    };
    onmouseup=()=>{
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
    onmouseout = () => {
        isRect = false;
    };

    handleStageMouseDown = e => {
        if (e.target === e.target.getStage()) {
            this.setState({
                selectedName: ''
            });
            return;
        }
        const clickedOnTransformer =
            e.target.getParent().className === 'Transformer';
        if (clickedOnTransformer) {
            return;
        }

        const name = e.target.name();

        this.setState({
            selectedName: name
        })
    };


    onTransFormend = () => {
        isRect = false;
        console.log("end")
    };

    savePosition = () => {

        const {rectNumbers} = this.state;
        console.log(JSON.stringify(rectNumbers));
        let submitList = [];
        if (rectNumbers.length === 0) {
            alert("暂无数据提交！");
        } else {
            for (let i = 0; i < rectNumbers.length; i++) {
                let rect = rectNumbers[i];
                let mX = (rect.x) - (rect.width / 2);
                let mY = (rect.y) - (rect.height / 2);

                let item = {
                    x: mX,
                    y: mY,
                    width: rect.width,
                    height: rect.height
                };
                submitList.push(item);
            }

            console.log(submitList);
        }

    };

    rectClick = () => {
        isRect = true;
    };

    render() {
        // let item1 = this.props.location.query.item;
        // let imgUrl = item1.imgUrl;
        return (
            <div style={{
                width: '100%', height: '500px', display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                padding: '10px'
            }}>
                <Stage
                    name="rect"
                    onMouseDown={this.handleStageMouseDown}
                    width={window.innerWidth}
                    height={window.innerHeight}>
                    <Layer>
                        <URLImage
                            onmousedown={this.onmousedown}
                            onmousemove={this.onmousemove}
                            onmouseup={this.onmouseup}
                            x={10}
                            y={10}

                            src={imgBg}/>
                        {this.state.rectNumbers.map((item, i) => (

                            <Rect
                                key={i}
                                name={"rect" + i}
                                x={item.x}
                                y={item.y}
                                draggable
                                stroke='blue'
                                onClick={this.rectClick}
                                strokeWidth={0.5}
                                width={item.width}
                                height={item.height}
                                fill={item.color}
                                ontransform={this.onTransformStart}
                                ontransformend={this.onTransFormend}
                                onmouseout={this.onmouseout}
                                onDragEnd={(e) => this.changeSize(item, i, e)}
                            />
                        ))}
                        <TransformerComponent
                            selectedName={this.state.selectedName}/>
                    </Layer>
                </Stage>
                <Button type="primary" onClick={this.savePosition}>保存</Button>
            </div>

        );
    }
}


export default ImgMark;