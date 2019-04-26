import React from 'react';
import {Image} from "react-konva";

class URLImage extends React.Component {
    state = {
        image: null
    };

    componentDidMount() {
        this.loadImage();
    }

    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }

    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }

    loadImage() {
        this.image = new window.Image();
        this.image.src = this.props.src;
        this.image.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.setState({
            image: this.image
        });
    };
    onmousedown=(ev)=>{
        this.props.onmousedown(ev.evt)
    };

    onmousemove=(ev)=>{
        this.props.onmousemove(ev.evt)
    };
    onmouseup=()=>{
        this.props.onmouseup()
    };
    render() {
        return (
            <Image
                onMouseDown={this.onmousedown}
                onMouseMove={this.onmousemove}
                onMouseUp={this.onmouseup}
                name={this.props.name}
                x={this.props.x}
                y={this.props.y}
                image={this.state.image}
                width={700}
                height={500}
            />
        );
    }
}

export default URLImage