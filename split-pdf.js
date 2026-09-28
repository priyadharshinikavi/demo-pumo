const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function splitPdf() {
  console.log('Loading UI UX MASTERS.pdf...');
  const pdfBytes = fs.readFileSync('UI UX MASTERS.pdf');
  const srcDoc = await PDFDocument.load(pdfBytes);
  
  const newDoc = await PDFDocument.create();
  
  // The first page of the source document
  const [srcPage] = await newDoc.embedPdf(pdfBytes, [0]);
  
  const width = srcPage.width;
  const height = srcPage.height;
  
  // A4 proportion: 1:1.414
  const sliceHeight = width * 1.414;
  const numPages = Math.ceil(height / sliceHeight);
  
  console.log(`Original dimensions: ${width} x ${height}`);
  console.log(`Splitting into ${numPages} pages of ${width} x ${sliceHeight}`);
  
  for (let i = 0; i < numPages; i++) {
    const page = newDoc.addPage([width, sliceHeight]);
    
    // PDF coordinates start from bottom-left.
    // To show the top slice (i=0), we must shift the tall page down.
    // We want the top of the original page (y=height) to align with the top of the new page (y=sliceHeight).
    // So the shift y = sliceHeight - height.
    // For subsequent slices, we shift it up by an additional i * sliceHeight.
    const yOffset = sliceHeight - height + (i * sliceHeight);
    
    page.drawPage(srcPage, {
      x: 0,
      y: yOffset,
      width: width,
      height: height,
    });
    
    console.log(`Rendered page ${i + 1} with yOffset ${yOffset}`);
  }
  
  const pdfBytesOut = await newDoc.save();
  fs.writeFileSync('UI UX MASTERS - Paginated.pdf', pdfBytesOut);
  console.log('Successfully saved to UI UX MASTERS - Paginated.pdf');
}

splitPdf().catch(err => console.error(err));
