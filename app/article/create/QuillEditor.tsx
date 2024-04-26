import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Typography } from '@mui/material';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  return (
    <div>
      <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
        Content
      </Typography>
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        style={{ height: '200px' }}
      />
    </div>
  );
};

export default QuillEditor;
