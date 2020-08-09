export default class Lowly {

  constructor() {
    let self = this;
    
    let autoLoadModules = [{
      name:"Events",
      file: "./events.js",
      callback:function(e)
      {
        window.Events = new e.default();
      }
    },{
      tag: "app-screen",
      file: './screen.js'
    }];
    
    autoLoadModules.forEach((m) => {
      self.LoadModule(m);
    });
    
    HTMLElement.prototype.LoadFile = this.LoadFile;
    HTMLElement.prototype.LoadModule = this.LoadModule;
     
  }
  
  LoadModule(m)
  {
    import(m.file).then(c => {
      if (m.tag) {
        if(!customElements.get(m.tag))
          customElements.define(m.tag, c.default, m.options || null);
      }
      if(m.callback)
      {
        m.callback(c);
      }
    });
  }

 LoadFile(file, callback, method, data) {
    var self = this;
    return new Promise(function(resolve, reject) {
      let req = new XMLHttpRequest();
      req.open(method || 'GET', file);
      req.onload = function() {
        if (req.status == 200) {
          if (callback) {
            resolve([callback, req.response]);
          } else {
            resolve(req.response);
          }
        } else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      
      req.send( data || null );   

      
    });
    
  }
  
}