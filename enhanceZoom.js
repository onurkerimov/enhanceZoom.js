/*
 * enhanceZoom.js v0.1
 * Copyright (c) 2018 Onur Kerimov
 * http://github.com/onurkerimov
 * Licensed under the MIT license
 */

(function() {
    var sheet = document.createElement('style');
    sheet.type = 'text/css';
    document.head.appendChild(sheet);

    function $enhanceZoom(selector, options = {}) {

        function fn() {

            var r = window.devicePixelRatio
            var factor = (options.factor !== undefined) ? options.factor : 0.99;
            var stretch = (options.stretch !== undefined) ? options.stretch : false;
            var formula = (options.formula !== undefined) ? options.formula : ((r) => Math.pow(r, factor - 1));
            var ratio = formula(r)


            var cssText = `
                    transform: scale(${ratio});
                    -webkit-transform: scale(${ratio});
                    -moz-transform: scale(${ratio});
                    transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;
                    -moz-transform-origin: 0 0;`

            if (stretch) {
                cssText += `
                        width: ${100/ratio}%;
                        height: ${100/ratio}%;`
            }
            injectCSS(`${selector}{${cssText}}`)

        }

        fn()

        window.addEventListener('resize', function() {

            Array.from(sheet.childNodes).forEach(function(el) {
                var data = el.data
                console.log("data", data);
                var index = data.indexOf('{')
                var str = data.substring(0, index)

                if (str === selector) {
                    sheet.removeChild(el)
                }
            })

            fn()
        })

    }

    function injectCSS(rule) {
        if (sheet.styleSheet) sheet.styleSheet.cssText = rule; // Support for IE
        else sheet.appendChild(document.createTextNode(rule)); // Support for the rest
    }

    if ($) {
        $.enhanceZoom = $enhanceZoom
    } else {
        window.$enhanceZoom = $enhanceZoom
    }

})();