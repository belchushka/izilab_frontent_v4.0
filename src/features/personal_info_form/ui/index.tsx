import React, {useCallback, useContext, useMemo} from 'react';
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {Button, CalendarInput, ComponentAnimateWrapper, Input, useAgeLimit, Warning, Checkbox} from "@box/shared";
import s from "./style.module.scss"
import {getTotalPrice, setParent, setUser} from "@box/entities";
import moment from "moment";
import s_prev from "@box/pages/cart/ui/style.module.scss";
import {OrderNavigationContext} from "@box/contexts";
import {useValidatePersonalInfo} from "../lib/validate";

export const PersonalInfoForm = () => {
    const {user, parent} = useTypedSelector(state=>state.user)
    const total_price = useTypedSelector(getTotalPrice)
    const age_limit = useAgeLimit()
    const {goBack, goNext} = useContext(OrderNavigationContext)
    const dispatch = useTypedDispatch()
    const {validate, errors, dispatch: dispatchError} = useValidatePersonalInfo({user,parent}, age_limit.need_parent)
    const handleInput =useCallback((val: string | boolean,name: string,type:"user" | "parent" )=>{
        if (type=="parent"){
            dispatch(setParent({
                [name]: val
            }))
            return
        }
        dispatch(setUser({
            [name]: val
        }))
    }, [])
    const selectBirthday = useCallback((val: Date, type: "parent" | "user") => {
        const date = moment(val).format("DD.MM.YYYY")
        if (type=="parent"){
            handleInput(date, "birthday", "parent")
            return
        }
        handleInput(date, "birthday", "user")

    }, [])
    const birthdayDate = useMemo(()=>{
        let userDate = null
        let parentDate = null
        if (user.birthday.length == 10) {
            userDate = moment(user.birthday, "DD.MM.YYYY").toDate()
        }
        if (parent.birthday.length == 10){
            parentDate = moment(parent.birthday, "DD.MM.YYYY").toDate()
        }
        return {
            userDate,
            parentDate
        }
    }, [user.birthday, parent.birthday])

    const validateAndGoNext = ()=>{
        const can_continue = validate()
        if (!age_limit.need_parent){
            setParent({
                name: ""
            })
        }
        if (can_continue){
            goNext()
        }
    }

    const canGoNext = useMemo(()=>{
        if (age_limit.office_limit == 0 && age_limit.analysis_limit.length == 0){
            return true
        }
        return false
    }, [age_limit])

    return (
        <>
            <div>
                <div className={s.header}>
                    <h3>Ваши данные</h3>
                </div>
                <div className={s.sex_radio}>
                    <Checkbox checked={!user.is_male ?? false} error={errors.is_male} setError={()=>null} onChange={()=>handleInput(false, 'is_male', 'user')}
                                 label={"Женщина"} name={"sex"}/>
                    <Checkbox checked={user.is_male ?? false} error={errors.is_male} setError={()=>null} onChange={()=>handleInput(true, 'is_male', 'user')}
                                 label={"Мужчина"} name={"sex"}/>
                </div>
                <div className={s.input_row}>
                    <Input error={errors.surname} setError={()=>null} value={user.surname} placeholder={"Фамилия *"}
                           onInput={(val)=>handleInput(val, 'surname', 'user')} containerClassName={s.row_input}/>
                    <Input error={errors.name} setError={()=>null} value={user.name} placeholder={"Имя *"}
                           onInput={(val)=>handleInput(val, 'name', 'user')} containerClassName={s.row_input}/>
                    <Input error={errors.secondname} setError={()=>null} value={user.secondname}
                           placeholder={"Отчество *"} onInput={(val)=>handleInput(val, 'secondname', 'user')} containerClassName={s.row_input}/>
                </div>
                <CalendarInput calendarDate={birthdayDate.userDate} value={user.birthday} onSelect={(val)=>selectBirthday(val,'user')}
                               error={errors.birthday} setError={()=>null} placeholder={"Дата рождения *"} onInput={(val)=>handleInput(val, 'birthday', 'user')} containerClassName={s.expanded_input}/>

                <ComponentAnimateWrapper condition={age_limit.analysis_limit.length>0}>
                    <Warning>
                        <p style={{
                            maxWidth: "600px"
                        }}>
                            У вас в корзине добавлены анализы, у которых есть ограничение по возрасту
                            <br/>
                            Вернитесь в корзину и удалите следующие анализы:
                            <br/>
                            {age_limit.analysis_limit.map((el, num) => {
                                return <div key={num}>
                                    <strong>
                                        <span>{el}</span>
                                    </strong>
                                    <br/>
                                </div>
                            })}
                        </p>
                    </Warning>
                </ComponentAnimateWrapper>

                <ComponentAnimateWrapper condition={age_limit.office_limit > 0}>
                    <Warning>
                        <p>
                            Данный медофис принимает пациентов с {age_limit.office_limit} лет
                            <br/>
                            Вернитесь в корзину и выберите другой медофис
                        </p>
                    </Warning>
                </ComponentAnimateWrapper>

                <ComponentAnimateWrapper condition={age_limit.need_parent}>
                    <Warning>
                        <p>Медицинские услуги могут быть оказаны пациентам младше 16 лет
                            только в сопровождении с официальным представителем (родителем).
                            Пожалуйста, заполните форму родителя.</p>
                    </Warning>
                    <div className={s.header}>
                        <h3>Данные родителя</h3>
                    </div>
                    <div className={s.input_row}>
                        <Input error={errors.parent_surname} setError={()=>null} value={parent.surname} placeholder={"Фамилия родителя *"}
                               onInput={(val)=>handleInput(val, 'surname', 'parent')} containerClassName={s.row_input}/>
                        <Input error={errors.parent_name} setError={()=>null} value={parent.name} placeholder={"Имя родителя *"}
                               onInput={(val)=>handleInput(val, 'name', 'parent')} containerClassName={s.row_input}/>
                        <Input error={errors.parent_secondname} setError={()=>null} value={parent.secondname}
                               placeholder={"Отчество родителя*"} onInput={(val)=>handleInput(val, 'secondname', 'parent')} containerClassName={s.row_input}/>
                    </div>
                    <CalendarInput calendarDate={birthdayDate.parentDate} value={parent.birthday} onSelect={(val)=>selectBirthday(val,"parent")}
                                   error={errors.parent_birthday} setError={()=>null} placeholder={"Дата рождения родителя *"} onInput={(val)=>handleInput(val, 'birthday', 'parent')} containerClassName={s.expanded_input}/>
                </ComponentAnimateWrapper>


                <Input value={user.phone} error={errors.phone} setError={()=>null} placeholder={"Номер телефона *"}
                       mask={"+7(999)999-99-99"} onInput={(val)=>handleInput(val, 'phone', 'user')} className={s.expanded_input}/>
                <Input value={user.email} error={errors.email} setError={()=>null} placeholder={"E-mail *"}
                       onInput={(val)=>handleInput(val, 'email', 'user')} className={s.expanded_input}/>
            </div>
            <div className={s.personal_info_radio}>
                <Checkbox checked={user.accept_agreement} error={errors.accept_agreement} setError={()=>null} onChange={(val)=>handleInput(val, 'accept_agreement', 'user')}
                             label={""} type={"checkbox"}
                             name={"personal_info"}/>
                <p>Принимаю условия  <a target={"_blank"} href="https://izilab.ru/static/Публичная_оферта.pdf">публичной оферты</a> и обработки <a target={"_blank"} href="https://izilab.ru/static/privacy.pdf">персональных данных</a></p>
            </div>
            <div className={s_prev.buttons}>
                <Button type={"order"} onClick={goBack}>
                    <span>Вернуться в корзину</span>
                </Button>
                <Button disabled={!canGoNext} type={"order"}
                        onClick={validateAndGoNext}>
                    <span>Оплатить {total_price} ₽</span>
                </Button>
            </div>
        </>


    );
};