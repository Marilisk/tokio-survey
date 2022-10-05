import React from "react";
import c from './AppLayout.module.css';
import logo from './../../images/logo.png';
import wrapper_bg1 from './../../images/wrapper_bg1.png';
import wrapper_bg2 from './../../images/wrapper_bg2.png';
import wrapper_bg3 from './../../images/wrapper_bg3.png';
import wrapper_bg4 from './../../images/wrapper_bg4.png';
import wrapper_bg5 from './../../images/wrapper_bg5.png';

export default React.memo( () => {
    return <> 
        <div className={c.layout}>
            <img src={wrapper_bg1} alt='' className={c.wrapper_bg1} />
            <img src={wrapper_bg2} alt='' className={c.wrapper_bg2} />
            <img src={wrapper_bg3} alt='' className={c.wrapper_bg3} />
            <img src={wrapper_bg4} alt='' className={c.wrapper_bg4} />
            <img src={wrapper_bg5} alt='' className={c.wrapper_bg5} />
        </div>
        <div className={c.header}>
            <img src={logo} alt='' className={c.logo} />
        </div>
    </>
});

 