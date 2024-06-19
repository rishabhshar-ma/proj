import React from 'react';
import DOMPurify from 'dompurify';

const TextEditorRender = ({ htmlString }) => {
    const sanitizedHTML = DOMPurify.sanitize(htmlString);

    return (
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    );
};

export default TextEditorRender;
