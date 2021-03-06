import React, {Component} from 'react';
import MyDrawRect from "../convas/index";
import {Button, message} from 'antd';
import axIos from 'axios'
import DrawArc from "./drawarc";

let rectArray = [];
let arcArray = [];


let rectArray1 = [];
let arcArray1 = [];
let data = {};

let subData = {};
let showData = [];

class DrawRect extends Component {


    state = {
        type: 'other'
    };


    onSavePosition = (type, subPosition) => {

        let that = this;
        if (subPosition.length === 0) {
            message.warn("暂无数据提交！");
            return;
        }

        if (type === "rect") {
            for (let i = 0; i < subPosition.length; i++) {
                let item = subPosition[i];
                let position = {
                    x1: item.x1,
                    y1: item.y1,
                    x2: item.x2,
                    y2: item.y2,
                    width: item.width,
                    height: item.height,
                    type: 'rect'
                };
                rectArray.push(position);
            }
        } else {
            for (let i = 0; i < subPosition.length; i++) {
                let item = subPosition[i];
                let position = {
                    x1: item.x1,
                    y1: item.y1,
                    radius: item.radii,
                    type: 'arc'
                };
                arcArray.push(position);
            }
        }

        data.rectPosition = rectArray;
        data.arcPosition = arcArray;
        data.rows = rectArray.length + arcArray.length;
        if (rectArray.length > 0 && arcArray.length > 0) {
            this.changeData();
        }


        // console.log(data);
        // axIos.put('http://192.168.100.137:3001/devices/'
        //     + this.props.location.query.item.id,
        //     data)
        //     .then(function (response) {
        //         if (response.data.status === "200") {
        //             message.success(response.data.message);
        //             that.props.history.push("/mark_list");
        //         } else {
        //             message.error("连接服务器失败！")
        //         }
        //     })
        //     .catch(function (error) {
        //         message.error(error);
        //     });
    };


    changeData = () => {

        let position = {};
        for (let i = 0; i < rectArray.length; i++) {


            for (let j = 0; j < arcArray.length; j++) {


                if (arcArray[j].x1 >= rectArray[i].x1 &&
                    arcArray[j].x1 <= rectArray[i].x2 &&
                    arcArray[j].y1 >= rectArray[i].y1 &&
                    arcArray[j].y1 <= rectArray[i].y2) {
                    console.log("4")
                    arcArray1.push(arcArray[j]);


                    position.arcs = arcArray1;

                    subData.position = position;
                }
            }

            rectArray1.push(rectArray[i]);

            position.rects = rectArray1;

            showData.push(subData);

            arcArray1 = [];


        }


        console.log(showData);


    };


    clickCircle = () => {

        this.setState({type: 'arc'})
    };

    clickRect = () => {
        this.setState({type: 'rect'})
    };

    render() {

        let item = this.props.location.query;


        let showHtml = "";

        if (this.state.type === "arc") {

            showHtml = <DrawArc
                onSavePosition={this.onSavePosition}
                imgUrl={item.item.picture}/>

        } else if (this.state.type === 'rect') {

            showHtml = <MyDrawRect
                imgUrl={item.item.picture}
                onSavePosition={this.onSavePosition}
            />

        } else {

            showHtml = <img alt='' src={item.item.picture}
                            style={{width: '700px', height: '500px'}}/>
        }

        return (

            <div>

                {showHtml}

                <div style={{
                    position: 'absolute', border: '1px solid #dcd8d8',
                    width: '80px',
                    height: '500px',
                    top: 0,
                    left: '700px',
                    textAlign: 'center'
                }}>
                    <Button type="primary"
                            style={{marginTop: '10px'}}
                            onClick={this.clickCircle}>圆形</Button>

                    <Button type="primary"
                            style={{marginTop: '10px'}}
                            onClick={this.clickRect}>矩形</Button>
                </div>


            </div>

        );
    }
}

export default DrawRect;