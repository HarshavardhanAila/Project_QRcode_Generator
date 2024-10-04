/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
    .prompt([
        {
            name: 'URL',
            message: 'Enter the URL you want to convert to a QR code:',
            type: 'input'
        }
    ])
    .then((answers) => {
        const url = answers.URL;

        // Generate QR code
        const qr_svg = qr.image(url, { type: 'png' });
        qr_svg.pipe(fs.createWriteStream('qr_code.png'));

        // Save URL to text file
        fs.writeFile('URL.txt', url, (err) => {
            if (err) throw err;
            console.log('The URL has been saved to URL.txt');
        });

        console.log('QR code has been generated as qr_code.svg');
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Something else went wrong", error);
        }
    });



