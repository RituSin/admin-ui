
export const getUsers = (setUserData) => {
    const url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
    setUserData(prevSatate => ({...prevSatate, status: 'loading'}));
    fetch(url)
        .then(res => res.json())
        .then(res => {
            const resData = res.map(item => ({...item, disabled:true, checked: false}));
            setUserData({data: resData, status: 'success'});
        })
        .catch(() => setUserData({data: [], status: 'error'}))
} 

export const getUserData = (data = []) => {
    return (id, action, fieldName = '', value = '') => {
        switch(action) {
            case 'delete' :
                return data.filter(item => id === 'all' ? !item.checked : item.id !== id);
            case 'checkbox' :
                return  data.map(item => id === 'all' ? {...item, checked: value} :
                    item.id === id ? 
                    {...item, checked: !item.checked} : item);  
            case 'edit' :
                return data.map(item => item.id === id ? {...item, disabled: !item.disabled} : {...item, disabled: true});
            default :
                return data.map(item => item.id === id ? {...item, [fieldName]: value} : item);
        }
    }
}

export const unCheckAllCbxBtn = () => {
    const cbx = document.getElementById('all');

    if(!!cbx.checked) {
        cbx.checked = false;
    }
}