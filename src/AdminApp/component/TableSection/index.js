
import { useContext, useEffect, useState, useCallback, memo } from 'react';
import { AdminContext } from '../..';
import Table from './templates/Table';
import classes from './index.module.css';

const TableSection = props => {
    const {dataPerPage = 10} = props;
    const {page, data, updateUserData, checkedCbxs} = useContext(AdminContext);
    const getPageData = () => data.slice(dataPerPage*(page-1),page*dataPerPage);
    const [users, setUsers] = useState(getPageData() || []);

    useEffect(() => {
        setUsers(getPageData());
        updateUserData({type:'checked-checkboxes', payload: []});
    }, [page, data])

    const checkboxHandler = useCallback(
        (id, val) => {
            let modifiedData = users;
            let cbxChecked = [...checkedCbxs]
          
            if(id === 'all') {
                modifiedData = users.map(item =>  ({...item, checked: val})); 
                cbxChecked = val ? users.map(item => item.id): [];
            }
            else {
                modifiedData = users.map(item => item.id === id ? 
                {...item, checked: !item.checked} : item); 
                if(val) 
                    cbxChecked.push(id)
                else {
                    const index = cbxChecked.indexOf(id);
                    if (index > -1) { 
                        cbxChecked.splice(index,1);
                    }
                }
                    
            }
            updateUserData({type:'checked-checkboxes', payload: cbxChecked})
            setUsers(modifiedData);
        },
      [checkedCbxs,users],
    )
    

    const deleteHandler = useCallback((e) => {
        const id =  getId(e);
        updateUserData({type: 'delete', payload:[id]});
    },[])

    const editHandler = useCallback((e) => {
        const id = getId(e);
        const modifiedData = users.map(item => item.id === id ? {...item, disabled: !item.disabled} : {...item, disabled: true})
        setUsers(modifiedData);
    },[users])

    const fieldEditHandler = useCallback((e) => {
        const { name, value } = e.target;
        const id = getId(e);
        const modifiedData = users.map(item => item.id === id ? {...item, [name]: value} : item);
        setUsers(modifiedData);
    },[users])

    const onBlurHandler = (e) => {
        const id = getId(e);
        console.log(id)
        const user = users.find(item => item.id === id);
        updateUserData({type: 'edit-data', payload:user});
    }

    const getId = (e) => e.target.closest('li').id;


    return(<div className={classes['table-container']}>
        {   <Table 
                checkboxHandler={checkboxHandler} 
                users={users} 
                deleteHandler={deleteHandler} 
                editHandler={editHandler} 
                fieldEditHandler={fieldEditHandler}
                onBlurHandler={onBlurHandler}/>
        }
     </div>)
}

export default memo(TableSection);