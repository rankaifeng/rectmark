import React, {Component} from 'react';
import {Button} from "antd";

let c;
let ctx, img;
let elementWidth = 1180, elementHeight = 800;
let radii;
let startx,//起始x坐标
    starty,//起始y坐标
    flag,//是否点击鼠标的标志
    x,
    y,
    leftDistance,
    topDistance,
    arc = 0,//op操作类型 0 无操作 1 画矩形框 2 拖动矩形框
    scale = 1;
let layers = [];//图层
let currentR;//当前点击的矩形框
class DrawArc extends Component {


    componentDidMount() {

        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");
        img = document.createElement('img');
        img.src = this.props.imgUrl;
        c.style.backgroundImage = "url(" + img.src + ")";
        c.style.border = '1px solid #aeaeae';
        c.width = 700;
        c.height = 500;
        c.style.backgroundSize = `${c.offsetWidth}px ${c.offsetHeight}px`;
        c.onmousedown = this.mousedown;
        c.onmousemove = this.mousemove;
        c.onmouseup = this.mouseup;
    }

    mousedown = (e) => {
        startx = (e.pageX - c.offsetLeft + c.parentElement.scrollLeft) / scale;
        starty = (e.pageY - c.offsetTop + c.parentElement.scrollTop) / scale;
        currentR = this.isPointInRetc(startx, starty);
        if (currentR) {
            leftDistance = startx - currentR.x1;
            topDistance = starty - currentR.y1;
        }

        ctx.strokeStyle = "#0000ff";
        flag = 1;
    };

    mousemove = (e) => {
        x = (e.pageX - c.offsetLeft + c.parentElement.scrollLeft) / scale;
        y = (e.pageY - c.offsetTop + c.parentElement.scrollTop) / scale;
        ctx.save();
        ctx.setLineDash([5]);
        c.style.cursor = "default";
        // ctx.clearRect(0, 0, elementWidth, elementHeight);
        radii = Math.sqrt((startx - x) * (startx - x) + (starty - y) * (starty - y));
        if (flag && arc === 1) {
            ctx.beginPath();
            ctx.strokeStyle = "#0000ff";
            ctx.arc(startx, starty, radii, 0, Math.PI * 2); // 第5个参数默认是false-顺时针
            ctx.stroke();
        }
        ctx.restore();
        this.reshow(x, y);
    };
    mouseup = (e) => {
        if (arc === 1) {
            layers.push(this.fixPosition({
                x1: startx,
                y1: starty,
                radii: radii,
                strokeStyle: '#0000ff',
            }))
        } else if (arc >= 3) {
            this.fixPosition(currentR)
        }
        currentR = null;
        flag = 0;
        this.reshow(x, y);
        arc = 0;
    };


    resizeLT = (rect) => {
        c.style.cursor = "move";
        if (flag && arc === 0) {
            arc = 7;
        }
        if (flag && arc === 7) {
            if (!currentR) {
                currentR = rect
            }
            currentR.x1 = x;
            currentR.y1 = y;
            currentR.height = currentR.y2 - currentR.y1;
            currentR.width = currentR.x2 - currentR.x1;
        }
    };


