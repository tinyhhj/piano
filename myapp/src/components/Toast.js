import React from 'react';
import './Toast.css';
export default class Toast extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show : false,
            type : '',
            message : '',
        }
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        toast.push(this);
    }

    static defaultValue = {
        style: {
            backgroundColor: 'green',
            paddingBottom: '18px',
            paddingTop: '18px',
            display : 'none',
            opacity : '0',
            left : '0px',
            top : '-50px',
            position: 'fixed',
            width : '100%',
            textAlign: 'center',
            color : 'white',
            zIndex : '10000',
        }
    }

    componentDidUpdate() {
        if(this.state.show ) {
            // $(ReactDOM.findDOMNode(this)).animate({top: '0px' , opacity: '1'});
            // setTimeout(this.hide , 3000);
        }
    }

    show(type, message) {
        this.setState({show : true , type : type , message: message});
    }

    hide() {
        // $(ReactDOM.findDOMNode(this)).animate({top: '-60px' , opacity:'0'});
        // setTimeout(()=>this.setState({show : false , type : '' , message: '' }) , 3000);
    }


    render() {
        let {style: style} = Toast.defaultValue;
        const {type ,
              show ,
                message,} = this.state;
        const motion = show ? 'slidedown' : 'slideup';
        if( show ) { style = {...style , display: 'block'}}
        if( type === 'warning' ) { style.backgroundColor = 'red'}

        return <div id={'toast-box'} style={style} className={motion}>
            <span >{message}</span>
        </div>;
    }

}

const toast = [];
export {toast}
