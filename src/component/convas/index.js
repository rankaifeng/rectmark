import React, { Component } from 'react';
import { Button, message } from 'antd';

let c;
let ctx, img;

let elementWidth = 1180, elementHeight = 800;
let startx,//起始x坐标
    starty,//起始y坐标
    flag,//是否点击鼠标的标志
    x,
    y,
    leftDistance,
    topDistance,
    op = 0,//op操作类型 0 无操作 1 画矩形框 2 拖动矩形框
    scale = 1,
    type = 0;
let layers = [];//图层
let aLayers = [];//图层
let currentR;//当前点击的矩形框
let arc = 0;//op操作类型 0 无操作 1 圆 2 拖动圆
let radii;
let mType;

let reqData = [];
let reqDataItem = {};

class Index extends Component {


    resizeLeft = (rect) => {
        c.style.cursor = "w-resize";
        if (flag && op === 0) {
            op = 3;
        }
        if (flag && op === 3) {
            if (!currentR) {
                currentR = rect
            }
            currentR.x1 = x;
            currentR.width = currentR.x2 - currentR.x1
        }
    };

    resizeTop = (rect) => {
        c.style.cursor = "s-resize";
        if (flag && op === 0) {
            op = 4;
        }
        if (flag && op === 4) {
            if (!currentR) {
                currentR = rect
            }
            currentR.y1 = y;
            currentR.height = currentR.y2 - currentR.y1
        }
    };


    resizeWidth = (rect) => {
        c.style.cursor = "w-resize";
        if (flag && op === 0) {
            op = 5;
        }
        if (flag && op === 5) {
            if (!currentR) {
                currentR = rect
            }
            currentR.x2 = x;
            currentR.width = currentR.x2 - currentR.x1
        }
    };

    resizeHeight = (rect) => {
        c.style.cursor = "s-resize";
        if (flag && op === 0) {
            op = 6;
        }
        if (flag && op === 6) {
            if (!currentR) {
                currentR = rect
            }
            currentR.y2 = y;
            currentR.height = currentR.y2 - currentR.y1
        }
    };

    resizeLT = (rect) => {
        c.style.cursor = "se-resize";
        if (flag && op === 0) {
            op = 7;
        }
        if (flag && op === 7) {
            if (!currentR) {
                currentR = rect
            }
            currentR.x1 = x;
            currentR.y1 = y;
            currentR.height = currentR.y2 - currentR.y1;
            currentR.width = currentR.x2 - currentR.x1;
        }
    };

    resizeWH = (rect) => {
        c.style.cursor = "se-resize";
        if (flag && op === 0) {
            op = 8;
        }
        if (flag && op === 8) {
            if (!currentR) {
                currentR = rect
            }
            currentR.x2 = x;
            currentR.y2 = y;
            currentR.height = currentR.y2 - currentR.y1;
            currentR.width = currentR.x2 - currentR.x1;
        }
    };
    resizeLH = (rect) => {
        c.style.cursor = "ne-resize";
        if (flag && op === 0) {
            op = 9;
        }
        if (flag && op === 9) {
            if (!currentR) {
                currentR = rect
            }
            currentR.x1 = x;
            currentR.y2 = y;
            currentR.height = currentR.y2 - currentR.y1;
            currentR.width = currentR.x2 - currentR.x1;
        }
    };
    resizeWT = (rect) => {
        c.style.cursor = "ne-resize";
        if (flag && op === 0) {
            op = 10;
        }
        if (flag && op === 10) {
            if (!currentR) {
                currentR = rect
            }
            currentR.x2 = x;
            currentR.y1 = y;
            currentR.height = currentR.y2 - currentR.y1;
            currentR.width = currentR.x2 - currentR.x1;
        }
    };

