import React, {Component} from 'react';
import one from '../../img/one.jpeg';
import two from '../../img/two.jpeg';
import three from '../../img/three.jpeg';
import four from '../../img/four.jpeg';
import five from '../../img/five.jpeg';
import {Button} from 'antd';
import './marklist.css';
import {Pagination} from 'antd';

let imgLists = [{imgUrl: one, id: '1', ip: '192.168.2.1', name: '测试'},
    {imgUrl: two, id: '2', ip: '192.168.2.2', name: '测试'},
    {imgUrl: three, id: '3', ip: '192.168.2.3', name: '测试'},
    {imgUrl: four, id: '4', ip: '192.168.2.4', name: '测试'},
    {imgUrl: five, id: '5', ip: '192.168.2.5', name: '测试'},
    {imgUrl: five, id: '6', ip: '192.168.2.5', name: '测试'},
    {imgUrl: five, id: '7', ip: '192.168.2.5', name: '测试'},
    {imgUrl: five, id: '8', ip: '192.168.2.5', name: '测试'},
    {imgUrl: five, id: '9', ip: '192.168.2.5', name: '测试'},
    {imgUrl: five, id: '10', ip: '192.168.2.5', name: '测试'}];
let chunk = 2;
let result = [];

class MarkList extends Component {

    state = {
        current: 1,
        pageSize: 2,
        imgArray: []
    };

    componentDidMount() {
        this.resize();

        const {current, pageSize} = this.state;

        this.returnDataList(current, pageSize);
    }

    resize = () => {

        for (let i = 0, j = imgLists.length; i < j; i += chunk) {
            result.push(imgLists.slice(i, i + chunk));
        }
    };

    onMarkClick = () => {
        this.props.history.push("/img_mark");
    };
    imgChange = (page, pageSize) => {

        this.returnDataList(page, pageSize);
    };

    returnDataList = (page, pageSize) => {

        let items = [];


        for (let i = 0; i < result[page - 1].length; i++) {
            items.push(result[page - 1][i]);
        }

        this.setState({
            imgArray: items,
            current: page,
            pageSize: pageSize
        });
    };

    render() {
        return (
            <div>
                <div className="content">
                    {this.state.imgArray.map((item, i) => (
                        <div key={i} className={i === 0 ? "content_item" : "item_border content_item"}>
                            <img alt="" src={item.imgUrl}/>
                            <span>{item.id}</span>
                            <span>{item.ip}</span>
                            <span>{item.name}</span>
                            <Button type="primary"
                                    onClick={this.onMarkClick}>标注</Button>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <Pagination
                        onChange={this.imgChange}
                        current={this.state.current}
                        pageSize={this.state.pageSize}
                        total={imgLists.length}/>
                </div>
            </div>
        );
    }
}

export default MarkList;