# Progressive Web App - Sprekende kunst

## Sprekende kunst

The live version can be found here: [sprekende kunst](https://sprekende-kunst.netlify.app/).

## Features

### Server side rendering / Static serving

To enhance the reliability of the app I made with the Rijksmuseum API, I converted it to a server side rendered application. With the help of Node.js and express I was able to write a server that serves pre-rendered HTML files to the client so the client only has to render the HTML and query some urls from the internet. The logic is all handled on the server. This way, the processing speed of the client isn't much of an issue since it doesn't have to interpret and compile the javascript.

After converting it to an SSR application, I took on the challenge to make serve this application as a static site. So to pre-render the template-files to HTML files and send those to the client. Pretty much what de server does, but then manually in my case.

#### Scripts

To generate the HTML files, I wrote some scripts for ejs to render my templates with some predetermined data so a static page would rollout. In the [scripts](scripts/build-html.js)-folder, you can see how I composed the scripts. You can run this script in node to execute the functions and create a dist folder for distribution.

I defined this script in the package.json as "npm run build"
