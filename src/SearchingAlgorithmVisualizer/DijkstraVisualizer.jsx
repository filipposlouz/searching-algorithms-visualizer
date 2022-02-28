import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  getInitialGrid,
  getNewGridWithWallToggles,
} from "../Algorithms/gridMaker";

import "./Grid.css";

export default class DijkstraVisualizer extends Component {
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
    this.props.setGridFromChild(newGrid);
  }

  handleMouseEnter(row, col) {
    if (this.state.algorithmActive) return;
    if (!this.state.mousePressed) return;
    const newGrid = getNewGridWithWallToggles(this.state.grid, row, col);
    this.setState({ grid: newGrid });
    this.props.setGridFromChild(newGrid);
  }

  handleMouseUp() {
    this.setState({ mousePressed: false });
    this.props.setGridFromChild(this.state.grid);
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        this.setState({ visitedNodesInOrder: visitedNodesInOrder });
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    this.setState({ algorithmActive: true });
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if (nodesInShortestPathOrder.length === 1) {
      nodesInShortestPathOrder.shift();
    }
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
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
    this.props.setGridFromChild(newGrid);
  }

  render() {
    const { grid, mousePressed } = this.state;

    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
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
}
