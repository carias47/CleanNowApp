const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config({ path: "src/.env" });

const envFile = `export const environment = { 
    NOMBRE_DE_VARIABLE: ' ${process.env.baseUrl} ', 
    OTRO_NOMBRE_DE_VARIABLE: ' ${process.env.apiKey} ', 
} ; 
`;
const targetPath = path.join(__dirname, "./src/environments/environment.ts");
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Entorno generado environment.development.ts`
    );
  }
});
