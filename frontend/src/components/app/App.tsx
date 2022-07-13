import './App.scss';

import {Input} from '../input/Input'
import { TodoEch } from '../todo/TodoEch';



function App() {
    return (
        <div className="AppMain">
            <div><h2>A Todo List</h2></div>
            <Input />
            <TodoEch />
        </div>
    );
}

export default App;
