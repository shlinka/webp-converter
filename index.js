const fs = require("fs");
const imagescript = require('imagescript');
const webp = require('webp-converter');

const inputPath = "./input";
const outputPath = "./output"

const recursiveFolder = async (path) => {
    const files = fs.readdirSync(path);
    files.map(async (file) => {
        const fullPath = `${path}/${file}`;
        const isDirectory = fs.lstatSync(fullPath).isDirectory();

        if (isDirectory) {
            await recursiveFolder(fullPath);
            return;
        }

        const finalOutputFolder = fullPath.replace(file, "").replace(inputPath, outputPath);
        const folderExists = fs.existsSync(finalOutputFolder);
        if (!folderExists) {
            fs.mkdirSync(finalOutputFolder);
        }

        const finalOutput = fullPath.replace(".jpg", ".webp").replace(".jpeg", ".webp").replace(inputPath, outputPath);

        await webp.cwebp(fullPath, finalOutput, "-q 100", logging="-v");
        console.log("image created at:", finalOutput);
    });
};

const main = async () => {
    await recursiveFolder(inputPath);
};

main();