import React from 'react';

import EditorComponent from '../../components/editor/editor.component';
import SideBarComponent from '../../components/sidebar/sidebar.component';

import './content.styles.scss';

const ContentComponent = () => {
    return (
        <div className='content'>
            <SideBarComponent />
            <EditorComponent />
        </div>
    );
}

export default ContentComponent;