    reshow = (x, y) => {
        let allNotIn = 1;

        if (mType === 'arc') {
            aLayers.forEach(item => {
                ctx.strokeStyle = item.strokeStyle;
                ctx.beginPath();
                ctx.arc(item.x1, item.y1, item.radii, 0, Math.PI * 2); // 第5个参数默认是false-顺时针

                ctx.strokeStyle = item.strokeStyle;

                if (ctx.isPointInPath(x * scale, y * scale)) {
                    this.resizeLT(item);
                    allNotIn = 0;
                }
                ctx.stroke();
            });

            if (flag && allNotIn && arc < 3) {
                arc = 1
            }
        } else {


            layers.forEach(item => {
                ctx.beginPath();
                ctx.rect(item.x1, item.y1, item.width, item.height);

                ctx.strokeStyle = item.strokeStyle;
                if (x >= (item.x1 - 25 / scale)
                    && x <= (item.x1 + 25 / scale)
                    && y <= (item.y2 - 25 / scale) && y >= (item.y1 + 25 / scale)) {
                    this.resizeLeft(item);
                } else if (x >= (item.x2 - 25 / scale)
                    && x <= (item.x2 + 25 / scale)
                    && y <= (item.y2 - 25 / scale) && y >= (item.y1 + 25 / scale)) {
                    this.resizeWidth(item);
                } else if (y >= (item.y1 - 25 / scale)
                    && y <= (item.y1 + 25 / scale)
                    && x <= (item.x2 - 25 / scale) && x >= (item.x1 + 25 / scale)) {
                    this.resizeTop(item);
                } else if (y >= (item.y2 - 25 / scale)
                    && y <= (item.y2 + 25 / scale)
                    && x <= (item.x2 - 25 / scale) && x >= (item.x1 + 25 / scale)) {
                    this.resizeHeight(item);
                } else if (x >= (item.x1 - 25 / scale)
                    && x <= (item.x1 + 25 / scale)
                    && y <= (item.y1 + 25 / scale) && y >= (item.y1 - 25 / scale)) {
                    this.resizeLT(item);
                } else if (x >= (item.x2 - 25 / scale)
                    && x <= (item.x2 + 25 / scale)
                    && y <= (item.y2 + 25 / scale)
                    && y >= (item.y2 - 25 / scale)) {
                    this.resizeWH(item);
                } else if (x >= (item.x1 - 25 / scale)
                    && x <= (item.x1 + 25 / scale)
                    && y <= (item.y2 + 25 / scale) && y >= (item.y2 - 25 / scale)) {
                    this.resizeLH(item);
                } else if (x >= (item.x2 - 25 / scale)
                    && x <= (item.x2 + 25 / scale)
                    && y <= (item.y1 + 25 / scale) && y >= (item.y1 - 25 / scale)) {
                    this.resizeWT(item);
                }
                if (ctx.isPointInPath(x * scale, y * scale)) {
                    this.render1(item);
                    allNotIn = 0;
                }
                ctx.stroke();
            });

            if (flag && allNotIn && op < 3) {
                op = 1
            }
        }
    };
    render1 = (rect) => {
        c.style.cursor = "move";
        if (flag && op === 0) {
            op = 2;
        }
        if (flag && op === 2) {
            if (!currentR) {
                currentR = rect
            }
            currentR.x2 += x - leftDistance - currentR.x1;
            currentR.x1 += x - leftDistance - currentR.x1;
            currentR.y2 += y - topDistance - currentR.y1;
            currentR.y1 += y - topDistance - currentR.y1;
        }
    };
    isPointInRetc = (x, y) => {
        let len = layers.length;
        for (let i = 0; i < len; i++) {
            if (layers[i].x1 < x && x < layers[i].x2 && layers[i].y1 < y && y < layers[i].y2) {
                return layers[i];
            }
        }
    };

    fixPosition = (position) => {
        if (position.x1 > position.x2) {
            let x = position.x1;
            position.x1 = position.x2;
            position.x2 = x;
        }
        if (position.y1 > position.y2) {
            let y = position.y1;
            position.y1 = position.y2;
            position.y2 = y;
        }
        position.width = position.x2 - position.x1;
        position.height = position.y2 - position.y1;
        // if (position.width < 50 || position.height < 50) {
        //     position.width = 60;
        //     position.height = 60;
        //     position.x2 += position.x1 + 60;
        //     position.y2 += position.y1 + 60;
        // }
        return position
    };
    btnUndo = () => {
        layers.pop();
        ctx.clearRect(0, 0, elementWidth, elementHeight);
        this.reshow();
    };
    btnEmpty = () => {
        layers = [];
        ctx.clearRect(0, 0, elementWidth, elementHeight);
        this.reshow();
    };
    mousedown = (e) => {
        startx = (e.pageX - c.offsetLeft + c.parentElement.scrollLeft) / scale;
        starty = (e.pageY - c.offsetTop + c.parentElement.scrollTop) / scale;
        currentR = this.isPointInRetc(startx, starty);
        if (currentR) {
            leftDistance = startx - currentR.x1;
            topDistance = starty - currentR.y1;
        }
        if (mType === 'arc') {
            ctx.strokeStyle = "#ff2ad7";
        } else {
            ctx.strokeStyle = "#0000ff";
            ctx.strokeRect(x, y, 0, 0);
        }
        flag = 1;
    };
    mousemove = (e) => {
        x = (e.pageX - c.offsetLeft + c.parentElement.scrollLeft) / scale;
        y = (e.pageY - c.offsetTop + c.parentElement.scrollTop) / scale;
        ctx.save();
        ctx.setLineDash([5]);
        c.style.cursor = "default";
        if (mType === 'arc') {
            for (let i = 0; i < layers.length; i++) {
                ctx.clearRect(layers[i].x1, layers[i].y1, layers[i].width, layers[i].height);
            }

            radii = Math.sqrt((startx - x) * (startx - x) + (starty - y) * (starty - y));
            if (flag && arc === 1) {
                ctx.beginPath();
                ctx.strokeStyle = "#0000ff";
                ctx.arc(startx, starty, radii, 0, Math.PI * 2); // 第5个参数默认是false-顺时针
                ctx.stroke();
            }
        } else {


            ctx.clearRect(startx, starty, c.width, c.height);




            if (flag && op === 1) {
                ctx.strokeRect(startx, starty, x - startx, y - starty);
            }
        }

        ctx.restore();
        this.reshow(x, y);
    };


