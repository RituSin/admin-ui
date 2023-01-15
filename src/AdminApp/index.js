
import { useReducer, createContext } from 'react';
import Footer from './component/Footer';
import Header from './component/Header';
import TableSection from './component/TableSection';
import { paginationrReducer, userDataReducer } from './reducer';
import classes from './index.module.css';

export const AdminContext = createContext();

const AdminApp = props => {
    const {data = [], dataPerPage = 10} = props;
    const [userData, dispatchUserData] = useReducer(userDataReducer, {allData: data, data:data, totalPages: Math.ceil(data.length/dataPerPage), checkedCbxs: []})
    const [paginatedData, dispatchPaginateData] = useReducer(paginationrReducer, {page:1, startPageNum: 1, endPageNum: userData.totalPages < 3 ? userData.totalPages : 3})

    return(<div className={classes.container}>
        <AdminContext.Provider value={{updateUserData: dispatchUserData, updatePage: dispatchPaginateData, ...userData, ...paginatedData}}>
            <Header reloadHandler={props.reloadHandler}/>
            <TableSection/>
            <Footer />  
        </AdminContext.Provider>
    </div>)
}

export default AdminApp;