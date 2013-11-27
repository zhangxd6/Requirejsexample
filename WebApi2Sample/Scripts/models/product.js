/// <reference path="../lib/jquery-2.0.3.min.js" />
/// <reference path="../lib/knockout-3.0.0.min.js" />
/// <reference path="../lib/underscore.js" />
/// <reference path="../lib/knockout-es5.min.js" />
/// <reference path="../lib/require.js" />

/*global define: true */
define(function (require) {
    'use strict';

    var ko = require('knockout');
    
    require('ko_es5');

    /**
    * Initializes a new instance of the Product class
    * @param {object} data - If supplied the data object
    *   is used to populate the property values
    * @constructor
    */
    function Product(data) {
        data = data || {};

        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.price = data.price;

        this.isInEditMode = false;

        ko.track(this);
    }

    /**
    * Enables editing for this product.
    */
    Product.prototype.setEditable = function () {
        this.isInEditMode = true;
    };

    return Product;
});