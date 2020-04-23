import React from 'react';

import './note.styles.scss';

const NoteComponent = ({ note }) => {
    return (
        <div className='note'>
            {/*<div className='note__timpestamp'>
                <span>{note.createAt.toLocaleString()}</span>
            </div>*/}
            <div className='note__title'>
                <h4>{note.title}</h4>
            </div>
            <div className='note__text'>
                <span>{
                    note.text.length > 40 ?
                        note.text.slice(0, 40) + '...' :
                        note.text
                }</span>
            </div>
        </div>
    );
};

export default NoteComponent;