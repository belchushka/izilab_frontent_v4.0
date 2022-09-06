import React, {useEffect, useState} from 'react';
import './styles/global.scss';
import {checkCartValid, getCitySuggestion, Navigation, setCurrentCity} from "@box/entities";
import {IModalContext, ModalContext} from "@box/contexts";
import {SideMenu} from "@box/widgets/landing/side_menu/ui";
import links from "../shared/data/dummy_links"
import {AnimatePresence} from "framer-motion";
import {Provider} from "react-redux";
import store from "@box/app/store"
import SupportModal from "@box/features/modals/support_modal/ui";
import {ComponentAnimateWrapper, Loader, useLoading} from "@box/shared";
import {useWindow} from "@box/shared";
import {AnalysisModal} from "@box/features";
import {CitySelectModal, OfficeSelectModal} from "@box/features/modals";

const App = () => {
    const window = useWindow()
    const {loading, startLoading, stopLoading} = useLoading()
    const [showAnalysisModal, setShowAnalysisModal] = useState(false)
    const [showAnalysisCompoundModal, setShowAnalysisCompoundModal] = useState(false)
    const [showOfficeSelectModal, setShowOfficeSelectModal] = useState(false)
    const [showCitySelectModal, setShowCitySelectModal] = useState(false)
    const [showSideMenu, setShowSideMenu] = useState(false)
    const [showSupportModal, setShowSupportModal] = useState(false)
    useEffect(() => {
        const values = [showAnalysisModal, showSideMenu, showCitySelectModal, showSupportModal, showOfficeSelectModal]
        if (values.some((el: boolean) => el)) {
            window.cutContent()
            return
        }
        window.showContent()
    }, [showAnalysisModal, showSideMenu, showCitySelectModal, showSupportModal, showOfficeSelectModal])

    const bootstrap = async ()=>{
        startLoading()
        let user_city: string | null = localStorage.getItem("user_city")
        if (user_city) {
            store.dispatch(setCurrentCity(user_city))
        }else{

            store.dispatch(setCurrentCity("Казань"))

            await store.dispatch(getCitySuggestion())
        }
        const cart = localStorage.getItem("user_cart")
        if (cart) {
            const data = JSON.parse(cart)
            const valid = data.every((el: number | any)=>{
                return typeof el=="number"
            })
            if (valid){
                await store.dispatch(checkCartValid(data))
            }else{
                localStorage.setItem("user_cart", JSON.stringify([]))
            }
        }else{
            localStorage.setItem("user_cart", JSON.stringify([]))
        }
        stopLoading()
    }
    useEffect(() => {
       bootstrap()
    }, [])
    return (
        <>
            {loading ?
                <div style={{
                    width:"100%",
                    height:"100vh",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                    <Loader></Loader>
                </div>

                :
                <Provider store={store}>
                    <ModalContext.Provider value={{
                        showAnalysisModal: () => setShowAnalysisModal(true),
                        hideAnalysisModal: () => setShowAnalysisModal(false),
                        showAnalysisCompoundModal: () => setShowAnalysisCompoundModal(true),
                        hideAnalysisCompoundModal: () => setShowAnalysisCompoundModal(false),
                        showOfficeSelectModal: () => setShowOfficeSelectModal(true),
                        hideOfficeSelectModal: () => setShowOfficeSelectModal(false),
                        showCitySelectModal: () => setShowCitySelectModal(true),
                        hideCitySelectModal: () => setShowCitySelectModal(false),
                        showSideMenu: () => setShowSideMenu(true),
                        hideSideMenu: () => setShowSideMenu(false),
                        showSupportModal: () => setShowSupportModal(true),
                        hideSupportModal: () => setShowSupportModal(false),

                    } as IModalContext}>
                        <Navigation/>
                        {typeof window !== "undefined" && <>
                            <AnimatePresence
                                initial={false}
                                exitBeforeEnter={true}
                            >
                                {showSideMenu && <SideMenu links={links} show={showSideMenu}/>}
                            </AnimatePresence>
                        </>}
                        <ComponentAnimateWrapper zIndex={1005} condition={showSupportModal}>
                            <SupportModal zIndex={1001}/>
                        </ComponentAnimateWrapper>
                        <ComponentAnimateWrapper zIndex={1005} condition={showAnalysisModal}>
                            <AnalysisModal zIndex={1005}/>
                        </ComponentAnimateWrapper>
                        <ComponentAnimateWrapper zIndex={1006} condition={showAnalysisCompoundModal}>
                            <AnalysisModal zIndex={1006} showBottom={false} is_inner={true}/>
                        </ComponentAnimateWrapper>
                        <ComponentAnimateWrapper zIndex={1005} condition={showOfficeSelectModal}>
                            <OfficeSelectModal zIndex={1005}/>
                        </ComponentAnimateWrapper>
                        <ComponentAnimateWrapper zIndex={1005} condition={showCitySelectModal}>
                            <CitySelectModal zIndex={1005}/>
                        </ComponentAnimateWrapper>
                    </ModalContext.Provider>
                </Provider>
            }


        </>
    )
}


export default App;
