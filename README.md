# Modern ES2015+, Webpack, Babel 7 boiler plate
### With ES Modules (supports loading webpack bundle, for non-supported browsers)
### This demo fetches [list of users!] (https://jsonplaceholder.typicode.com/users) and displays username of each user

## Steps and FAQs:

1. `cd codedir`
2. `npm init -y`
3. `npm install --save-dev babel-loader @babel/core webpack webpack-cli webpack-dev-server`
4. Create file **.babelrc**
    - `npm install --save-dev @babel/preset-env @babel/plugin-proposal-object-rest-spread  // transforms for ES2015+`
    - To enable the above preset add following, in above created .babelrc file.
        ```{
            "presets": ["@babel/preset-env"],
            "plugins": ['@babel/plugin-proposal-object-rest-spread']
        }```
4. Add following entries in "script" object in package.json: 
    `"build": "webpack", // 'npm run build' to compile code`
    `"start": "webpack-dev-server --open" // 'npm start' to run server. Will be served from devServer entry in webpack config`
5. Create **webpack.config.js** in project root
    - NOTE: No need to add json in point 4 to options object in babel-loader, as it will be picked up from .babelrc itself.

6. When using Async/Await, we get this error: **regeneratorruntime is not defined**. To solve this, execute:
    - `npm install --save @babel/runtime `
    - `npm install --save-dev @babel/plugin-transform-runtime`
    - Add ["@babel/transform-runtime"] to plugins in .babelrc. So final .babelrc should look like:
        ```{
            "presets": ["@babel/preset-env"],
            "plugins": [["@babel/plugin-proposal-object-rest-spread"], ["@babel/transform-runtime"]]
        }```
7. Ideally, I should use loaders such as style-loader, css-loader, file-loader and then import assets in js files. But, since in this very simple example, we are not using any templates or components, I will be using **copy-webpack-plugin** to copy non-js assets (htmls, css, images etc..) to build  directory.
8. Could have used html-webpack-plugin to generate html in build dir, but since it injects its own script tag, and I want to inject script tag with 'nomodule' attr (as a fallback to load webpack bundle in browsers, which still do not support ES2015+ modules), so skipping it too. Lets copy the individual html file using above 'copy-webpack-plugin' plugin.
9. ES module loading and fallback is enabled by having following script tag in index.html. [More Details!] (https://developers.google.com/web/fundamentals/primers/modules).
    - ```<script type="module" src="src/index.js"></script>```
    - ```<script nomodule src="bundle.es5.js"></script>```

