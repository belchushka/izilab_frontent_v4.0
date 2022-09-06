import React, {useState} from 'react';
import s from "./style.module.scss"
import {DateFormControl, AddressFormControl, CityFormControl, PromocodeInput} from "@box/entities";

export const VisitForm = () => {
    const [cityError, setCityError] = useState<boolean>(false)
    const [addressError, setAddressError] = useState<boolean>(false)
    return (
        <div>
            <CityFormControl error={cityError} removeError={setCityError.bind(null, false)}/>
            <AddressFormControl className={s.select} error={addressError} removeError={setAddressError.bind(null, false)}/>
            <DateFormControl className={s.select} error={addressError} removeError={setAddressError.bind(null, false)}/>
            <PromocodeInput className={s.select} />
        </div>
    );
};
