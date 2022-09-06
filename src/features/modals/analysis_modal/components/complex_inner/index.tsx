import React, {useContext, useState} from 'react';
import {AnalysisModal} from "../../ui";
import s from "./style.module.scss"
import {ModalContext} from "@box/contexts";
import {useTypedDispatch} from "@box/app/store/hooks";
import {setAnalysisCompound} from "@box/entities";

interface IAnalysisModalCompound {
    data: any,
    className:string
}

const ComplexInnerNowrap: React.FC<IAnalysisModalCompound> = ({className, data}) => {
    const {showAnalysisCompoundModal} = useContext(ModalContext)
    const dispatch = useTypedDispatch()
    const handleClick = ()=>{
        dispatch(setAnalysisCompound(data))
        showAnalysisCompoundModal()
    }
    return (
        <div>
            <p onClick={handleClick} className={`${className} ${s.text}`}>{data.analysis_data.name}</p>
        </div>
    );
};

export const ComplexInner = React.memo(ComplexInnerNowrap)