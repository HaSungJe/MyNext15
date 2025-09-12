import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type QuillEditorProps = {
    value: string;
    maxHeight: number;
    marginBottom: number;
    setFunction: Function;
}

const modules = {
    toolbar: [
        // [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
    ],
};

const formats = [
    "font",
    "size",
    "header",
    "color",
    "background",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    //"bullet",
    "indent",
    "link",
    "image",
];

/**
 * Editor
 * 
 * @param param0 
 * @returns 
 */
export function QuillEditor( {value, maxHeight, marginBottom, setFunction}: QuillEditorProps ) {
    const [editorHtml, setEditorHtml] = useState<string>(value);
    function changeHandel(html: any) {
        setEditorHtml(html);
        setFunction(editorHtml);
    }

    useEffect(() => {
        setEditorHtml(value);
    }, [value]);

    useEffect(() => {
        setFunction(editorHtml);
    }, [editorHtml]);

    return (
        <ReactQuill 
            theme="snow" 
            value={editorHtml} 
            onChange={changeHandel} 
            modules={modules} 
            formats={formats} 
            style={{height: `${maxHeight | 500}px`, marginBottom: `${marginBottom | 50}px`}}
        />
    )
}