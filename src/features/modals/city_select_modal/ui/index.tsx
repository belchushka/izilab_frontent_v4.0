import React, {useContext, useEffect, useState} from 'react';
import s from "./style.module.scss";
import {Input, Loader, ModalOptional, useDebounce, useLoading} from "@box/shared";
import {ModalContext} from "@box/contexts";
import LetterComponent from "../components/letter";
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {findCities, getAllCities, setCartDate, setCartOffice, setCitySuggestion, setCurrentCity} from "@box/entities";

interface ICitySelectModal {
    zIndex: number
}

const values = [ "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т","У", "Ф", "Х","Ч", "Ш","Э" ,"Ю","Я" ]


const CitySelectModalNowrap: React.FC<ICitySelectModal> = ({zIndex}) => {
    const {hideCitySelectModal} = useContext(ModalContext)
    const [selectedLetter, setSelectedLetter] = useState<number | null>(0)
    const [inputValue, setInputValue] = useState("")
    const debouncedInputValue = useDebounce(inputValue, 300)
    const cities = useTypedSelector(state=>state.city.cities)
    const {loading, startLoading,stopLoading} = useLoading()
    const dispatch = useTypedDispatch()
    const fetch = async () => {
        startLoading()
        try {
            if (debouncedInputValue.trim().length == 0){
                if (selectedLetter!=null) {
                    await dispatch(getAllCities())
                }
            }else{
                await dispatch(findCities(debouncedInputValue))
            }

        } catch (e) {
            console.log(e);
        }
        stopLoading()
    }
    const onCityClick = (name: string)=>{
        dispatch(setCurrentCity(name))
        dispatch(setCartDate(null))
        dispatch(setCartOffice(null))
        dispatch(setCitySuggestion({
            id: null,
            name: null
        }))
        hideCitySelectModal()
    }
    useEffect(()=>{
        fetch()
    },[selectedLetter, debouncedInputValue])
    return (
        <ModalOptional headerChild={
            <div className={` ${s.body_header}`}>
                <Input placeholder={"Название города"} onInput={(val)=>setInputValue(val)} value={inputValue}/>
            </div>
        } zIndex={zIndex} className={s.body} hide={hideCitySelectModal}>
            <div className={s.content}>
                {/*<div className={s.letters}>*/}
                {/*    {values.map((el, num)=>{*/}
                {/*        return <LetterComponent key={num} content={el} selected={num==selectedLetter && debouncedInputValue.trim().length ==0} select={(id)=>setSelectedLetter(id)} id={num}/>*/}
                {/*    })}*/}
                {/*</div>*/}
                {loading ?
                    <Loader/>

                    : <>
                        <div className={s.cities}>
                            {cities.map(el=>{
                                return <div key={el.id} onClick={()=>onCityClick(el.name || "")}>
                                    <p>{el.name}</p>
                                </div>
                            })}
                            {cities.length == 0 && <div >
                                <p>Ничего не найдено</p>
                            </div>}

                        </div>

                    </>}

            </div>

        </ModalOptional>
    );
};

export const CitySelectModal = React.memo(CitySelectModalNowrap)

