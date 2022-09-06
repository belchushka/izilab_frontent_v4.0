import React from 'react';

const SeparatorNowrap = () => {
    return (
        <div style={{
            width:"100%",
            height:"1px",
            background:"#eee"
        }}></div>
    );
};

export const Separator = React.memo(SeparatorNowrap)
