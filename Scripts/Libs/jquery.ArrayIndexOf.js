
 jQuery.fn.ArrayIndexOf =
        function (fnc) {
            
            if (!fnc || typeof (fnc) != 'function') {
                return -1;
            }

            if (!this || !this.length || this.length < 1) return -2;

            for (var i = 0; i < this.length; i++) {
                if (fnc(this[i])) return i;
            }

            return -3;
        };

