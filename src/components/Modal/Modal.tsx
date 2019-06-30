import React, { useState, useEffect } from 'react';
import moment from 'moment';
import classnames from 'classnames';

import { ICat } from 'types';

import './Modal.scss';

interface IModalProps {
    item: ICat;
    onClose: () => void;
    show: boolean;
    onSave: (editedItem: ICat) => void;
}

export function Modal(props: IModalProps) {
    const { item, show, onClose, onSave } = props;
    const [date,setDate]=useState(item.date);
    const [commentary, setCommentary]=useState(item.commentary);

    useEffect(() => {
        setDate(moment(item.date).format("YYYY-MM-DD"))
        setCommentary(item.commentary)
    }, [item, setDate, setCommentary])


    

    const handleChangeCommentary = (e) => {
        const { value } = e.target;

        setCommentary(value);
    }

    const handleChangeDate = (e) => {

        setDate(moment(e.currentTarget.valueAsNumber).format("YYYY-MM-DD"));
    }

    const handleSave = () => {
        onSave && onSave({...item, date:moment(date).valueOf(), commentary});

        onClose();
    }

    const handleExit = () => {
        setDate(item.date);
        setCommentary(item.commentary);

        onClose && onClose();
    }

    return <div >

        <div className={classnames('modal-form', {'modal-form__active': show})}
        >
            <div className='modal-form__header'>
                <span className='modal-form__btn-close' onClick={onClose}>×</span>
            </div>
            <div className='modal-form__body'>
                <p>
                    <textarea id='noter-text-area' name="commentary" value={commentary} onChange={handleChangeCommentary} />
                </p>
                <p>
                    <input type='date' name="date" value={date} onChange={handleChangeDate} />
                </p>
            </div>
            <div className='modal-form__footer'>
                <button className='btn btn-success' onClick={handleSave}>Save</button>
                <button className='btn btn-danger' onClick={handleExit}>Close</button>
            </div>
        </div>
    </div>;
}