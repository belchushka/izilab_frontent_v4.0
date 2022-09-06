import React, {useContext, useEffect, useMemo} from 'react';
import {CustomSelect, useCart} from "@box/shared";
import MapPointer from "@assets/icons/map_pointer.svg"
import s from "./style.module.scss"
import {useTypedDispatch, useTypedSelector} from "@box/app/store/hooks";
import {setCartDate, setCartOffice} from "@box/entities";
import {ModalContext} from "@box/contexts";

interface AddressFormControl {
    error: boolean
    removeError:()=>void
    className?: string
    onSelect?: (val:any)=>void
    onMenuOpen?: ()=>void
}

export const AddressFormControl: React.FC<AddressFormControl> = ({error, removeError, className="", onMenuOpen, onSelect=()=>null}) => {
    const offices = useTypedSelector(state=>state.office.offices)
    const office_id = useTypedSelector(state=>state.cart.office_id)
    const {showOfficeSelectModal} = useContext(ModalContext)
    const dispatch = useTypedDispatch()
    const cartMethods = useCart()
    const officeSelectOptions = useMemo(() => {
        return offices.map((el: any) => {
            return {
                value: el.id,
                label: el.address,
                disabled: false,
            }
        }).sort(el=>el.label)
    }, [offices])
    const setOfficeId = (option:{value: number, label:string, disabled:boolean})=>{
        dispatch(setCartOffice(option.value))
        dispatch(setCartDate(null))
        onSelect(option.value)
    }
    useEffect(()=>{
        cartMethods.countData()
    }, [office_id])
    return (
        <div className={`${s.cart_select_office} ${className}`}>
            <CustomSelect paddingRight={true} placeholder={'Выберите адрес *'} sublable={""} error={error}
                          onMenuOpen={onMenuOpen}
                          onSelect={setOfficeId}
                          value={officeSelectOptions.find(el=>el.value==office_id) || null}
                          options={officeSelectOptions}/>
            <div className={s.cart_select_office_btn} onClick={showOfficeSelectModal}>
                <span>Указать на карте</span>
                <img src={MapPointer} alt=""/>
            </div>
        </div>
    );
};
