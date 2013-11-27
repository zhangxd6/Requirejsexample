/// <reference path="lib/require.js" />

/*global requirejs: true, define: true */
requirejs.config({
    paths: {
        'vm': 'viewmodels',
        'text': 'lib/require/text',
        'knockout': 'lib/knockout-3.0.0.min',
        'ko_es5': 'lib/knockout-es5.min',
        'ko_punches': 'lib/knockout.punches',
        'jquery': 'lib/jquery-2.0.3.min',
        'toastr': 'lib/toastr',
        'underscore': 'lib/underscore'
    },
    shim: {
        'ko_es5': {
            deps: ['knockout']
        },
        'ko_punches': {
            deps: ['knockout']
        },
        'knockout': {
            exports: 'ko'
        },
        'jquery': {
            exports: '$'
        },
        'toastr': {
            exports: 'toastr'
        },
        'underscore': {
            exports: '_'
        }
    }
    //urlArgs: "ver=" + window.appSettings.productVersion +
    //    "." + window.appSettings.majorVersion +
    //    "." + window.appSettings.minorVersion +
    //    "." + window.appSettings.build
});

define(function (require) {
    'use strict';

    var ko = require('knockout'),
        ProductsViewModel = require('vm/products'),
        toastr = require('toastr');

    require('ko_punches');

    ko.punches.interpolationMarkup.enable();
    toastr.options.newestOnTop = false;

    var productsViewModel = new ProductsViewModel();
    productsViewModel.getAllProducts();

    ko.applyBindings(productsViewModel);
});