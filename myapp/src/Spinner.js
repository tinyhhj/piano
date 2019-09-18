import React from 'react';
import {v4 } from 'Components';

export default class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            style : {
                width: "100%",
                height: "100%",
                top: "0px",
                left: "0px",
                position: "fixed",
                display: "block",
                opacity: "0.7",
                backgroundColor: "#fff",
                zIndex: "99",
                textAlign: "center",
            },
            requestId : [],
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        spinner.add(this);
    }
    // static getDerivedStateFromProps( nextProps , prevState ) {
    //     const pShow = prevState.show;
    //     const nShow = nextProps.show;
    //     if( pShow === nShow ) return null;
    //     return {...prevState , show: nShow};
    // }

    show() {
        const id = v4();
        const {requestId} = this.state;

        const nRequestId = requestId.slice();

        nRequestId.push(id);

        this.setState({ requestId : nRequestId , show : true})
    }

    hide(id) {
        const {requestId} = this.state;
        const nRequestId = requestId.slice();

        nRequestId.splice(0, 1);

        if( nRequestId.length ) {
            this.setState({requestId : nRequestId , show : true });
        } else {
            this.setState({ requestId : nRequestId , show : false})
        }
    }
    render() {
        const style = { ...this.state.style , ...this.props.style}
        const { requestId} = this.state;
        const display = requestId.length ? 'block' :'none';
        const div = <div  className="mdl-spinner mdl-js-spinner is-active"
                          style={{  position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    zIndex: "100",
                                    }}>
                    </div>;
        componentHandler.upgradeDom();
        return (
            <div style={{...style ,display : display}}>
                <div >
                    {div}
                </div>
            </div>
        )
    }
}

const spinner = new Set();
export {spinner};