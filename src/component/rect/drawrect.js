import React, {Component} from 'react';
import MyDrawRect from "../convas";
import {message} from 'antd';
import axIos from 'axios'

class DrawRect extends Component {


    onSavePosition = (subPosition) => {

        let that = this;
        if (subPosition.length === 0) {
            message.warn("暂无数据提交！");
            return;
        }
        let data = {};

        let arrayData = [];
        for (let i = 0; i < subPosition.length; i++) {

            let item = subPosition[i];

            let position = {

                x1: item.x1,
                y1: item.y1,
                x2: item.x2,
                y2: item.y2,
                width: item.width,
                height: item.height

            };

            arrayData.push(position);
        }

        data.position = arrayData;
        data.rows = arrayData.length;

        axIos.put('http://192.168.100.137:3001/devices/'
            + this.props.location.query.item.id,
            data)
            .then(function (response) {
                if (response.data.status === "200") {
                    message.success(response.data.message);
                    that.props.history.push("/mark_list");
                } else {
                    message.error("连接服务器失败！")
                }
            })
            .catch(function (error) {
                message.error(error);
            });
    };

    render() {

        let imgUrl = this.props.location.query.item.picture;

        return (
            <MyDrawRect

                imgUrl="https://raw.githubusercontent.com/rankaifeng/rectmark/master/bg.jpg"

                onSavePosition={this.onSavePosition}
            />
        );
    }
}

export default DrawRect;