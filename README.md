# Image To Text Api/Gui

A image to text api/gui built on node.js, tesseract.js.

## Build

![Node.js CI](https://github.com/sghosh1810/Image-To-Text-Api/workflows/Node.js%20CI/badge.svg?branch=master)

## Usage

If your public url is example.com then api will be at example.com/api.
Acceptable parameters:
- url : public url of image (required)
-  json : true/false (optional)


## Deploy on your Heroku
First clone the repository or download as zip
```bash
heroku login
cd proj_dir/
git init
git add .
git commit -"Initial Conmmit"
git push heroku master
```

## Packages
Following dependencies are requireds to run the cnn model which detects different items in fridge.

```node
body-parser: "^1.19.0",
dotenv: "^8.2.0",
ejs: "^3.1.2",
express: "^4.17.1",
express-ejs-layouts: "^2.5.0",
install: "^0.13.0",
nodemon: "^2.0.3",
npm: "^6.14.5",
tesseract.js : "^2.1.1"
```
## Example of Api call via Postman
![main](https://res.cloudinary.com/websway/image/upload/v1588787524/Screenshot_2020-05-06_at_11.21.41_PM_ycg8ou.png)

## Gui
![main](https://res.cloudinary.com/websway/image/upload/v1588846712/Screenshot_2020-05-07_at_3.47.22_PM_viuaci.png)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Contributors: 
[Shounak Ghosh](https://github.com/sghosh1810/)

## License
[MIT](https://choosealicense.com/licenses/mit/)
