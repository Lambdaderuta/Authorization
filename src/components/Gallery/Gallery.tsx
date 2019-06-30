import React, { useState } from 'react';
import classNames from 'classnames';

import { cats } from 'assets/cats';

import './Gallery.scss';



export function Gallery() {
    const [selectedImg, setSelectedImg] = useState(cats[0]);

    const handleSelectImg = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = Number(e.currentTarget.dataset.id);
        setSelectedImg(cats[target]);
    }

    

    return <div className='gallery'>
        <div className='gallery__wrapper'>
            <div className='gallery__selected-image'>             
                <img src={selectedImg.src} alt='X' height='500' width='1005' />   
            </div>
            <div className='gallery__image-set'>
                {cats.map(el => <div key={el.id} className={classNames({ 'gallery__active': el.id === selectedImg.id })} data-id={el.id} onClick={handleSelectImg} role='button'> <img key={el.id} src={el.src} alt='X' height="200" width="200" /> </div>)
                }
            </div>
        </div>
    </div>
}