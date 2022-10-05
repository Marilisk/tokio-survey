import React, { useEffect, useRef, useState } from "react";
import c from './TEST.module.css';
import sendIcon from './../../images/rotate-right-icon.svg';


/* let elements = sortedQList.map( el => {

        return <div className={c.child} key={el.id}  >{el.id}</div>
    } ) */


const Round = ({mouseLeft, mouseTop }) => {
    return <img src={sendIcon} className={c.round} style={{ left: mouseLeft, top: mouseTop}} />
}

const RoundOnLayout = () => {
    const [mouseTop, moveTop] = useState(0);
    const [mouseLeft, moveLeft] = useState(0);
    const handleMouseMove = (event) => {
        moveTop(event.clientY);
        moveLeft(event.clientX);
    };

    return <div className={c.mainWrapper} onMouseMove={(event)=> handleMouseMove(event)} >
        <Round mouseTop={mouseTop} mouseLeft={mouseLeft} />


    </div>
}


const TESTQuestionRow = ({ sortedQList }) => {
    const refContainer = useRef(null);
    let coords = {
        top: 0,
        height: 0,
        left: 0,
    };
    useEffect(() => {
        coords = refContainer.current.getBoundingClientRect();
        console.log('ref coords');
        console.log(coords);
        
    }) 



    return <div>
        <div ref={refContainer}></div>
        <RoundOnLayout />
      

    </div>
}


export default TESTQuestionRow;