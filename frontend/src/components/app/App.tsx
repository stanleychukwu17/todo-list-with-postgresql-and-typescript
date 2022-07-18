import './App.scss';
import dog from '../../images/dog.jpg'

import {Input} from '../input/Input'
import {TodoEch} from '../todo/TodoEch'

function App() {
    return (
        <div className="AppMain">
            <div className='AppMain__Header'>
                <div>
                    <div><h1>A Todo List</h1></div>
                    <div className='AppPrf_name'>Stanley Chukwu</div>
                </div>
                <div className='AppPrf_cvr'>
                    <div className='AppPrf_img'><img src={dog} alt="" /></div>
                </div>
            </div>
            <Input />
            <div className="AppMain__EchT">
                <div className="EchT1">Description</div>
                <div className="EchT2">Edit</div>
                <div className="EchT3">Delete</div>
            </div>
            <div className="AppShow__EchT">
                <TodoEch />
            </div>
        </div>
    );
}

export default App;
