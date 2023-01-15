import { unCheckAllCbxBtn } from "./constant";

export const paginationrReducer = (state, action) => {
    const {type, payload = ''} = action;
    unCheckAllCbxBtn();
    switch(type) {
        case 'next': return {...state, page: state.page+1,  startPageNum: state.startPageNum + 1, endPageNum: state.endPageNum + 1}
        case 'prev': return {...state, page: state.page-1, startPageNum: state.startPageNum - 1, endPageNum: state.endPageNum - 1}
        case 'start': return {...state, page: 1, startPageNum: 1, endPageNum: payload < 3 ? payload : 3}
        case 'end': return {...state, page: payload, startPageNum: payload - 2, endPageNum: payload}
        case 'page': return {...state, page: payload}
        case 'totalPagesChange': return {...state, startPageNum: payload > 0 ? 1 : 0, endPageNum: payload < 4 ? payload: 3}
            
        default: return state;
    }
}

export const userDataReducer = (state, action) => {
    const {type, payload = ''} = action;

    switch(type) {
        case 'updateData': return {...state, allData: payload, data: payload,  totalPages: Math.ceil(payload.length/10)}
        case 'delete': {
            unCheckAllCbxBtn();
            let ids = state.checkedCbxs;
            if(!!payload) ids = payload;
            
            const allData = [...state.allData];
            const data = [...state.data];
            ids.forEach(id => {
                const index = allData.findIndex(item => item.id === id);
                if (index > -1) { 
                    allData.splice(index,1);
                }

                const indexData = data.findIndex(item => item.id === id);
                if (indexData > -1) { 
                    data.splice(index,1);
                }
            });

            return {...state, allData: allData, data: data, totalPages: Math.ceil(data.length/10)}
        }
        case 'search': {
            unCheckAllCbxBtn();
            const modifiedData = state.allData.filter(item => (item.name.toLowerCase()).includes(payload) || (item.role.toLowerCase()).includes(payload) || (item.email.toLowerCase()).includes(payload));
            return {...state, data: modifiedData, totalPages: Math.ceil(modifiedData.length/10)}
        }
        case 'edit-data': {
            const user = payload;
            const updatedAllData = updateUserData([...state.allData], user);
            const updatedData =updateUserData([...state.data], user)

            return {...state, allData: updatedAllData, data: updatedData, totalPages: Math.ceil(updatedData.length/10)}
        }
        case 'checked-checkboxes' : return {...state, checkedCbxs:payload};
        default: return state;
    }
}

const updateUserData = (data, user) => {
    return data.map(item => {
        if(item.id === user.id) {
            if(item.name !== user.name)
                item.name = user.name;
            if(item.role !== user.role)
                item.role = user.role;
            if(item.email !== user.email)
                item.email = user.email;
        }

        return {...item};
    });
}