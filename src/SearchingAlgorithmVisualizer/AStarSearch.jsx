import React, { Component } from "react";
import Node from "./Node/Node";
import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  getInitialGrid,
  getNewGridWithWallToggles,
} from "../Algorithms/gridMaker";

import "./Grid.css";

export default class AStarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.props.currentGrid,
      mousePressed: false,
      algorithmActive: false,
      visitedNodesInOrder: [],
    };
  }

  handleMouseDown(row, col) {
    if (this.state.algorithmActive) return;
    const newGrid = getNewGridWithWallToggles(this.state.grid, row, col);
    this.setState({ grid: newGrid, mousePressed: true });
  }

  handleMouseEnter(row, col) {
    if (this.state.algorithmActive) return;
    if (!this.state.mousePressed) return;
    const newGrid = getNewGridWithWallToggles(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mousePressed: false });
  }

  handleClick() {
    const newGrid = getInitialGrid();
    const visitedNodesInOrder = this.state.visitedNodesInOrder;
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node";
      if (node.row === START_NODE_ROW && node.col === START_NODE_COL) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-start";
      }
      if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-finish";
      }
    }
    this.setState({ grid: newGrid, algorithmActive: false });
  }
  render() {
    const { grid, mousePressed } = this.state;

    return (
      <>
        {/* <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button> */}
        <button onClick={() => this.handleClick()}>Clear Grid</button>
        <div className="grid">
          {grid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const { row, col, isStart, isFinish, isVisited, isWall } =
                    node;
                  return (
                    <Node
                      key={nodeId}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isVisited={isVisited}
                      mousePressed={mousePressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
  update() {
    this.props.setGridFromChild(this.state);
  }
}
