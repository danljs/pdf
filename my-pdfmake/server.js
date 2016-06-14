var http = require('http'),
    express = require('express'),
    path = require('path'),
    fs = require('fs'),
    pdfMakePrinter = require('pdfmake/src/printer');

var app = express();
var rootDir = path.resolve(path.dirname(module.uri));

app.use(express.static(rootDir));

app.get('/', function(req, res) {})

function createPdfBinary(fontDescriptors, pdfDoc, callback) {

  var printer = new pdfMakePrinter(fontDescriptors);
  var doc = printer.createPdfKitDocument(pdfDoc);
  var chunks = [];

  doc.on('data', function (chunk) {
    chunks.push(chunk);
  });

  doc.on('end', function () {
    callback(Buffer.concat(chunks));
  });
  doc.end();
}

app.get('/pdf', function (req, res) {
  var fontDescriptors = {
    msyh: {
      normal: 'msyh.ttf',
      bold: 'msyh.ttf'
    }
  };

	var docDefinition = { 
		content: [
      { text: 'Tables', style: 'header' },
      '和This is an sample PDF printed with pdfMake和',
      {
        style: 'tableExample',
        table: {
          body: [
            [
              { text: 'Column 1', style: 'tableHeader', alignment: 'center' },
              { text: 'Column 2', style: 'tableHeader', alignment: 'center' },
              { text: 'Column 3', style: 'tableHeader', alignment: 'center' }
            ],
            ['One value goes here王', 'Another one here王', 'OK王?']
          ]
        }
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
		defaultStyle: {
  		font: 'msyh'
		}
	};

  createPdfBinary(fontDescriptors, docDefinition, function(binary) {
    var file_name = __dirname + '/test.pdf';
    fs.writeFile(file_name, binary , function(err) {
	    if(err) {return console.log(err);}
      res.download(file_name);
		});
    }, function(error) {
      res.send('ERROR:' + error);
  });
});

var server = http.createServer(app);
var port = process.env.PORT || 1234;
server.listen(port);

console.log('http server listening on %d', port);