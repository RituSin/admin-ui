import React, { memo } from 'react'
import Checkbox from '../CheckBox';
import './index.css'

function Table(props) {
  const { users = [] } = props;

  return (
    <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1"><Checkbox users={ props.users} id='all' checkboxClickHandler={props.checkboxHandler}/></div>
          <div className="col col-3">Name</div>
          <div className="col col-2">Email</div>
          <div className="col col-3">Role</div>
          <div className="col col-3">Actions</div>
        </li>
        <div className="table-container">
        {   
            users.map(item => (
                <li className="table-row" key={item.id} id={item.id}>
                  <div className="col col-1">
                    <Checkbox id={item.id} checked={item.checked} checkboxClickHandler={props.checkboxHandler}/>
                  </div>
                  <div className="col col-3">
                    <textarea type="text" name="name" value={item['name']} onBlur={props.onBlurHandler} disabled={item.disabled} autoFocus={true} onChange={props.fieldEditHandler}/>
                  </div>
                  <div className="col col-2">
                    <textarea type="text"  name="email" value={item["email"]} disabled={item.disabled} onBlur={props.onBlurHandler}  onChange={props.fieldEditHandler}/>
                  </div>
                  <div className="col col-3">
                    <textarea type="text"  name="role" value={item['role']} disabled={item.disabled} onBlur={props.onBlurHandler} onChange={props.fieldEditHandler}/>
                  </div>
                  <div  className="col col-3 action">
                    <button type='button' onClick={props.editHandler}>Edit</button> 
                    <button type='button' name="delete" className="whiteBG" onClick={props.deleteHandler}>Delete</button>
                  </div>
                </li>
            ))
        }  
        </div>
            
        
      </ul>
  )
}

export default memo(Table);