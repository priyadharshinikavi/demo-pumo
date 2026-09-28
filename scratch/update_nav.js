const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..');

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    
    files.forEach((file) => {
        if (path.extname(file) === '.html') {
            const filePath = path.join(directoryPath, file);
            
            // Read file content
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                
                // Replace index.html#contact or #contact with contact.html
                if (data.includes('href="#contact"') || data.includes('href="index.html#contact"')) {
                    let result = data.replace(/href="#contact"/g, 'href="contact.html"');
                    result = result.replace(/href="index.html#contact"/g, 'href="contact.html"');
                    
                    fs.writeFile(filePath, result, 'utf8', (err) => {
                        if (err) return console.log(err);
                        console.log(`Updated ${file}`);
                    });
                }
            });
        }
    });
});
