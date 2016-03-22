/**
 *
 */
var Quill = require('quill');

/**
 *
 */
var myquill = React.createClass({
    //========================================================================
    //
    // mount

    /**
     * 這是 component API, 在 mount 前會跑一次，取值做為 this.state 的預設值
     */
    getInitialState: function() {
      return null;
    },

    /**
     *
     */
    componentDidMount: function() {
      var quill = new Quill('#editor');
      quill.addModule('toolbar', { container: '#toolbar' });

      quill.on('text-change', function(delta, source) {
        console.log('Editor contents have changed', delta);
        console.log('[allenkk]HTML='+quill.getHTML());
      });

      //quill.insertText(11, ' Bilbo');
      console.log(quill.getText());   // Should output "Hello World Bilbo!\nSome initial bold text";

    },

    //========================================================================
    //
    // render

    /**
     *
     */
    render: function() {
            return (
                <div>
                  <div id="toolbar">
                    <button className="ql-bold">Bold</button>
                    <button className="ql-italic">Italic</button>
                  </div>
                  <div id="editor">
                    <div>Hello World!</div>
                    <div>Some initial <b>bold</b> text</div>
                  </div>
                </div>
            )
    },
});

module.exports = myquill;