import React from 'react';
import {PersonalInfoForm} from "@box/features";
import {AnimateWrapper} from "@box/shared";

const PersonalInfoNowrap = () => {
    return (
        <AnimateWrapper>
            <PersonalInfoForm/>
        </AnimateWrapper>
    );
};

export const PersonalInfo = React.memo(PersonalInfoNowrap);