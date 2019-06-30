import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ICat } from 'types';

import { Gallery } from 'components/Gallery';
import { List } from 'components/List';
import { Modal } from 'components/Modal';


import { cats } from 'assets/cats';

import './HomePage.scss';

export function HomePage() {
    const [user, setUser] = useState({ firstName: '' });
    const [isEdit, setIsEdit] = useState(false);
    const [editableItem, setEditableItem] = useState({ id: 0, src: '', name: '', date: 0, commentary: '' });
    const [items, setItems] = useState(cats);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user') || ''));
    }, [setUser]);

    const handleEdit = (event: React.MouseEvent<HTMLDivElement>) => {
        // @ts-ignore
        const item = (JSON.parse(event.currentTarget.dataset.item));

        setIsEdit(true);
        setEditableItem(item);
    }

    const handleCloseModal = () => {
        setIsEdit(false);
    }

    const handleSave = (cat:ICat) => {
        const filtered = items.filter(item=> item.id !== cat.id) 
       
        // @ts-ignore
         setItems([...filtered, cat]);
    }
    

    return (
        <div className="home-page" >
            <div className="home-page__toolbar">
                <h1>Hi {user.firstName}!</h1>
                <h3><button className="btn btn-link">
                    <Link to="/login">Logout</Link>
                </button></h3>
            </div>
            <div className="home-page__wrapper">
                <Gallery />
                <List cats={items} onClickEdit={handleEdit} />
                <Modal
                    show={isEdit}
                    item={editableItem}
                    onClose={handleCloseModal}
                    onSave={handleSave} />
            </div>
        </div>
    );

}
