import React from 'react';

function LoadingOverlay() {
    return (
        <div className="loading-overlay text-white">
            <div className='h-full relative'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
            
        </div>
    );
}

export default React.memo(LoadingOverlay);