'use client';

import React, { useState } from 'react';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';

interface RichTextEditorProps {
  value: string; // Text for the Editor component
  onTextChange: (e: EditorTextChangeEvent) => void;
  style?: React.CSSProperties; // Optional style prop
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onTextChange,
  style,
}) => {
  return (
    <div className="card">
      <Editor
        value={value} // Assign the value prop
        onTextChange={onTextChange} // Correct event handler
        style={style} // Optional style
      />
    </div>
  );
};

export default RichTextEditor;
