import * as fs from 'node:fs/promises';

// Get the files in current directory
// before deletion
await getFilesInDirectory(_logger);

// Delete example_file.txt
getFilesInDirectory((file)=>{
    fs.unlink( `${process.cwd()}/log/${file}`, (err => {
        if (err) console.log(err);
        else {
            console.log("\nDeleted file: example_file.txt");
    
            // Get the files in current directory
            // after deletion
            getFilesInDirectory(_logger);
        }
    }));    
});

// Function to get current filenames
// in directory with specific extension
async function getFilesInDirectory(cb) {
    console.log("\nFiles present in directory:");
    let files = await fs.readdir(`${process.cwd()}/log`);
    files.forEach(file => {
        cb(file)
    });
}

function _logger(file) {
    console.log(file);
}