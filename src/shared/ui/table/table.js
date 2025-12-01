export class GridTable {
  constructor({ columns = [], data = [] } = {}) {
    this.columns = columns;
    this.data = data;

    this.root = null;
    this._mounted = false;
  }

  mount(container) {
    if (this._mounted) {
      return;
    }
    this._mounted = true;

    this.root = document.createElement("div");
    this.root.className = "grid-table";

    container.appendChild(this.root);
    this.render();
  }

  update({ columns, data } = {}) {
    if (columns) this.columns = columns;
    if (data) this.data = data;
    this.render();
  }

  render() {
    if (!this.root) {
      return;
    }

    this.root.innerHTML = `
        <div class="grid-table__header"></div>
        <div class="grid-table__body"></div>
      `;
  }

  destroy() {
    if (!this._mounted) return;

    this.root.remove();
    this.root = null;
    this._mounted = false;
  }
}
