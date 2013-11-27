/// <reference path="../lib/jquery-2.0.3.min.js" />
/// <reference path="../lib/knockout-3.0.0.min.js" />
/// <reference path="../lib/underscore.js" />
/// <reference path="../lib/knockout-es5.min.js" />
/// <reference path="../models/product.js" />
/// <reference path="../lib/toastr.js" />

/*global define: true */
define(function (require) {
    'use strict';

    var ko = require('knockout'),
        $ = require('jquery'),
        _ = require('underscore'),
        Product = require('models/product'),
        toastr = require('toastr');
    
    require('ko_es5');

    /**
    * Initializes a new instance of the ProductsViewModel class
    * @constructor
    */
    function ProductsViewModel() {
        this.products = [];
        this.title = 'Products';

        this.searchText = '';

        this.newProduct = new Product();

        ko.track(this);
    }

    /**
    * Gets all produts
    */
    ProductsViewModel.prototype.getAllProducts = function () {
        var self = this;

        // Send an AJAX request
        $.getJSON('api/products/').done(function (products) {
            var productList = [];
            _.each(products, function (item) {
                productList.push(new Product(item));
            });

            self.products = productList;
        }).fail(function (jqXhr, textStatus, err) {
            toastr.error(err, 'Error saving product');
        });
    };

    /**
    * Searches for a product with the given id.
    */
    ProductsViewModel.prototype.findProduct = function () {
        var self = this;

        $.getJSON('api/products/' + encodeURIComponent(self.searchText)).done(function (product) {
            toastr.success('Found product: ' + product.name + '<br/> with id: ' + product.id + '<br/> in category: ' + product.category);
        }).fail(function (jqXhr, textStatus, err) {
            toastr.error(err, 'Error getting product by id');
        });
    };

    /**
    * Deletes a given product.
    * @param {Product} productToDelete - The product to delete
    */
    ProductsViewModel.prototype.deleteProduct = function (productToDelete) {
        var self = this;

        $.ajax({
            url: 'api/products/' + encodeURIComponent(productToDelete.id),
            type: 'DELETE'
        }).done(function () {
            self.products.remove(productToDelete);
        }).fail(function (jqXHR, textStatus, err) {
            toastr.error(err, 'Error deleting product');
        });
    };

    /**
    * Adds a new product, then updates its id with that given by the server
    */
    ProductsViewModel.prototype.addProduct = function () {
        var self = this;

        $.ajax({
            url: 'api/products',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(self.newProduct)
        }).done(function (newId) {
            // webservice returns the id of the new product, update our model
            self.newProduct.id = newId;
            self.products.push(self.newProduct);

            // clear out the add product form
            self.newProduct = new Product();
        }).fail(function (jqXHR, textStatus, err) {
            toastr.error(err, 'Error adding new product');
        });
    };

    /**
    * Saves changes to the given product.
    * @param {Product} productToDelete - The product to save
    */
    ProductsViewModel.prototype.saveProduct = function (product) {
        $.ajax({
            url: 'api/products/' + encodeURIComponent(product.id),
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(product)
        }).done(function (id) {
            product.isInEditMode = false;
        }).fail(function (jqXHR, textStatus, err) {
            toastr.error(err, 'Error saving product');
        });
    };

    ProductsViewModel.prototype.rpcGetSample = function () {
        $.getJSON('api/products/SomeOtherMethodName').done(function (result) {
            toastr.success(result);
        });
    };

    return ProductsViewModel;
});