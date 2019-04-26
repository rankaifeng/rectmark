import React, {Component} from 'react';
import MyDrawRect from "../convas";
import {httpPost} from "../../utils/fetchUtils";
import {message} from 'antd';

class DrawRect extends Component {


    onSavePosition = (subPosition) => {

        if (subPosition.length === 0) {
            alert("暂无数据提交！");
            return;
        }
        let data = [];

        for (let i = 0; i < subPosition.length; i++) {
            let item = subPosition[i];
            let position = {
                rows: subPosition.length,
                position: {
                    x1: item.x1,
                    y1: item.y1,
                    x2: item.x2,
                    y2: item.y2,
                    width: item.width,
                    height: item.height
                }
            };

            data.push(position);
        }

        httpPost("devices/" + this.props.location.query.item.id,
            data, function (response) {
                message.success(response.message);
                this.props.history.push("/mark_list");
            })
    };

    render() {

        let imgUrl = this.props.location.query.item.picture;

        return (
            <MyDrawRect

                imgUrl={imgUrl}

                onSavePosition={this.onSavePosition}
            />
        );
    }
}

export default DrawRect;