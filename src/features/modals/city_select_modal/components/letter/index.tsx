import React from 'react';
import s from "./style.module.scss"

interface ILetterComponent {
    content: string,
    className?: string,
    selected?: boolean,
    select: (id:number,query: string)=>void,
    id: number
}

const LetterComponent: React.FC<ILetterComponent> = ({content, className, selected=false, select, id}) => {
    return (
        <div onClick={()=>select(id,content)} className={`${className} ${s.letter} ${selected && s.letter_active}`}>
            <span>{content}</span>
        </div>
    );
};

export default LetterComponent;