/**
 * 
 */
var shortId = require('shortid');
var actions = require('../actions/AppActionCreator');
var Quill = require('quill');
var myhtml = null;
/**
 * 
 */
var comp = React.createClass({


  componentDidMount: function(){
      this.$input1 = $('#todo-input1');
      this.$input2 = $('#todo-input2');

      var quill = new Quill('#editor');
      quill.addModule('toolbar', { container: '#toolbar' });

      quill.on('text-change', function(delta, source) {
        myhtml = quill.getHTML();
        console.log('Editor contents have changed', delta);
        console.log('[allen] myhtml='+myhtml);
      });

      myhtml = quill.getHTML();
      console.log("quill final="+quill.getText());   // Should output "Hello World Bilbo!\nSome initial bold text";
},


  /**
   * supported events
   * http://facebook.github.io/react/docs/events.html
   */
  render: function() {

    return (
      
      <div className="input-box">
     
        <input id="todo-input1"
               className="search-input" 
               type="text" 
               
               placeholder="輸入待辦事項" 
               
               onKeyDown={this.handleKeyDown} />

        <input id="todo-input2"
               className="search-input"
               type="text"

               placeholder="輸入國家" 

               onKeyDown={this.handleKeyDown} />

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

        <button className="save-button right" onClick={this.handleSave}>Save</button>

      </div>
    );
  
  },

  
  /**
   * 按下 enter 就存檔
   */  
  handleKeyDown: function(evt){
      if( evt.keyCode == 13){
          this.handleSave();
      }
  },

  /**
   * 按下 save 鈕就存檔
   */
  handleSave: function(evt){

      var val1 = this.$input1.val();
      var val2 = this.$input2.val();
      var myhtml1= myhtml;
      console.log("[allen]myhtml1 = "+myhtml1);

      // 未輸入文字的話就擋掉
      if( val1.trim().length == 0 ) return;
      if( val2.trim().length == 0 ) return;

      var item = {};
      item.name = val1;
      item.country = val2;
      item.html = myhtml1;
      item.uid = shortId.generate();
      item.created = Date.now();

      actions.createTodo( item );

      // 清空輸入框，等待下一次的輸入
      this.$input1.val('');
      this.$input2.val('');
  },

  noop: function(){}

});

module.exports = comp;