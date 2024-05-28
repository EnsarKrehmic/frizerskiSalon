import React from 'react';
import DataList from './DataList';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to My App</h1>
            </header>
            <main>
                <DataList />
            </main>
        </div>
    );
};

export default App;