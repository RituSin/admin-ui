
import { useContext, memo } from 'react';
import SearchBar from './SearchBar';
import { AdminContext } from '../..';
import classes from './index.module.css';

const Header = props => {
    const {updateUserData} = useContext(AdminContext);

    const deleteSelectedHandler = () => {
        updateUserData({type:'delete'})
    }

    return(<div className={classes['header-container']}>
        <div className='row'>
            <button type='button' onClick={deleteSelectedHandler}> Delete Selected </button>
            <SearchBar/>
        </div>
        <button type='button' className={`whiteBG ${classes.reload}`} onClick={props.reloadHandler}>
            Reload
        </button>
    </div>)
}

export default memo(Header);