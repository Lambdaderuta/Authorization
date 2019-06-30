import React, { useState } from 'react';
import { ICat } from 'types';
import moment from 'moment';

import './List.scss';

interface IListProps {
    cats: ICat[]
    onClickEdit: any;
}

export function List(props: IListProps) {
    const { cats, onClickEdit } = props;

    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClickEdit && onClickEdit(event)
    }

    return <div className='list'>
        {cats.map(item => <div className='list__wrapper'> <div className='list__item' key={item.id}><div className='list__item--row' >
            <div className='list__prop--name' >{`Имя : ${item.name}`}</div>
            <div className='list__prop--date'>{`Дата : ${moment(item.date).format("YYYY-MM-DD")}`}</div>

        </div>
            <div className='list__item--row'>{`Комментарий : ${item.commentary}`}</div>
        </div >
            <button data-item={JSON.stringify(item)} type='button' onClick={handleEdit}>Edit</button>
        </div>
        )}
    </div>;
}