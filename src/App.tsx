import React from 'react';
import './App.css';
import {CounterComponent} from "./components/counter";
import {TodoComponent} from "./components/todo";

function App() {
  return (
    <div className="App">
      <CounterComponent />
        <TodoComponent />
    </div>
  );
}

export default App;
