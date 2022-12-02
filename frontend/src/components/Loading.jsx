import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

export default function Loading() {
    return (
        <div className="loading">
            <MoonLoader />
        </div>
    );
}
