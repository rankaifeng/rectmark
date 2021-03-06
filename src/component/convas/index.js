import React, { Component } from 'react';
import { Button, message } from 'antd';
import axIos from 'axios'
import { HTTP_URL } from '../../utils/config';
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
    type = 0,
    layers = [],//图层
    aLayers = [],//图层
    currentR;//当前点击的矩形框
var url = ''; // canvas图片的二进制格式转为dataURL格式
let reqData = [];
let arcArray = [];
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
        // c.style.cursor = "move";
        // if (flag && op === 0) {
        //     op = 7;
        // }
        // if (flag && op === 7) {
        //     if (!currentR) {
        //         currentR = rect
        //     }
        //     currentR.x1 = x;
        //     currentR.y1 = y;
        //     currentR.height = currentR.y2 - currentR.y1;
        //     currentR.width = currentR.x2 - currentR.x1;
        // }
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

        layers.forEach(item => {
            ctx.beginPath();
            ctx.rect(item.x1, item.y1, item.width, item.height);
            ctx.strokeStyle = item.strokeStyle;
            if (x >= (item.x1 - 10 / scale)
                && x <= (item.x1 + 10 / scale)
                && y <= (item.y2 - 10 / scale) && y >= (item.y1 + 10 / scale)) {
                this.resizeLeft(item);
            } else if (x >= (item.x2 - 10 / scale)
                && x <= (item.x2 + 10 / scale)
                && y <= (item.y2 - 10 / scale) && y >= (item.y1 + 10 / scale)) {
                this.resizeWidth(item);
            } else if (y >= (item.y1 - 10 / scale)
                && y <= (item.y1 + 10 / scale)
                && x <= (item.x2 - 10 / scale) && x >= (item.x1 + 10 / scale)) {
                this.resizeTop(item);
            } else if (y >= (item.y2 - 10 / scale)
                && y <= (item.y2 + 10 / scale)
                && x <= (item.x2 - 10 / scale) && x >= (item.x1 + 10 / scale)) {
                this.resizeHeight(item);
            } else if (x >= (item.x1 - 10 / scale)
                && x <= (item.x1 + 10 / scale)
                && y <= (item.y1 + 10 / scale) && y >= (item.y1 - 10 / scale)) {
                this.resizeLT(item);
            } else if (x >= (item.x2 - 10 / scale)
                && x <= (item.x2 + 10 / scale)
                && y <= (item.y2 + 10 / scale)
                && y >= (item.y2 - 10 / scale)) {
                this.resizeWH(item);
            } else if (x >= (item.x1 - 10 / scale)
                && x <= (item.x1 + 25 / scale)
                && y <= (item.y2 + 10 / scale) && y >= (item.y2 - 10 / scale)) {
                this.resizeLH(item);
            } else if (x >= (item.x2 - 10 / scale)
                && x <= (item.x2 + 10 / scale)
                && y <= (item.y1 + 10 / scale) && y >= (item.y1 - 10 / scale)) {
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

    };

    findMaxNumber(layers) {
        let maxItem = layers[layers.length - 1];
        return maxItem.width > maxItem.height
            ? maxItem.width : maxItem.height;
    }

    rectCircle = (layers) => {
        arcArray = [];
        for (let i = 0; i < layers.length; i++) {
            let aLayers = [];
            let mWidth = layers[i].width;
            let mHeight = layers[i].height;
            if (mWidth >= mHeight) {
                let oneX = mWidth / 3 / 2;
                let cirY = mHeight / 2;
                for (let j = 1; j < 6; j += 2) {
                    let cirItem1 = {
                        x1: parseInt(layers[i].x1 + oneX * j),
                        y1: parseInt(cirY + layers[i].y1),
                        radius: parseInt(cirY - 3),
                        strokeStyle: "#fffeee"
                    }
                    aLayers.push(cirItem1)
                }
                aLayers.forEach(item => {
                    ctx.strokeStyle = "#9B30FF";
                    ctx.beginPath();
                    ctx.arc(item.x1, item.y1, item.radius, 0, Math.PI * 2);
                    ctx.stroke();
                });
            } else {
                let oneY = mHeight / 3 / 2;
                let cirX = mWidth / 2;
                for (let k = 1; k < 6; k += 2) {
                    let cirItem1 = {
                        x1: parseInt(layers[i].x1 + cirX),
                        y1: parseInt(k * oneY + layers[i].y1),
                        radius: parseInt(oneY - 3),
                        strokeStyle: "#fffeee"
                    }
                    aLayers.push(cirItem1)
                }
            }
            aLayers.forEach(item => {
                ctx.strokeStyle = "#9B30FF";
                ctx.beginPath();
                ctx.arc(item.x1, item.y1, item.radius, 0, Math.PI * 2);
                ctx.stroke();
                arcArray.push(item);
            });
        }
    }
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

        layers = [];
        aLayers = [];

        ctx.clearRect(0, 0, c.width, c.height);

        url = "";
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

        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(x, y, 0, 0);

        flag = 1;
    };
    mousemove = (e) => {
        x = (e.pageX - c.offsetLeft + c.parentElement.scrollLeft) / scale;
        y = (e.pageY - c.offsetTop + c.parentElement.scrollTop) / scale;
        if (startx == null || starty == null) {
            return;
        }
        ctx.save();
        // ctx.setLineDash([5]);
        c.style.cursor = "default";
        ctx.clearRect(0, 0, c.width, c.height);
        this.loadImage();
        if (flag && op === 1) {
            ctx.strokeRect(startx, starty, x - startx, y - starty);
        }
        ctx.restore();
        this.reshow(x, y);
    };


    mouseup = (e) => {
        if (op === 1) {
            layers.push(this.fixPosition({
                x1: startx,
                y1: starty,
                x2: x,
                y2: y,
                strokeStyle: '#FF0000',
                type: type
            }))
        } else if (op >= 3) {
            this.fixPosition(currentR)
        }
        ctx.clearRect(0, 0, c.width, c.height);
        this.rectCircle(layers);
        op = 0;
        currentR = null;
        flag = 0;
        ctx.save();
        this.reshow(x, y);
        url = c.toDataURL();
    };

    componentDidMount() {
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");
        img = document.createElement('img');
        if (this.props.location.query != null) {
            let item = this.props.location.query;
            img.src = item.item.picture;
        }
        c.style.backgroundImage = "url(" + img.src + ")";
        c.style.border = '1px solid #aeaeae';
        img.onload = function (param) { }
        c.width = img.width;
        c.height = img.height;
        c.style.backgroundSize = `${c.offsetWidth}px ${c.offsetHeight}px`;
    }
    loadImage() {
        var img = new Image();
        img.src = url;
        ctx.drawImage(img, 0, 0, c.width, c.height);
    }
    onSavePosition = () => {
        if (layers.length === 0 && aLayers.length === 0) {
            message.warning("暂无数据提交！");
            return;
        }

        for (let i = 0; i < layers.length; i++) {
            let rect = layers[i];

            let item = {
                x1: rect.x1,
                y1: rect.y1,
                x2: rect.x2,
                y2: rect.y2,
                width: rect.width,
                height: rect.height
            }
            reqData.push(item);
        }
        for (let i = 0; i < reqData.length; i++) {


            let mArc = [];

            for (let j = 0; j < arcArray.length; j++) {
                if (arcArray[j].x1 >= reqData[i].x1
                    && arcArray[j].x1 <= reqData[i].x1 + reqData[i].width
                    && arcArray[j].y1 >= reqData[i].y1 && arcArray[j].y1
                    <= reqData[i].y1 + reqData[i].height) {
                    let arc = arcArray[j];
                    let arcItem = {
                        centerX: arc.x1,
                        centerY: arc.y1,
                        radius: arc.radius
                    }

                    mArc.push(arcItem);
                    // reqDataItem.arc = mArc;
                    reqData[i].arc = mArc;
                }
            }
        }
        // reqDataItem.data = reqData;
        console.log(JSON.stringify(reqData));
        this.submitData();
    };


    submitData = () => {
        let that = this;
        axIos.put(HTTP_URL + "device/"
            + this.props.location.query.item.id,
            { "position": reqData })
            .then(function (response) {
                if (response.data.status === "200") {
                    message.success(response.data.message);
                    layers = [];
                    aLayers = [];
                    reqData = [];
                    arcArray = [];
                    url = "";
                    ctx.clearRect(0, 0, c.width, c.height);
                    that.props.history.push("/mark_list");
                } else {
                    message.error("连接服务器失败！")
                }
            })
            .catch(function (error) {
                message.error(error);
            });
    };



    clickRect = () => {
        c.onmousedown = this.mousedown;
        c.onmousemove = this.mousemove;
        c.onmouseup = this.mouseup;
    };

    render() {
        return (
            <div style={{ width: 700, height: 500 }} id="conent">
                <canvas id="myCanvas" />
                <div>
                    <Button type="primary"
                        style={{ marginLeft: '10px', display: 'none' }}
                        onClick={this.btnUndo}>撤销</Button>
                    <Button type="primary"
                        style={{ marginLeft: '10px', display: 'none' }}
                        onClick={this.btnEmpty}>清空</Button>


                    <div style={{
                        position: 'fixed',
                        top: 10,
                        right: 10,
                    }}>
                        <Button type="primary"
                            style={{ marginTop: '10px', marginLeft: '10px' }}
                            onClick={this.clickRect}>矩形</Button>

                        <Button type="primary"
                            style={{ marginTop: '10px', marginLeft: '10px' }}
                            onClick={this.btnUndo}>撤销</Button>

                        <Button type="primary"
                            style={{ marginLeft: '10px' }}
                            // style={{ position: 'absolute', left: 7, bottom: 10 }}
                            onClick={this.onSavePosition}>保存</Button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Index;