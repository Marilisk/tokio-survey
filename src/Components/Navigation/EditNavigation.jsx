import React from "react";
import { NavLink, useParams } from 'react-router-dom';
import c from './editNavigation.module.css';

const ClipboardListIcon = () => {
    return<> 
        <svg className={c.icon} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="22" height="20"><path d="M11,12h6v2h-6v-2ZM21,2V21c0,1.654-1.346,3-3,3H6c-1.654,0-3-1.346-3-3V2h5.171c.413-1.164,1.525-2,2.829-2h2c1.304,0,2.416,.836,2.829,2h5.171Zm-2,2h-5v-1c0-.552-.449-1-1-1h-2c-.551,0-1,.448-1,1v1H5V21c0,.552,.449,1,1,1h12c.551,0,1-.448,1-1V4Zm-8,6h6v-2h-6v2Zm0,8h6v-2h-6v2ZM7,10h2v-2h-2v2Zm0,4h2v-2h-2v2Zm0,4h2v-2h-2v2Z"/></svg>
    </>
}
const AddDocumentIcon = () => {
    return<> 
        <svg className={c.icon} id="Layer_1" height="20" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m14.414 0h-9.414a3 3 0 0 0 -3 3v21h20v-16.414zm.586 3.414 3.586 3.586h-3.586zm-11 18.586v-19a1 1 0 0 1 1-1h8v7h7v13zm9-8h3v2h-3v3h-2v-3h-3v-2h3v-3h2z"/></svg>
    </>
}
const SurveyIcon = () => {
    return<> 
        <svg  className={c.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="18"><g id="_01_align_center" data-name="01 align center"><path d="M0,3v8H11V0H3A3,3,0,0,0,0,3ZM9,9H2V3A1,1,0,0,1,3,2H9Z"/><path d="M0,21a3,3,0,0,0,3,3h8V13H0Zm2-6H9v7H3a1,1,0,0,1-1-1Z"/><path d="M20,21.417V2.586l2.584,2.58L24,3.751,21.121.876a3,3,0,0,0-4.239,0l-2.875,2.87L15.42,5.161,18,2.582V21.416l-2.585-2.582-1.413,1.415,2.879,2.875a3,3,0,0,0,4.239,0L24,20.254l-1.413-1.415Z"/></g></svg>
    </>
}

export default function EditNavigation() {
    let params = useParams();
    return <div className={c.mainWrapper} >
         <div className={c.block}>
        <div className={c.wrapper}>
            <NavLink to='/edit' className={params['*'] === ''  ? c.active : c.link}>
                <div className={c.iconWrapper}>
                    <ClipboardListIcon />
                </div>
                <span>
                    редактировать вопросы
                </span>
            </NavLink>
        </div>

        <div className={c.wrapper}>
            <NavLink to='/edit/createquestion' className={params['*'] === 'createquestion'  ? c.active : c.link}>
                <div className={c.iconWrapper}>
                    <AddDocumentIcon />
                </div>
                <span>
                    добавить новый вопрос
                </span>
            </NavLink>
        </div>

        <div className={c.wrapper}>
            <NavLink to='/edit/editsurvey' className={params['*'] === 'editsurvey'  ? c.active : c.link} >
                <div className={c.iconWrapper}>
                    <SurveyIcon />
                </div>
                <span>
                    редактировать опрос
                </span>
            </NavLink>
        </div>

        <div className={c.wrapper}>
            <NavLink to='/edit/createsurvey' className={params['*'] === 'createsurvey'  ? c.active : c.link} >
                <div className={c.iconWrapper}>
                    <SurveyIcon />
                </div>
                <span>
                    добавить опрос
                </span>
            </NavLink>
        </div>

    </div>
    </div>
};

