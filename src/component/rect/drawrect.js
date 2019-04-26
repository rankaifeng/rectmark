import React, {Component} from 'react';
import MyDrawRect from "../convas";

class DrawRect extends Component {


    onSavePosition = (subPosition) => {

        if (subPosition.length === 0) {
            alert("暂无数据提交！");
            return;
        }
        console.log(subPosition);
    };

    render() {
        return (
            <MyDrawRect
                onSavePosition={this.onSavePosition}
            />
        );
    }
}

export default DrawRect;