    reshow = (x, y) => {
        let allNotIn = 1;
        layers.forEach(item => {
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
    onSavePosition = () => {
        this.props.onSavePosition("arc", layers);
    };

    render() {
        return (
            <div>
                <canvas id="myCanvas"/>
                <div>
                    <Button type="primary"
                            style={{marginLeft: '10px', display: 'none'}}
                            onClick={this.btnUndo}>撤销</Button>
                    <Button type="primary"
                            style={{marginLeft: '10px', display: 'none'}}
                            onClick={this.btnEmpty}>清空</Button>
                    <Button type="primary"
                            style={{marginLeft: '10px'}}
                            onClick={this.onSavePosition}>保存</Button>
                </div>
            </div>

        );
    }
}

export default DrawArc;
// import React, {Component} from 'react';
// import bgImg from '../../img/bg.jpg';

// let c;
// let ctx, img;
// let startX, startY;
// let scale = 1, flag = false;
// let layers = [];//图层
// let radii;
// let currentR;//当前点击的矩形框
// let op = 0;//op操作类型 0 无操作 1 画矩形框 2 拖动矩形框
// let x, y;
// var p = {};

// class DrawArc extends Component {


//     componentDidMount() {

//         c = document.getElementById("myCanvas");
//         ctx = c.getContext("2d");
//         img = document.createElement('img');
//         // img.src = this.props.imgUrl;
//         img.src = bgImg;
//         c.style.backgroundImage = "url(" + img.src + ")";
//         c.style.border = '1px solid #aeaeae';
//         c.width = 700;
//         c.height = 500;
//         c.style.backgroundSize = `${c.offsetWidth}px ${c.offsetHeight}px`;
//         c.onmousedown = this.mousedown;
//         c.onmousemove = this.mousemove;
//         c.onmouseup = this.mouseup;
//     }

//     mousedown = (e) => {
//         flag = true;
//         ctx.lineWidth = 1;
//         startX = (e.pageX - c.offsetLeft + c.parentElement.scrollLeft) / scale;
//         startY = (e.pageY - c.offsetTop + c.parentElement.scrollTop) / scale;
//     };

//     mousemove = (e) => {
//         x = (e.pageX - c.offsetLeft + c.parentElement.scrollLeft) / scale;
//         y = (e.pageY - c.offsetTop + c.parentElement.scrollTop) / scale;
//         p.x = e.clientX - c.getBoundingClientRect().left;
//         p.y = e.clientY - c.getBoundingClientRect().top;//为了兼容IE
//         ctx.save();
//         ctx.clearRect(0, 0, c.width, c.height);

//         radii = Math.sqrt((startX - x) * (startX - x) + (startY - y) * (startY - y));

//         if (flag) {
//             ctx.beginPath();
//             ctx.strokeStyle = "#0000ff";
//             ctx.arc(startX, startY, radii, 0, Math.PI * 2); // 第5个参数默认是false-顺时针
//             ctx.stroke();
//         }
//         this.reshow(x, y);

//     };
//     fixPosition = (position) => {
//         if (position.x1 > position.x2) {
//             let x = position.x1;
//             position.x1 = position.x2;
//             position.x2 = x;
//         }
//         if (position.y1 > position.y2) {
//             let y = position.y1;
//             position.y1 = position.y2;
//             position.y2 = y;
//         }
//         position.width = position.x2 - position.x1;
//         position.height = position.y2 - position.y1;
//         return position
//     };
//     mouseup = (e) => {

//         flag = false;
//         layers.push(this.fixPosition({
//             x1: startX,
//             y1: startY,
//             radii: radii,
//             strokeStyle: '#0000ff',
//         }));


//         this.reshow(x,y);

//         console.log(layers)
//     };
//     reshow = (x, y) => {
//         layers.forEach(item => {
//             ctx.strokeStyle = item.strokeStyle;
//             ctx.beginPath();
//             ctx.arc(item.x1, item.y1, item.radii, 0, Math.PI * 2); // 第5个参数默认是false-顺时针


//             // if (x >= (item.x2 - 25 / scale)
//             //     && x <= (item.x2 + 25 / scale)
//             //     && y <= (item.y2 - 25 / scale) && y >= (item.y1 + 25 / scale)) {
//             //     this.resizeWidth(item);
//             // } else if (x >= (item.x2 - 25 / scale)
//             //     && x <= (item.x2 + 25 / scale)
//             //     && y <= (item.y2 + 25 / scale)
//             //     && y >= (item.y2 - 25 / scale)) {
//             //     this.resizeWH(item);
//             // } else if (x >= (item.x2 - 25 / scale)
//             //     && x <= (item.x2 + 25 / scale)
//             //     && y <= (item.y1 + 25 / scale) && y >= (item.y1 - 25 / scale)) {
//             //     this.resizeWT(item);
//             // }

//             //求点到圆心的距离，用到了勾股定理
//             console.log()
//             let dis = Math.sqrt((p.x - item.x1)
//                 * (p.x - item.x1) + (p.y - item.y1) * (p.y - item.y1));//Math.sqrt()求平方跟
//             if (dis <= item.radii) {
//                 flag=false;
//                 c.style.cursor = "move";
//             }

//             ctx.stroke();
//         });
//     };


//     resizeWT = (rect) => {
//         c.style.cursor = "ne-resize";
//         if (flag && op === 0) {
//             op = 10;
//         }
//         if (flag && op === 10) {
//             if (!currentR) {
//                 currentR = rect
//             }
//             currentR.x2 = x;
//             currentR.y1 = y;
//             currentR.height = currentR.y2 - currentR.y1;
//             currentR.width = currentR.x2 - currentR.x1;
//         }
//         alert("6")
//     };

//     resizeWH = (rect) => {
//         c.style.cursor = "se-resize";
//         if (flag && op === 0) {
//             op = 8;
//         }
//         if (flag && op === 8) {
//             if (!currentR) {
//                 currentR = rect
//             }
//             currentR.x2 = x;
//             currentR.y2 = y;
//             currentR.height = currentR.y2 - currentR.y1;
//             currentR.width = currentR.x2 - currentR.x1;
//         }
//         alert("5")
//     };

//     resizeWidth = (rect) => {
//         c.style.cursor = "w-resize";
//         if (flag && op === 0) {
//             op = 5;
//         }
//         if (flag && op === 5) {
//             if (!currentR) {
//                 currentR = rect
//             }
//             currentR.x2 = x;
//             currentR.width = currentR.x2 - currentR.x1
//         }
//         alert("4")
//     };

//     render() {
//         return (
//             <canvas id="myCanvas"/>
//         );
//     }
// }

// export default DrawArc;