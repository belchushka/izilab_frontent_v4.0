import React, {useContext} from 'react';
import s from "./style.module.scss"
import {useTypedSelector} from "@box/app/store/hooks";
import {ButtonInput} from "@box/shared";
import {ModalContext} from "@box/contexts";

interface ICityFormControl {
    error: boolean
    removeError:()=>void
}

const CityFormControlNoWrap: React.FC<ICityFormControl> = ({error, removeError}) => {
    const city = useTypedSelector(state=>state.city.city)
    const {showCitySelectModal} = useContext(ModalContext)

    return (
        <div>
            <h5 className={s.block_title}>Выбор медофиса</h5>
            <ButtonInput buttonText={'Изменить'} placeholder={""} inputDisabled={true} value={city.name ? city.name : "Выберите город *"} onInput={()=>null} onClick={showCitySelectModal}/>
        </div>
    );
};

export const CityFormControl = React.memo(CityFormControlNoWrap)