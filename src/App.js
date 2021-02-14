import './App.css';
import Layout from './components/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddNewProd from './components/TaskBar/Add/AddNewProd';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Layout} />
                    <Route path="/addnewProd" exact component={AddNewProd} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
