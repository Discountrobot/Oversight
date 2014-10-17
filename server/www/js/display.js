(function () { 'use strict'; }());

var OversightApp = angular.module('OversightApp', ['ngResource', 'ngAnimate', 'highcharts-ng']);

OversightApp.factory('$exceptionHandler', function () {
  return function (exception, cause) {
      // Oversight.inform({
      //   trace: exception.stack,
      //   event: 'angular'
      // });
      throw exception;
      // console.error(exception.message);
  };
});

OversightApp.controller('ErrorsController', function($scope, $resource, $timeout) {

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'areaspline'
            }
        },
        series: [
        {
            data: [[1412114400000, 41]],
            color:'#CA3C3C',
            name: 'Errors',
            type: 'areaspline'
        },
        {
            data: [["label", 10],["label", 10]],
            name: "Pie",
            type: "pie",
            size: "40%",
            center: ["95%", "10%"],
            dataLabels: {
                enabled: false
            }
        }
        ],
        title: {
            text: 'Hello'
        },

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { month: '%e. %b', year: '%b'},
            title: {text: 'Dates'}
        },

        yAxis: {
            title: {text: 'Errors'}
        },

        loading: false
    };

    var chartTransfromer = function() {

        var data = _.chain($scope.errors)
            .map(function(error){
                var d = new Date(error.date);
                return (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime();
            })
            .countBy(function(date){ return date; })
            .map(function(sum, key){ return [parseInt(key,10),sum]; })
            .value();

        var months = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        $scope.chartConfig.title.text = months[date.getMonth()];
        $scope.chartConfig.xAxis.min = firstDay.getTime();
        $scope.chartConfig.xAxis.max = lastDay.getTime();
        $scope.chartConfig.series[0].data = data;
    };


    var uniqueKeys = function(errors) {
        var keys = _.chain(errors)
            .map(function(obj){ return Object.keys(obj); })
            .flatten()
            .uniq()
            .filter(function(key) { return key.indexOf('__') !== 0; })
            .value();
        return keys;
    };

    var newErrors = function(new_errors, old_errors) {
        return _.chain(new_errors)
            .filter(function(error){
                return !_.findWhere(old_errors, error);
            })
            .value()
            .reverse();
    };

    var pollTimeout = 2000;
    var Errors  = $resource( '/errors');
    $scope.errors = [];

    var pollErrors = function() {
        Errors.query().$promise.then(function(errors) {

            var new_errors = newErrors(errors, $scope.errors);
            $scope.errors = new_errors.concat($scope.errors);
            $scope.errorKeys = uniqueKeys(errors);
            chartTransfromer();
        });
        $timeout(pollErrors, pollTimeout);
    };

    pollErrors();
});
