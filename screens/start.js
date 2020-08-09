

export default class Start extends HTMLElement
{
  
  constructor() {
    super();
    
    let self = this;
    self.page = '';
    self.template = document.createElement('template');
    self.LoadFile("./templates/start.tmp.html").then( d => { self.template.innerHTML = d; self.Render();});
    
    self.pages = [
      {id:1,title:"Title 1"},
      {id:2,title:"Title 2"},
      {id:3,title:"Title 3"},
      {id:4,title:"Title 4"},
      {id:5,title:"Title 5"},
      {id:6,title:"Title 6"},
      {id:7,title:"Title 7"},
      {id:8,title:"Title 8"},
    ]
    
    self.LoadModule({
      tag: "list-page",
      file: './fragments/listitems.js',
      options: { extends: "li" }
    });
    
    self.screen = document.querySelector("app-screen");
    self.page = document.querySelector("screen-container-start");
    
    window.Events.on("test:","document", self.menuClick );
    
  }
  
  
  
  menuClick(e)
  {
    console.log("menuClick");
    e.detail.source_el.classList.add("bg-error");    
  }
  
  
  connectedCallback() {
    let self = this;
  }
  
  Render()
  {
    let self = this, tmp = this.template.content, _l = ""; 
    this.pages.forEach( p => { _l += "<li is='list-page' class='menu-item' data-title='"+p.title+"' data-id='"+p.id+"'></li>"; });
    tmp.querySelector(".card-title").innerHTML = "Hope this all workings";
    tmp.querySelector("#page-list").innerHTML = _l;
    self.appendChild(tmp);
  }

  disconnectedCallback() {
    
  }
}