import React, {Component} from 'react';
import one from '../../img/one.jpeg';
import two from '../../img/two.jpeg';
import three from '../../img/three.jpeg';
import four from '../../img/four.jpeg';
import five from '../../img/five.jpeg';
import {Button, Pagination} from 'antd';
import './marklist.css';
import {httpGet} from "../../utils/fetchUtils";

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


class MarkList extends Component {

    state = {
        current: 1,
        pageSize: 1,
        imgArray: [],
        total: 0
    };

    componentDidMount() {

        const {current, pageSize} = this.state;

        this.requestImg(current, pageSize);
    }

    requestImg = (page, per) => {
        let that = this;
        httpGet("devices?page=" + page + "&per=" + per,
            function (response) {
                that.setState({
                    imgArray:
                    response.rows,
                    current: page,
                    pageSize: per, total: response.total
                });
            });
    };

    onMarkClick = (item) => {
        this.props.history.push({pathname: '/img_mark', query: {item: item}});
    };


    imgChange = (page, pageSize) => {

        this.requestImg(page, pageSize);
    };

    render() {
        return (
            <div>
                <div className="content">
                    {this.state.imgArray.map((item, i) => (
                        <div key={i} className={i === 0 ? "content_item" : "item_border content_item"}>
                            <img alt="" src={item.picture}/>
                            <span>{item.id}</span>
                            {/*<span>{item.ip}</span>*/}
                            {/*<span>{item.name}</span>*/}
                            <Button type="primary"
                                    onClick={() => this.onMarkClick(item)}>标注</Button>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <Pagination
                        onChange={this.imgChange}
                        current={this.state.current}
                        pageSize={this.state.pageSize}
                        total={this.state.total}/>
                </div>
            </div>
        );
    }
}

export default MarkList;