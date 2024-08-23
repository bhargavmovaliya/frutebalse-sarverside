const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

// Construct absolute paths to font files
const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../../pablic/font/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../pablic/font/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../pablic/font/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../pablic/font/Roboto-MediumItalic.ttf')
    }
};

const printer = new PdfPrinter(fonts);

const exportpdfmake = () => {
    const docDefinition = {
        content: [
            [
                {
                    image:'./src/utliy/Image/Logo1.png',
                    cover: {width: 100, height: 100 },
                  }
            
            ],
            { text: 'Invoice', style: 'header', alignment: 'center'  },
            {
                text: [
                    { text: 'Name: ', bold: true }, 'Bhargav\n',
                    { text: 'Address: ', bold: true }, 'Opera Prins\n',
                    { text: 'Email: ', bold: true }, 'bhargavmovaliya576@gmail.com\n',
                    { text: 'Phone No: ', bold: true }, '9913001249\n'
                ]
            },
            {
                style: 'tableExample',
                alignment: 'center',
                table: {
                    headerRows: 1,
                    body: [
                        [{ text: 'Sr', style: 'tableHeader' }, { text: 'Item', style: 'tableHeader' }, { text: 'Quantity', style: 'tableHeader' }, { text: 'Price', style: 'tableHeader' }, { text: 'Total Price', style: 'tableHeader' }],
                        ['1', 'Samsung S23', '1', '50000', '50000'],
                        ['2', 'Cover', '2', '1000', '2000'],
                        [{ text: 'Total amaunt', colSpan: 4, alignment: 'center' }, {}, {}, {}, { text: '52000', bold: true }]
                    ]
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        }
    };
    

    // Construct the absolute path for the output PDF
    const outputPath = path.join(__dirname, '../../../../../Fruits_full_stack/backend/ecommers/document.pdf');

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputPath));
    pdfDoc.end();
}


module.exports = exportpdfmake;
