const withCSS = require('@zeit/next-css')
module.exports = withCSS({
	publicRuntimeConfig: { // Will be available on both server and client
    cloudinary: 'https://res.cloudinary.com/marjemaa'
  }

})
