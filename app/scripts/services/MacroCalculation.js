/**
 * Created by Abdullah-Mac on 1/10/15.
 */
(function () {
    'use strict';

    angular.module('NutritionTracker')

        // Factory to do the calculations on the calorie page
        .factory('MacroCalculation', [function () {

            var macros = [
                {
                    'type': 'protein',
                    'amount': null,
                    'multiplier': 4,
                    'tip': 'Calories per gram of protein',
                    'total': function () {return this.amount * this.multiplier; }
                },
                {
                    'type': 'carbohydrate',
                    'amount': null,
                    'multiplier': 4,
                    'tip': 'Calories per gram of carbohydrate',
                    'total': function () {return this.amount * this.multiplier; }
                },
                {
                    'type': 'fat',
                    'amount': null,
                    'multiplier': 9,
                    'tip': 'Calories per gram of fat',
                    'total': function () {return this.amount * this.multiplier; }
                }];


            var getMacros = function () {
                return macros;
            };
            
            var i = 0, values = 0, length = macros.length;
            
            var totals = function () {
                for (i, values, length; i < length; i += 1) {
                    values += macros[i].amount * macros[i].multiplier;
                }
                return values;
            };

            var getTotals = function () {
                return totals;
            };

            return {
                macros: getMacros,
                totals: getTotals
            };

        }]);
}());