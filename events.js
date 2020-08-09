export default class Events {

  constructor() {
    
    this.events = {};
    this.registeredEvents = {};
    this.instances = {}
    this.root = document;
    
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
      Element.prototype.closest = function(s) {
        var el = this;
        do {
          if (Element.prototype.matches.call(el, s)) return el;
          el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
      };
    }
    
  }
  
  register() {
    let self = this;
    
    for(let type in self.events) {
      if(this.registeredEvents[type] === undefined)
      {
        this.registeredEvents[type] = true;
        self.root.addEventListener(type, (e) => {
          for(let selector in self.events[e.type]){
            let el = (e.target.closest)? e.target.closest(selector): "";
            
            if(type.indexOf(":") > -1)
            {
              el = self.root;
            }
            
            if (el) {
              if(self.instances[e.type] && self.instances[e.type][selector])
              {
                let instance = self.instances[e.type][selector];
                self.events[e.type][selector].call(instance, e, el);
              }else{
                self.events[e.type][selector](e, el);
              }
              break;
            }
          }
        });
      }
    } 
  }
  
  
  
  on(type, selector, func, instance) {
   
    let self = this;
    
    if(!self.events[type])
      self.events[type] = {};
    
    self.events[type][selector] = func;
    
    if(instance)
    {
      if(!this.instances[type])
        this.instances[type] = {};
      
      self.instances[type][selector] = instance;
      
    }
    
    
    self.register();
    
    return self;
  }

  off(type, selector) {
    let self = this;
    
    if(self.instances[type] && self.instances[type][selector] )
      delete self.instances[type][selector];
    
    delete self.events[type][selector];
    
    self.register();
    return self;
  }
  
  
  
    


}