import { useContext, useEffect } from 'react';
import { AdminContext } from '../..';
import classes from './index.module.css';

const Footer = () => {
    const {page, totalPages, updatePage, startPageNum, endPageNum} = useContext(AdminContext);
    const disableStartBtns = startPageNum <= 1;
    const disableEndBtns = endPageNum >= totalPages;

    useEffect(() => {
        updatePage({type:'totalPagesChange', payload:totalPages})
    }, [totalPages])

    const handlePageChange = (e) => {
        const {name} = e.target;
        updatePage({type:name, payload: totalPages});
    }

    const renderPageNums = () => {
        const renderDots = <li className={`${classes.dot}`}>...</li>;
        const startDots = startPageNum !== 1 ? renderDots : '';
        const endDots = endPageNum !== totalPages ? renderDots : '';

        const el = [];
        let pageNum = startPageNum;
        if(pageNum !== 0){   
            while( pageNum <= endPageNum) {
                el.push(<li key={pageNum} name={pageNum} className={`${classes.num}  ${pageNum === page ? classes.active: ''}`} onClick={pageSelectHandler}>{pageNum}</li>)
                pageNum++;
            };
        }

        return<>
            {startDots} {el} {endDots}
        </>
    }

    const pageSelectHandler = (e) => {
        const { textContent } = e.target;
        updatePage({type:'page',payload: Number(textContent)})
    }

    const renderBtn = (name, classes, leftBtn = true) => <button type='button' className={classes} name={name} onClick={handlePageChange}>
        {leftBtn && <i className='fas fa-angle-left'></i>} {name} {!leftBtn &&  <i className='fas fa-angle-right'></i>}
    </button>

    return(<div className={classes['footer-container']}>
        <div className={classes.pagination}>
            <ul>
                <li>
                   {renderBtn('start', `${classes.btnStart} ${disableStartBtns ? classes.disable : ''}`)}
                </li>
                <li>
                    {renderBtn('prev', `${classes.btnStart} ${disableStartBtns ? classes.disable : ''}`)}
                </li>

                { renderPageNums() }

                <li>
                    {renderBtn('next', `${disableEndBtns ? classes.disable : ''}`, false)}
                </li>
                <li>
                    {renderBtn('end', `${classes.btnEnd}  ${disableEndBtns ? classes.disable : ''}`, false)}
                </li>
            </ul>
        </div>
    </div>)
}

export default Footer;