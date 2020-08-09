

export default class Test extends HTMLElement
{
  
  constructor() {
    super();
    
    let self = this;
    self.page = '';
    self.template = document.createElement('template');
    self.LoadFile("./templates/test.tmp.html").then( d => { self.template.innerHTML = d; self.Render();});
    
  }
  
  Render()
  {
    
    let tmp = this.template.content;
    this.appendChild(tmp);
    
  }

  
  
  connectedCallback() {
    let self = this;
  }

  disconnectedCallback() {
    /*called when the element
      is disconnected from the page
    */
  }
}