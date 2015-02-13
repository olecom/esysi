/*
* object.watch v1.0: Cross-browser object.watch
* <a href="http://code.eligrey.com/object.watch/" title="http://code.eligrey.com/object.watch/">http://code.eligrey.com/object.watch/</a>
*
* By Elijah Grey, <a href="http://eligrey.com" title="http://eligrey.com">http://eligrey.com</a>
*
* A shim that partially implements object.watch and object.unwatch
* in browsers that have accessor support.
*
* Public Domain.
* NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
*/

/*
* Adapted by Rahul Singla (<a href="http://www.rahulsingla.com" title="http://www.rahulsingla.com">http://www.rahulsingla.com</a>)
* to run as static methods on Object instead of
* being put into Object prototype.
*/

Object.watch = function (obj, prop, handler) {
    var oldval = obj[prop], newval = oldval,
        getter = function () {
            return newval;
        },
        setter = function (val) {
            oldval = newval;
            return newval = handler.call(obj, prop, oldval, val);
        };
    //if (delete obj[prop]) { // can't watch constants
        if (Object.defineProperty) // ECMAScript 5
            Object.defineProperty(obj, prop, {
                get: getter,
                set: setter
            });
        else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) { // legacy
            Object.prototype.__defineGetter__.call(obj, prop, getter);
            Object.prototype.__defineSetter__.call(obj, prop, setter);
        }
    //}
};

Object.unwatch = function (obj, prop) {
    var val = obj[prop];
    delete obj[prop]; // remove accessors
    obj[prop] = val;
};