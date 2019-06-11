# Modern ES6/7, Webpack, Babel 7 boiler plate
#### With ES Modules (supports loading webpack bundle, for non-supported browsers)
#### This demo fetches [List of Users](https://jsonplaceholder.typicode.com/users) and displays username of each user

## Steps and FAQs:

###  Setup
    cd codeDir
    npm init -y
    npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-runtime webpack webpack-cli webpack-dev-server clean-webpack-plugin copy-webpack-plugin
    npm install --save @babel/runtime

> **Note:**  @babel/plugin-transform-runtime @babel/runtime are required to support ES7 **async/await** features. We may get following an error (**regeneratorruntime is not defined**) without this.


### Configuration

Create file **.babelrc** in project root, with following content

    {
	    "presets": ["@babel/preset-env"],
	    "plugins": [["@babel/plugin-proposal-object-rest-spread"], ["@babel/transform-runtime"]]
	}

Add following key-value pairs in top level `scripts`  property in **package.json**

    
	"build": "webpack", // 'npm run build' to compile code
	"start": "webpack-dev-server --open" // 'npm start' to run server. Will be served from devServer entry in webpack config
	

Create **webpack.config.js** in project root, as listed [here](https://raw.githubusercontent.com/saket-p/BabelWebPackStarter/master/webpack.config.js)

**Notes** regarding webpack config :
> 1. No need to add babel specific presets/plugins to options object in babel-loader, as it will be picked up from .babelrc itself.
> 2. Ideally, I should use loaders such as style-loader, css-loader, file-loader and then import assets in js files. But, since in this very simple example, we are not using any templates or components, I will be using **copy-webpack-plugin** to copy non-js assets (htmls, css, images etc..) to build  directory.
> 3. Could have used html-webpack-plugin to generate html in build dir, but since it injects its own script tag, and I want to inject script tag with 'nomodule' attr (as a fallback to load webpack bundle in browsers, which still do not support ES2015+ modules), so skipping it too. Lets copy the individual html file using above 'copy-webpack-plugin' plugin.

### ES6 module support

[ES module](https://developers.google.com/web/fundamentals/primers/modules) loading and fallback is enabled by having following

#### index.html
    <script type="module" src="src/index.js"></script>
    <script nomodule src="bundle.es5.js"></script>

>**Note**: Browsers not yet supporting ES modules, will be served webpack generated transpiled bundle (bundle.es5.js) 

### Starting

    npm run build
    npm start

> Browse to: http://localhost:8080
