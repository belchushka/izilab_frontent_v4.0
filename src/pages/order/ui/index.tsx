import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    AnimateWrapper,
    ContainerComponent,
    BlockHeader,
    useEffectAfterMount,
    useCart,
    PriceButton
} from "@box/shared";
import s from "./style.module.scss"
import {IStep, StepBar} from "@box/widgets";
import {OrderNavigationContext} from "@box/contexts";
import {Analysis, Cart, PersonalInfo} from "@box/pages";
import {useTypedSelector} from "@box/app/store/hooks";
import {Payment} from "@box/pages/payment";

const steps: Array<IStep> = [
    {
        title: "Выбор анализов"
    },
    {
        title: "Корзина"
    },
    {
        title: "Оплата заказа"
    },
]

export const Order = () => {
    const [currentStep, setCurrentStep] = useState<number>(0)
    const cartRef = useRef<HTMLDivElement>(null)
    const goNext = () => currentStep < 3 && setCurrentStep(state => state + 1)
    const goBack = () => currentStep > 0 && setCurrentStep(state => state - 1)
    const goTo = (page: number) => {
        setCurrentStep(page)
    }
    const scrollUp = () => {
        if (cartRef.current) {
            cartRef.current.scrollIntoView()
        }
    }
    const cart = useTypedSelector(state => state.cart)
    const cartMethods = useCart()
    useEffect(() => {
        cartMethods.countPrice()
        cartMethods.countData()
    }, [cart.ids])
    useEffectAfterMount(() => {
        scrollUp()
    }, [currentStep])

    return (
        <AnimateWrapper>
            <div id={"order"} ref={cartRef} className={"block"}>
                <ContainerComponent type={"landing"} className={s.header}>
                    <BlockHeader className={s.header_large} title={"Оформить заказ"} alignment={"center"}/>
                    <div className={s.header_progress_wrapper}>
                        <StepBar steps={steps} current_step={currentStep} filledBackground={"#FC4483"}
                                 unfilledBackground={"#AED9FF"}/>
                    </div>
                </ContainerComponent>
                <OrderNavigationContext.Provider value={{
                    goTo,
                    goNext,
                    goBack
                }}>
                    {currentStep<1 && <div className={s.floating}>
                        <PriceButton width={"100%"} onClick={scrollUp}/>
                    </div>}
                    <ContainerComponent>
                        {(() => {
                            switch (currentStep) {
                                case 0:
                                    return <Analysis/>
                                case 1:
                                    return <Cart/>
                                case 2:
                                    return <PersonalInfo/>
                                case 3:
                                    return <Payment/>
                            }
                        })()}
                    </ContainerComponent>
                </OrderNavigationContext.Provider>
            </div>
        </AnimateWrapper>
    );
};

