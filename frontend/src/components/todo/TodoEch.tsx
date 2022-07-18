import './TodoEch.scss'
import {FaPen} from 'react-icons/fa'
import {FaTrashRestore} from 'react-icons/fa'

export const TodoEch = () => {
    return (
        <div>
            <div className="AppMain__EchT AppMain__smallText">
                <div className="EchT1">Description</div>
                <div className="EchT2"><span><FaPen size="11px" className='iconsO' /> Edit</span></div>
                <div className="EchT3"><span><FaTrashRestore size="11px" className='iconsO' /> Delete</span></div>
            </div>
            <div className="AppMain__EchT AppMain__smallText">
                <div className="EchT1">Description</div>
                <div className="EchT2"><span><FaPen size="11px" className='iconsO' /> Edit</span></div>
                <div className="EchT3"><span><FaTrashRestore size="11px" className='iconsO' /> Delete</span></div>
            </div>
            <div className="AppMain__EchT AppMain__smallText">
                <div className="EchT1">Description</div>
                <div className="EchT2"><span><FaPen size="11px" className='iconsO' /> Edit</span></div>
                <div className="EchT3"><span><FaTrashRestore size="11px" className='iconsO' /> Delete</span></div>
            </div>
        </div>
    )
}