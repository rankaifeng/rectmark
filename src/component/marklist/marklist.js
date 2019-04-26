import React, {Component} from 'react';
import {Button, Pagination} from 'antd';
import './marklist.css';
import {httpGet} from "../../utils/fetchUtils";


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
        this.props.history.push({pathname: '/draw_rect', query: {item: item}});
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