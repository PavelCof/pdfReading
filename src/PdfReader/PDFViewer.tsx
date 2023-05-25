import React, { useEffect, useState } from 'react';
import { Document, Page ,pdfjs} from 'react-pdf';


interface PDFViewerProps {
  file: string; // Путь к PDF-файлу
  page?: number; // Путь к PDF-файлу
 
}


function PDFViewer({ file,page }:PDFViewerProps){
  pdfjs.GlobalWorkerOptions.workerSrc ="./pdfworker.js" // этот файл нужно разместить в папке public


  const [pagesCount,setPagesCount] = useState<number>(0);
  const [pageNow,setPageNow] = useState<number>(1);
  const pdfPath = process.env.PUBLIC_URL + file;

  function pageBack() {
    if(pageNow-1 > 0){
      setPageNow(pageNow-1)

      
    }
  }
  function pageNext() {
    if(pageNow+1 <= pagesCount){
      setPageNow(pageNow+1)
 
      
    }
  }


  function getNumPages(pdfPath:string) {
    return new Promise((resolve, reject) => {
      const loadingTask = pdfjs.getDocument(pdfPath);
      loadingTask.promise
        .then((pdf) => {
          resolve(pdf.numPages);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  

  useEffect(() => {
    getNumPages(pdfPath)
      .then((pages) => {
        console.log(pages,typeof pages );
        typeof pages === 'number' && setPagesCount(pages);

      })
      .catch((error) => {
        console.error('Error getting number of pages:', error);
      });
  }, [file,pdfPath]);
  
  return (
    <div >
        <div className='flex-row center'>       
             <button onClick={pageBack}>Назад</button> <div className='m-3 p-3'>{pageNow}</div>  <button onClick={pageNext}>Вперёд</button>  <div className='m-3 p-3'> всего страниц : {pagesCount}</div> 
        </div> 
        <div className='flex-row center'>  
          <Document file={pdfPath} className=' w858'>
            <Page pageNumber={pageNow} renderAnnotationLayer={false} renderTextLayer={false}  />
          </Document>
        </div> 
    </div>
  );
};

export default PDFViewer;


