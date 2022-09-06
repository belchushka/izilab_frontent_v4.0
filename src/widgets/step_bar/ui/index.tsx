import React from 'react';
// @ts-ignore
import {ProgressBar, Step} from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import s from "./style.module.scss"

export interface IStep {
    title: string
}

interface IStepBar {
    steps: Array<IStep>
    current_step: number
    filledBackground: string
    unfilledBackground: string
}

export const StepBar: React.FC<IStepBar> = ({steps, current_step, filledBackground, unfilledBackground}) => {
    return (
        <div>
            <ProgressBar filledBackground={filledBackground} unfilledBackground={unfilledBackground} height={3}
                         percent={50 * current_step}>
                {steps.map((step: IStep, num)=>{
                   return <Step key={num}>
                        {({accomplished, index}: { accomplished: boolean, index: number }) => (
                            <div
                                className={`${s.progress_progress_step} ${accomplished && s.progress_progress_step_active}`}
                            >
                                {index + 1}
                                <p>{step.title}</p>
                            </div>
                        )}
                    </Step>
                })}
            </ProgressBar>
        </div>
    );
};
