import React from 'react';
import {useStore} from "../../store";
import './counter.styles.css'
import {observer} from "mobx-react-lite";

export const CounterComponent = observer(() => {
    const {counter} = useStore()

    const handleIncrement = () => {
        counter.increment()
    }

    const handleDecrement = () => {
        counter.decrement()
    }
    return (
        <div className='counter-container'>
            <div className='counter-value'>{counter.count}</div>
            <div className='counter-value'>{counter.total} --- computed value</div>
            <div className='button-container'>
                <div className='button' onClick={handleIncrement}>Increase</div>
                <div className='button' onClick={handleDecrement}>Decrease</div>
            </div>
        </div>
    );
});