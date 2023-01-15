
import { useRef } from 'react';
import './index.module.css';

const Checkbox = props => {
    const { id, checked } = props;
    const cbxRef = useRef();

    const cbxHandler = () => {
        props.checkboxClickHandler(id, !cbxRef.current.checked);
    }

    return(< >
       <input type="checkbox" id={id} checked={checked} ref={cbxRef}/>
       <label htmlFor={id} onClick={cbxHandler}></label>
    </>)
}

export default Checkbox;