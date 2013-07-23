/*
 * WYMeditor : what you see is What You Mean web-based editor
 * Copyright (c) 2005 - 2012 Jean-Francois Hovinne, http://www.redactor.org/
 * Dual licensed under the MIT (MIT-license.txt)
 * and GPL (GPL-license.txt) licenses.
 *
 * For further information visit:
 *        http://www.redactor.org/
 *
 * File Name:
 *        jquery.redactor.embed.js
 *        Experimental embed plugin
 *
 * File Authors:
 *        Jonatan Lundin (jonatan.lundin a-t gmail dotcom)
 */

/*
 * ISSUES:
 * - The closing object tag seems to be stripped out...
 */
(function() {
    if (WYMeditor && WYMeditor.XhtmlValidator['_tags']['param']['attributes']) {
        
        WYMeditor.XhtmlValidator['_tags']["embed"] = {
            "attributes":[
                "allowscriptaccess",
                "allowfullscreen",
                "height",
                "src",
                "type",
                "width"
            ]
        };
        
        WYMeditor.XhtmlValidator['_tags']['param']['attributes'] = {
            '0':'name',
            '1':'type',
            'valuetype':/^(data|ref|object)$/,
            '2':'valuetype',
            '3':'value'
        };
        
        var XhtmlSaxListener = WYMeditor.XhtmlSaxListener;
        WYMeditor.XhtmlSaxListener = function () {
            var listener = XhtmlSaxListener.call(this);
            listener.block_tags.push('embed');
            return listener;
        };
        WYMeditor.XhtmlSaxListener.prototype = XhtmlSaxListener.prototype;
    }
})();
