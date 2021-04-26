import React, { Component } from 'react';
import "../Styles/Board.css";
import Cell from './Cell';

class Board extends Component {
    static defaultProps = {
        rows: 5,
        cols: 5,
        chance: .25
    }

    state = {
        cells: this.handleStart(),
        numMoves: 0,
        hasWon: false,
    }

    handleStart() {
        let cells = []

        for(let x = 0; x < this.props.rows; x++){
            let row = [];

            for(let y = 0; y < this.props.cols; y++){
                let number = Math.floor(Math.random() * (100) + 1);
                let lit = (this.props.chance * 100 >= number ? true : false);
                row.push(lit);
            }
            cells.push(row);
        }

        return cells;
    }

    inBounds = (x, y) =>{
        if(x < 0 || x >= this.props.rows) return false;
        if(y < 0 || y >= this.props.cols) return false;

        return true;
    }

    cellClick = (x, y) => {
        let newCells = this.state.cells.map(row => {
            return row.slice();
        });
        let won = true;
        let moves = this.state.numMoves;

        if(newCells[x][y] === true){
            newCells[x][y] = !newCells[x][y];

            if(this.inBounds(x-1, y)){
                newCells[x-1][y] = !newCells[x-1][y]
            }
            if(this.inBounds(x+1, y)){
                newCells[x+1][y] = !newCells[x+1][y]
            }
            if(this.inBounds(x, y-1)){
                newCells[x][y-1] = !newCells[x][y-1]
            }
            if(this.inBounds(x, y+1)){
                newCells[x][y+1] = !newCells[x][y+1]
            }

            moves++;
        }

        for(let row of newCells){
            for(let col of row){
                if(col){
                    won = false;
                }
            }
        }

        this.setState({
            cells: newCells.map(row => {
                return row.slice();
            }),
            numMoves: moves,
            hasWon: won,  
        });
    }

    render(){
        let boardCells = [];
        let winner = <div className="Board-progress">
                        <h1>Number of moves: {this.state.numMoves}</h1>
                     </div>;

        for(let x = 0; x < this.props.rows; x++){
            let row = [];

            for(let y = 0; y < this.props.cols; y++){
                row.push(<Cell lit={this.state.cells[x][y]} x={x} y={y} cellClick={this.cellClick}/>);
            }

            boardCells.push(<tr>{row}</tr>);
        }

        if(this.state.hasWon){
            winner = <div className="Board-winner">
                        <h1>You've won! Number of moves: {this.state.numMoves}</h1>
                     </div>
        }

        return(
            <div className="Board">
                <h1 className="Board-title">Lights Out!</h1>
                <table className="Board-table">
                    <tbody>{boardCells}</tbody>
                </table>
                {winner}
            </div>
        )
    }
}

export default Board;