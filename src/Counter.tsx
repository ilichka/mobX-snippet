import React from 'react';
import {observe} from "mobx";
import {observer} from "mobx-react-lite";

const Counter = observer(() => {
    return (
        <div className='counter'>
            <div className='btns'>
                <button className='btn'>+</button>
                <button className='btn'>-</button>
            </div>
        </div>
    );
});

export default Counter;