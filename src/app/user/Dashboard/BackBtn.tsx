import React from 'react'
import { DashboardProps } from './Dashboard'

export default function BackBtn({ goBack, name }: DashboardProps) {
    return (
        <div className='component-common common-component-header'>
            <button onClick={goBack}>
                <i className="hgi hgi-stroke hgi-arrow-left-02"></i>
            </button>
            <h1>
                {name}
            </h1>
        </div>
    )
}
