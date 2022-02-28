import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import DijkstraVisualizer from "./SearchingAlgorithmVisualizer/DijkstraVisualizer";
import AStarSearch from "./SearchingAlgorithmVisualizer/AStarSearch";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { getInitialGrid } from "./Algorithms/gridMaker";

function App() {
  const grid = getInitialGrid();
  const [state, setState] = useState(grid);
  const setGridFromChild = (data) => {
    setState(data);
  };

  return (
    <Fragment>
      <div className="App">
        <Router>
          <Navbar />
          <div style={{ marginTop: "5rem" }}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/dijkstra"
                element={
                  <DijkstraVisualizer
                    setGridFromChild={setGridFromChild}
                    currentGrid={state}
                  />
                }
              />
              <Route
                path="/astar"
                element={
                  <AStarSearch
                    setGridFromChild={setGridFromChild}
                    currentGrid={state}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
