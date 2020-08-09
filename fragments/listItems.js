export default class ItemList extends HTMLLIElement
{
  
  constructor() {
    super();
    let self = this;
    self.page = '';
    self.innerHTML = `<a href="#">${this.getAttribute("data-title")}</a>`;
    self.itemClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.dispatchEvent(new CustomEvent("test:", {
        detail: {
          original_event: e,
          source_el: e.target
        }
      }));
    }

    
    
    this.screen = document.querySelector("app-screen");
    this.page = document.querySelector("screen-container-start");
  }
  
  connectedCallback() {
    let self = this;
    window.Events.on("click",".menu-item", self.itemClick );
  }

  disconnectedCallback() {
    let self = this;
    window.Events.off("click",".menu-item", self.itemClick );
  }
}