(function () { 'use strict'; }());
console = console ? console : {};

(function(){
    var _Oversight = function() {

        this.url = undefined;
        this.queue = [];

        this._buildParams = function(params) {
            var formString = "";
            for (var k in params) {
                if (formString.length > 0) formString = formString + "&";
                formString = formString + encodeURIComponent(k);
                formString = formString + "=" + encodeURIComponent(params[k]);
            }
            return formString;
        };

        this.setUrl = function(url) {
            this.url = url;
            for(var q in this.queue) { this.inform(this.queue[q]); }
            this.queue = [];
        };

        this.isErroneous = function(status) {
            var upcode = status.toString()[0];
            return upcode === '4' || upcode === '5';
        };

        this.inform = function(params) {
            if(!this.url) {
                this.queue.push(params);
                return;
            }

            var req;
            if (window.XMLHttpRequest) { req = new XMLHttpRequest(); }
            else { req = new ActiveXObject("Microsoft.XMLHTTP"); }

            req.open("POST",this.url,true);
            req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            req.send(this._buildParams(params));
        };

    };

    Oversight = new _Oversight();
    
    window.onerror = function(msg, origin, line, col, err) {
        var stack = (msg + " at " + origin + ":" + line + ")");
        if(err) stack = err.stack;
        
        Oversight.inform({
            event: 'onerror',
            trace: stack
        });
        return false;
    };

    var temp = XMLHttpRequest.prototype.getAllResponseHeaders;
    XMLHttpRequest.prototype.getAllResponseHeaders = function() {
        if(Oversight.isErroneous(this.status)) {
            Oversight.inform({
                event: 'ajax',
                status: this.status,
                trace: this.response
            });
        }
        temp.apply(this, arguments);
    };
    
})();
