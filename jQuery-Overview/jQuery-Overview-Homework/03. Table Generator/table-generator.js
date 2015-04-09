$(document).ready(function () {
    'use strict';

    var titles = ['Manufacturer', 'Model', 'Year', 'Price', 'Class'],
        input =
            '[{"manufacturer": "BMW", "model": "E92 320i", "year": 2011, "price": 50000, "class": "Family"}, ' +
            '{"manufacturer": "Porsche", "model": "Panamera", "year": 2012, "price": 100000, "class": "Sport"}, ' +
            '{"manufacturer": "Peugeot", "model": "305", "year": 1978, "price": 1000, "class": "Family"}]',
        tableInfo = JSON.parse(input);


    var $body = $(document.body),
        $table = $('<table>'),
        $tableHeader = $('<thead>'),
        $tableBody = $('<tbody>');

    $table.prependTo($body);
    $tableHeader.prependTo($table);
    $tableBody.appendTo($table);

    var $tableHeaderRow = $('<tr>');
    $tableHeaderRow.appendTo($tableHeader);

    titles.forEach(function (title) {
        var $tableHeadData = $('<th>');
        $tableHeadData.text(title);
        $tableHeadData.appendTo($tableHeaderRow);
    });

    tableInfo.forEach(function (car) {
        var $tableBodyRow = $('<tr>');
        $tableBodyRow.appendTo($tableBody);
        Object.keys(car).forEach(function (key) {
            var $tableBodyData = $('<td>');
            $tableBodyData.text(car[key]);
            $tableBodyData.appendTo($tableBodyRow);
        });
    });

});