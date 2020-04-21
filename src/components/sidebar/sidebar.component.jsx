import React from 'react';

import './sidebar.styles.scss';
import NoteComponent from '../note/note.component';

const notes = [
    {
        title: 'Hello',
        text: 'First note yeeeaahh',
    },
    {
        title: 'Second note',
        text: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    },
    {
        title: 'Anothe note',
        text: 'fghh',
    },
    {
        title: 'Hello2',
        text: '&glkokkj',
    },

];

const SideBarComponent = () => {
    return (
        <div className='sidebar'>
            <CustomButtonComponent />
            <button>Click me!</button>
            {
                notes.map(note => (
                    <NoteComponent note={note} />
                ))
            }
        </div>
    );
}

export default SideBarComponent;