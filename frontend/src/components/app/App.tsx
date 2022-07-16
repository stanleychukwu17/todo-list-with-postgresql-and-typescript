import './App.scss';

import {Input} from '../input/Input'
import {TodoEch} from '../todo/TodoEch';

function App() {
    return (
        <div className="AppMain">
            <div className='AppMain__Header'><h1>A Todo List</h1></div>
            <Input />
            <div className="AppMain__EchT">
                <div className="EchT1">Description</div>
                <div className="EchT2">Edit</div>
                <div className="EchT3">Delete</div>
            </div>
            <TodoEch />
        </div>
    );
}

export default App;
