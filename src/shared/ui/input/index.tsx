import React, {ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState} from 'react';
// @ts-ignore
import InputMask from 'react-input-mask';
import s from "./style.module.scss"
import CalendarIcon from "@assets/icons/calendar.svg"
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import {ru} from "date-fns/locale";
import moment from "moment";


interface IInput {
    placeholder: string,
    className?: string,
    containerClassName?: string
    onInput: (val: string) => void,
    error?: boolean,
    setError?: (val: boolean) => void | null,
    mask?: string,
    value: string,
    onFocus?: () => void,
    onBlur?: () => void,
    disabled?: boolean
}

interface IIconInput extends IInput {
    containerClassName?: string,
    icon: string
}

interface ICalendarInput extends IInput {
    containerClassName?: string
    onSelect: (val: any) => void
    calendarDate: any | null
}

interface IButtonInput extends IInput {
    onClick: () => void
    buttonDisabled?: boolean
    inputDisabled?: boolean
    buttonText: string
    buttonActiveText?: string
    buttonActive?: boolean
    onButtonActiveClick?: () => void
}

export const Input: React.FC<IInput> = ({
                                            placeholder,
                                            className,
                                            containerClassName,
                                            error = false,
                                            setError = null,
                                            mask = "",
                                            value,
                                            onInput,
                                            onFocus = () => null,
                                            onBlur = () => null,
                                            disabled = false
                                        }) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => onInput(ev.target.value)
    return (
        <div className={containerClassName}>
            <InputMask disabled={disabled} onFocus={onFocus} onBlur={onBlur} maskChar={""} value={value} mask={mask}
                       onChange={onChange}
                       className={`${s.input} ${className} ${error && s.input_error}`} placeholder={placeholder}
                       type="text"/>
        </div>
    );
};

export const IconInput: React.FC<IIconInput> = ({
                                                    placeholder,
                                                    className,
                                                    onInput,
                                                    containerClassName,
                                                    icon,
                                                    value
                                                }) => {
    const [showIcon, setShowIcon] = useState(true)
    const inputHandler = useCallback((val: string) => {
        onInput(val)
    }, [showIcon])

    useEffect(() => {
        if (value.trim().length > 0 && showIcon) {
            setShowIcon(false)
        } else if (value.trim().length == 0) {
            setShowIcon(true)
        }
    }, [value])

    return (
        <div className={`${s.search_input_wrapper} ${containerClassName}`}>
            {showIcon && <img className={s.search_input_wrapper_search_icon} src={icon} alt={""}/>}
            <Input
                value={value}
                onInput={inputHandler}
                className={`${className} ${s.input_search} ${showIcon && s.input_search_active}`}
                placeholder={placeholder}
            />
        </div>
    );
};

export const CalendarInput: React.FC<Omit<ICalendarInput, 'mask'>> = ({
                                                                          placeholder,
                                                                          className,
                                                                          onInput,
                                                                          containerClassName,
                                                                          value,
                                                                          error,
                                                                          setError,
                                                                          onSelect,
                                                                          calendarDate
                                                                      }) => {
    const calendarRef = useRef<HTMLDivElement>(null)
    const [showCalendar, setShowCalendar] = useState(false)
    const toggleCalendar = () => {
        setShowCalendar(state => !state)
    }
    useEffect(() => {
        const callback = (ev: MouseEvent) => {
            // @ts-ignore
            if (calendarRef && !calendarRef.current.contains(ev.target)) {
                setShowCalendar(false)
            }
        }
        if (showCalendar) {
            window.addEventListener('click', callback)
        } else {
            window.removeEventListener('click', callback)
        }
        return () => window.removeEventListener('click', callback)
    }, [showCalendar, calendarRef])
    const onFocusHandler = useCallback(() => {
        setShowCalendar(true)
    }, [])
    return (
        <div className={`${s.search_input_wrapper} ${containerClassName}`} ref={calendarRef}>
            <img
                onClick={toggleCalendar}
                className={`${s.search_input_wrapper_search_icon} ${s.search_input_wrapper_calendar_icon}`}
                src={CalendarIcon} alt={""}
            />
            <Input
                onFocus={onFocusHandler}
                error={error}
                setError={setError}
                value={value}
                onInput={onInput}
                mask={"99.99.9999"}
                className={`${className} ${s.input_search} ${s.input_search_active}`}
                placeholder={placeholder}/>
            {showCalendar &&
                <div className={s.calendar_input_calendar_wrapper}>
                    <LocalizationProvider
                        locale={ru}
                        dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            shouldDisableYear={(date) => {
                                return moment(date).isAfter(moment())
                            }
                            }
                            shouldDisableDate={(date): boolean => {
                                return moment(date).isAfter(moment())
                            }
                            }
                            value={calendarDate || new Date()}
                            onChange={(newValue) => {
                                setShowCalendar(false)
                                onSelect(newValue)
                            }}
                            renderInput={(params) => <></>}
                        />
                    </LocalizationProvider>
                </div>


            }

        </div>
    );
};

export const ButtonInput: React.FC<IButtonInput> = ({
                                                        placeholder,
                                                        className,
                                                        onInput,
                                                        containerClassName,
                                                        value,
                                                        buttonDisabled = false,
                                                        inputDisabled = false,
                                                        onClick,
                                                        buttonText,
                                                        buttonActive = false,
                                                        onButtonActiveClick = () => null,
                                                        buttonActiveText=""
                                                    }) => {
    return <div className={`${s.button_input_wrapper} ${s.button_input} ${containerClassName}`}>
        <div className={`${s.button_input_text}`}>
            <Input placeholder={placeholder} className={className} onInput={onInput} disabled={inputDisabled}
                   value={value}/>
        </div>

        <div onClick={() => {
            buttonActive ? onButtonActiveClick() : onClick()
        }} className={`${s.button_input_btn} ${buttonDisabled ? s.button_input_btn_disabled : ""} ${buttonActive ? s.button_input_btn_active : ""}`}>
            <p>{buttonActive ? buttonActiveText:buttonText}</p>
        </div>
    </div>
}
