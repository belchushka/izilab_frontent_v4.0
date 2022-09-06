import React from 'react';
import s from "./style.module.scss"

interface IFeedbackComment {
    text:string,
    name: string,
    name_subtitle: React.ReactNode | React.ReactElement
}

const FeedbackCommentNowrap: React.FC<IFeedbackComment> = ({text, name, name_subtitle}) => {
    return (
        <div className={s.comment_body}>
            <p className={s.comment_text}>
                {text}
            </p>
            <p className={s.comment_name}>
                {name}
            </p>
            {name_subtitle}
        </div>
    );
};

export const FeedbackComment = React.memo(FeedbackCommentNowrap)
