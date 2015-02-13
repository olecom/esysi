jQuery.fn.translate = function (field) {
    var that = this;
    $.each(that, function (i_row, row) {
        while (row[field].indexOf('%ttl') != -1) {
            var i1 = row[field].indexOf('%');
            if (i1 == -1) return;
            var i2 = row[field].indexOf('%', i1 + 1);
            if (i2 == -1) return;
            var term = row[field].substr(i1 + 1, i2 - i1 - 1);
            if (typeof config[term] != 'undefined') {
                row[field] = row[field].replace('%' + term + '%', config[term]);
            }
            else {
                row[field] = row[field].replace('%' + term + '%', term);
            }
        }
    });
    return that;
};

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}