    mouseup = (e) => {
        if (mType === 'arc') {
            if (arc === 1) {
                aLayers.push(this.fixPosition({
                    x1: startx,
                    y1: starty,
                    radii: radii,
                    strokeStyle: 'green',
                }))
            } else if (arc >= 3) {
                this.fixPosition(currentR)
            }
        } else {
            if (op === 1) {
                layers.push(this.fixPosition({
                    x1: startx,
                    y1: starty,
                    x2: x,
                    y2: y,
                    strokeStyle: '#0000ff',
                    type: type
                }))
            } else if (op >= 3) {
                this.fixPosition(currentR)
            }
        }
        op = 0;
        arc = 0;
        currentR = null;
        flag = 0;
        this.reshow(x, y);

    };

    componentDidMount() {
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");
        ctx.strokeWidth = 1;
        img = document.createElement('img');
        if (this.props.location.query != null) {
            let item = this.props.location.query;
            img.src = item.item.picture;
        }
        c.style.backgroundImage = "url(" + img.src + ")";
        c.style.border = '1px solid #aeaeae';
        c.width = 700;
        c.height = 500;
        c.style.backgroundSize = `${c.offsetWidth}px ${c.offsetHeight}px`;
    }

    onSavePosition = () => {
        if (layers.length === 0 && aLayers.length === 0) {
            message.warning("暂无数据提交！");
            return;
        }

        for (let i = 0; i < layers.length; i++) {
            let rect = layers[i];

            reqData.push(rect);
        }
        for (let i = 0; i < reqData.length; i++) {

            let mArc = [];

            for (let j = 0; j < aLayers.length; j++) {
                if (aLayers[j].x1 >= reqData[i].x1
                    && aLayers[j].x1 <= reqData[i].x1 + reqData[i].width
                    && aLayers[j].y1 >= reqData[i].y1 && aLayers[j].y1
                    <= reqData[i].y1 + reqData[i].height) {

                    mArc.push(aLayers[j]);
                    // reqDataItem.arc = mArc;
                    reqData[i].arc = mArc;
                }
            }
        }
        reqDataItem.data = reqData;
        console.log(JSON.stringify(reqDataItem));
        // this.props.onSavePosition("rect", layers);
    };


    clickCircle = () => {
        // for (let i = 0; i < layers.length; i++) {
        //     if (startx >= layers[i].x1
        //         && startx <= layers[i].x1 + layers[i].width
        //         && starty >= layers[i].y1 && starty
        //         <= layers[i].y1 + layers[i].height) {
        //         console.log("4")
        //     } else {
        //         return;
        //     }
        // }
        this.changeEvent('arc');
    };

    clickRect = () => {

        this.changeEvent('rect');
    };


    changeEvent = (type) => {
        c.onmousedown = this.mousedown;
        c.onmousemove = this.mousemove;
        c.onmouseup = this.mouseup;
        mType = type;
    };

    render() {

        return (
            <div>
                <canvas id="myCanvas" />
                <div>
                    <Button type="primary"
                        style={{ marginLeft: '10px', display: 'none' }}
                        onClick={this.btnUndo}>撤销</Button>
                    <Button type="primary"
                        style={{ marginLeft: '10px', display: 'none' }}
                        onClick={this.btnEmpty}>清空</Button>


                    <div style={{
                        position: 'absolute', border: '1px solid #dcd8d8',
                        width: '80px',
                        height: '500px',
                        top: 0,
                        left: '700px',
                        textAlign: 'center'
                    }}>
                        <Button type="primary"
                            style={{ marginTop: '10px' }}
                            onClick={this.clickCircle}>圆形</Button>

                        <Button type="primary"
                            style={{ marginTop: '10px' }}
                            onClick={this.clickRect}>矩形</Button>


                        <Button type="primary"
                            style={{ position: 'absolute', left: 7, bottom: 10 }}
                            onClick={this.onSavePosition}>保存</Button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Index;