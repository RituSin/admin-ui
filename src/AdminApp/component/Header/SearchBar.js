
import { useContext, useRef } from 'react';
import { AdminContext } from '../..';
import classes from './index.module.css';

const SearchBar = () => {
    const searchRef = useRef();
    const {updateUserData} = useContext(AdminContext);

    const searchHandler = (e) => {
        updateUserData({type:'search', payload:(e.target.value || '').toLowerCase()});
    }

    return(<div className={classes['search-bar']}>
       <input type="search" ref={searchRef} placeholder='Search by name, email or role' onChange={searchHandler}/>
       {!(searchRef.current?.value) && <span><i className="fa fa-search" aria-hidden="true"></i></span>}
    </div>)
}

export default SearchBar;