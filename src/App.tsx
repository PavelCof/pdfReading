import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PDFViewer from './PdfReader/PDFViewer';
 import { pdfjs } from 'react-pdf';

function App() {
 
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



  const pdfFile = '/pdfs/123.pdf';


  return (
    <>
 
    <div className="App">
        <PDFViewer file={pdfFile}    />
    </div>
    </>

  );
}

export default App;
