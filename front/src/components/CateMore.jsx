import React from 'react'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import "../css/cateMore.css"

const CateMore = () => {
    return (
        <> 
            <div className="main">
                <div className="box" id="sec1">
                    <a href="#sec3"><NavigateBeforeIcon /></a>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <a href="#sec2"><NavigateNextIcon /></a>
                </div>
                <div className="box" id="sec2">
                    <a href="#sec1"><NavigateBeforeIcon /></a>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <a href="#sec3"><NavigateNextIcon /></a>
                </div>
            </div>
        </>
    )
}

export default CateMore
