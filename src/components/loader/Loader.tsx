import React from 'react'
import './Loader.scss'

export default function Loader() {
    return (
        <>
            <div className="loader">
                <span></span>
            </div>
            <svg className='loaderSvg'>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    </filter>
                </defs>
            </svg>
        </>
    )
}
