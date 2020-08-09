export default class Screen extends HTMLElement {

  constructor() {
    super();
    var self = this;
    self.init_page = 'start';
    self.page = self.init_page;
    window.onhashchange = function(){
      let p = location.hash;
      p = (p == "")? self.init_page : p.replace("#","");
      if(p != '')
      {
        self.page = p;
        self.loadPage();        
      }
    };
  }

  connectedCallback() {
    this.page = this.getAttribute("data-page");
    this.loadPage();
  }

  loadPage()
  {
     import('./screens/' + this.page + '.js').then(c => {
       let container = document.querySelector("__screen_module");
       if(container)
       {
         this.removeChild(container),then( () => { console.log("this"); });
       }
       this.innerHTML = '<screen-container-'+this.page+' class="__screen_module"></screen-container-'+this.page+'>';
       if(!customElements.get('screen-container-'+this.page))
        customElements.define('screen-container-'+this.page, c.default);
     });
  }
  
  setAttribute(name, value) {
    super.setAttribute(name, value);
    if (name === "data-page") {
      this.page = value;
      this.loadPage();
    }
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(name, oldValue, newValue) {
  }


}