import React, {useCallback, useContext, useState} from 'react';
import s from "./style.module.scss"
import {ComponentAnimateWrapper, FileDrag, Modal} from "@box/shared";
import {useTypedDispatch} from "@box/app/store/hooks";
import {Button, Input, sendSupportRequest} from "@box/shared";
import {ModalContext} from "@box/contexts";

interface ISupportModal {
    zIndex: number,
}

const SupportModal: React.FC<ISupportModal> = ({zIndex}) => {
    const [name, setName] = useState<string>("")
    const [nameError, setNameError] = useState<boolean>(false)
    const [phone, setPhone] = useState<string>("")
    const [phoneError, setPhoneError] = useState<boolean>(false)
    const [sent, setSent] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [showFile, setShowFile] = useState<boolean>(false)
    const [analysisList, setAnalysisList] = useState<string>("")

    const {hideSupportModal} = useContext(ModalContext)

    const sendRequest = useCallback(async () => {
        if (name.trim().length > 0 && phone.trim().length == 16) {
            const res = await sendSupportRequest(name, phone, analysisList, file)
            if (res) {
                setSent(true)
            }
        }
        if (name.trim().length == 0) setNameError(true)
        if (phone.trim().length < 16) setPhoneError(true)
    }, [analysisList, file, name, phone])

    const onFileSelect = (file: any) => {
        setFile(file)
    }
    const toggleFile = () => {
        setShowFile(state => !state)
    }
    return (
        <Modal zIndex={zIndex} hide={hideSupportModal}
               className={`${s.modal_body} ${sent && s.modal_body_sent}`}>
            {!sent ?
                <>
                    <h4>Помощь в оформлении заказа</h4>
                    <p>Мы свяжемся с Вами в WhatsApp/Telegram,
                        чтобы уточнить анализы и их стоимость</p>
                    <Input value={name} error={nameError} setError={setNameError} className={s.modal_body_input}
                           placeholder={"Как Вас зовут?"} onInput={(val) => setName(val)}/>
                    <Input value={phone} error={phoneError} mask={"+7(999)999-99-99"} setError={setPhoneError}
                           className={s.modal_body_input} placeholder={"Ваш контактный телефон"}
                           onInput={(val) => setPhone(val)}/>
                    {/*<div className={s.showFile}>*/}
                    {/*    <p>Прикрепить список анализов</p>*/}
                    {/*    <Button onClick={toggleFile} type={"order"}>*/}
                    {/*        <span>{showFile ? "Скрыть" : "Добавить"}</span>*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    {/*<ComponentAnimateWrapper condition={showFile}>*/}
                    {/*    <div className={s.file}>*/}
                    {/*        <span>Допустимые форматы: docs, csv, xlsx, txt, pdf</span>*/}
                    {/*        <FileDrag file={file} onSelect={onFileSelect}/>*/}
                    {/*        <span>Не обязательно</span>*/}
                    {/*        <textarea value={analysisList} onChange={(ev)=>setAnalysisList(ev.target.value)} placeholder={"Или напишите список анализов текстом "} name="" id="" rows={5}>*/}
                    {/*    </textarea>*/}
                    {/*    </div>*/}
                    {/*</ComponentAnimateWrapper>*/}

                    <div className={s.modal_body_button_wrapper}>
                        <Button className={s.modal_body_button} type={"order"} onClick={sendRequest}>
                            <span>Отправить</span>
                        </Button>
                    </div>
                    <span>
                            Нажимая на кнопку, вы принимаете <a target={"_blank"}
                                                                href="https://izilab.ru/static/Публичная_оферта.pdf">Оферту об оказании услуг</a> и даете
                            согласие на обработку персональных данных в соответствии
                    с <a target={"_blank"} href="https://izilab.ru/static/privacy.pdf">Политикой конфиденциальности</a>.
                    </span>
                </>
                :
                <>
                    <h4>Спасибо!</h4>
                    <p>Данные успешно отправлены</p>
                </>
            }

        </Modal>
    );
};

export default SupportModal;