import React from 'react';
import s from "./style.module.scss"

interface ICustomCheckbox {
    onChange: (val: boolean)=> void,
    label: string,
    name: string,
    type?:"radio" | "checkbox"
    error: boolean,
    checked: boolean,
    setError: (err: boolean)=>void
}

const CheckboxNowrap: React.FC<ICustomCheckbox> = ({onChange, label, name, type="radio", error,setError, checked}) => {
    return (
        <div>
            <label className={s.label}>
                <input checked={checked} name={name} onChange={ev=>ev.target.checked ? onChange(true) : onChange(false)} className={s.checkbox} type={type} />
                <span className={`${s.checkbox_checkmark} ${error && s.checkbox_checkmark_error}`}></span>
                {label}
            </label>
        </div>
    );
};

export const Checkbox = React.memo(CheckboxNowrap)