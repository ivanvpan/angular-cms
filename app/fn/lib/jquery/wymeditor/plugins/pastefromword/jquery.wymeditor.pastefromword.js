WYMeditor.editor.prototype.pastefromword = function()
{
    var _wym = this,
        _orig;

    function _removeWordStyleTag(html)
    {
        return html.toString()
                   .replace(/<style>(\n*.*\n*)*?<\/style>/g, "")
                   .replace(/\n\n+/g, "\n")
                   .replace(/<p>(\n*\s*\n*)<\/p>/, "");
    }

    function _getSanitizedHTML()
    {
        var s = new Sanitize(Sanitize.Config.CUSTOM);
        return s.clean_node(_wym._doc.body);
    }

    function _replaceHTML(fragment)
    {
        if (fragment)
        {
            _wym.html("");
            _wym._doc.body.appendChild(fragment.cloneNode(true));
        }
    }

    jQuery(_wym._doc.body).bind({
        "mousedown": function(evt) {
            _orig = _wym.html();
        },
        "keydown": function(evt) {
            _orig = _wym.html();
        },
        "paste": function(evt) {
            window.setTimeout(function(){
                var html = _wym.html(), fragment;
                if (_orig !== html)
                {
                    html = _removeWordStyleTag(html);
                    _wym.html(html);

                    fragment = _getSanitizedHTML();
                    _replaceHTML(fragment);
                }
            }, 100)
        }
    });

};
