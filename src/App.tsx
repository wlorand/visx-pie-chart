import React from 'react';

// child components
import BrowserSharePieChart from './components/BrowserSharePieChart';

// styles
import './app.css';

function App() {
  return (
    <div className="app">
      <h1 className="app-title">VisX Pie Chart Proto</h1>
      <BrowserSharePieChart width={640} height={480} />
    </div>
  );
}

export default App;
