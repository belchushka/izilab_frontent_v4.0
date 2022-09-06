import React from 'react';
import Select from "react-select";


const customStyles = {
    menuList: (provided: any) => ({
        ...provided,

        "::-webkit-scrollbar":{
            width: "5px"
        },
        "::-webkit-scrollbar-track": {
            backgroundColor: "#E5E5E5",
            border: "none",
            borderRadius: "5px",
        },

        "::-webkit-scrollbar-thumb":{
            backgroundColor: "#0187FC",
            borderRadius:" 5px",
            border: "none",
            backgroundClip: "unset",
        },
    }),
    dropdownIndicator: () => {
        return {
            display: "none"
        }
    },

    singleValue: (provided: any) => {
        return {
            ...provided,
            color: "black"
        }
    },
    control: (provider: any, state: any) => {
        return {
            height: "45px",
            border: "1px solid #44566673",
            borderRadius: "8px",
            alignItems: "center",
            display: "flex",
            ...(state.selectProps.selectProps.error && {border:"1px solid #FC4483"})
        }
    },

    menu: (provided: any) => {
        return {
            ...provided,
            background: "#E8F4FF",
        }
    },

    placeholder: (defaultStyles: any) => {
        return {
            ...defaultStyles,
            color: 'rgba(135,135,135,0.63)',
        }
    },

    option: (provided: any, state: any) => {
        return {
            ...provided,
            color: "#878787",
            ...(state.isSelected && {
                color: "#0187FC",
                background: "transparent"
            }),
            ":hover": {
                color: "#0187FC"
            },
            ...(state.data.disabled && {
                color: "#87878780",
                ":hover": {
                    color: "#87878780"
                },
            })
        }
    }
}

interface IOption {
    value: string | number | Date,
    label: string,
    disabled?: boolean
}


interface ICustomSelect {
    className?: string,
    options: IOption[],
    onSelect: (val: any) => void,
    onMenuOpen?: () => void,
    error?: boolean,
    value: any,
    placeholder: string,
    sublable?:string,
    paddingRight?: boolean
}

export const CustomSelect: React.FC<ICustomSelect> = ({className, options, onSelect, onMenuOpen, error=false, value, placeholder, sublable="", paddingRight= false}) => {

    return (
        <Select
            className={className}
            onMenuOpen={onMenuOpen}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            //@ts-ignore
            selectProps={{ error }}
            isOptionDisabled={(option) => option.disabled}
            formatOptionLabel={(option, { context })=>{
                if (context=="value"){
                    return option.label+ sublable
                }
                return option.label
            }}
            placeholder={placeholder}
            onChange={onSelect}
            value={value}
            styles={{
                ...customStyles,
                valueContainer: (provided: any) => {
                    return {
                        ...provided,
                        paddingLeft: "15px",
                        paddingRight: paddingRight ? "150px" : "15px"
                    }
                },

            }}
            noOptionsMessage={() => "Нет данных"}
            options={options}
        />
    );
};
