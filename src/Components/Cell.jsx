import React, { Component } from 'react';
import "../Styles/Cell.css";

class Cell extends Component {

    handleCellClick = (evt) => {
        this.props.cellClick(this.props.x, this.props.y);
    }

    render(){
        const { lit } = this.props;
        return(
            <td 
                className={(lit ? "Cell-lit" : "Cell")}
                onClick={this.handleCellClick}
            >
            </td>
        )
    }
}

export default Cell;