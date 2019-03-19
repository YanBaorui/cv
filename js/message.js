// // 存储服务
// var AV = require('leancloud-storage');
// var { Query, User } = AV;
// // 实时消息服务
// var { Realtime, TextMessage } = require('leancloud-realtime');
// var APP_ID = 'xiaY7ID4836U3mIvM4aGbF2U-gzGzoHsz';
// var APP_KEY = 'oh5WBE6DNpSwPGrJ6wxnDsjs';

// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY
// });
// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })

!function(){
  var model = {
    // 获取数据
    init: function(){
      var APP_ID = 'xiaY7ID4836U3mIvM4aGbF2U-gzGzoHsz'
      var APP_KEY = 'oh5WBE6DNpSwPGrJ6wxnDsjs'
      AV.init({ appId: APP_ID, appKey: APP_KEY })
    },
    fetch: function(){
      var query = new AV.Query('Message');
      return query.find() // Promise 对象
    },
    // 创建数据
    save: function(name, content){
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({  // Promise 对象
        'name': name,
        'content': content
      })
    }
  }

  var view = document.querySelector('section.message')


  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function(view, model){
      this.view = view
      this.model = model

      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function(){
      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item)=> item.attributes )
          array.forEach((item)=>{
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          })
        }
      )
    },
    bindEvents: function () {
            this.form.addEventListener('submit',  (e) => { // 箭头函数不会改this
                e.preventDefault()
                this.saveMessage()
            })
        },
    saveMessage: function(){
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      if(content ===''|| name ===''){
        alert('姓名或内容不能为空！')
      }else{
        this.model.save(name, content).then(function(object) {
          let li = document.createElement('li')
          li.innerText = `${object.attributes.name}: ${object.attributes.content}`
          let messageList = document.querySelector('#messageList')
          messageList.appendChild(li)
          myForm.querySelector('input[name=content]').value = ''
          console.log(object)
        })
      }
    }

  }

  controller.init(view, model)


}.call()
