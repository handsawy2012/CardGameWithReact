import React, { Component } from 'react';

const Button = (props) => {
    return(
        <div className="col-md-5">
            <button
                    onClick={props.redraw}
                    disabled={props.redraws === 0}>
                <i className="fa fa-refresh"></i>
            </button>
        </div>
    );
}

export default Button;
