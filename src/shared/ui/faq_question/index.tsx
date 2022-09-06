import React, {useRef, useState} from 'react';
import s from "./style.module.scss"
import Cross from "@assets/icons/cross.svg"
import {Separator} from "@box/shared";

interface IQuestionComponent {
    title: string,
    description: string
}

const FaqQuestionNowrap: React.FC<IQuestionComponent> = ({title,description}) => {
    const [height, setHeight] = useState(0)
    const textRef = useRef<HTMLParagraphElement>(null)
    const handleClick = ()=>{
        if(height==0){
            if (textRef.current){
                setHeight(textRef.current.getBoundingClientRect().height)
            }
        }else{
            setHeight(0)
        }
    }
    return (
        <div className={s.question} onClick={handleClick}>
            <div className={s.question_head}>
                <h5>{title}</h5>
                <div className={`${s.question_head_cross} ${height>0 && s.question_head_cross_rotated}`}>
                    <img src={Cross} alt=""/>
                </div>
            </div>
            <div className={`${s.question_answer}`} style={{
                height:`${height}px`
            }}>
                <p ref={textRef}>{description}</p>
            </div>
            <Separator/>
        </div>
    );
}

export const FaqQuestion = React.memo(FaqQuestionNowrap)
