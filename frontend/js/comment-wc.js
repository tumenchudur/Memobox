class CommentSection extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.loadExternalStyles();
    shadow.innerHTML = `
      <style>
        .comment-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
          font-size: 16px;
          margin-bottom: 20px;
        }
      </style>
     <style id="external-styles"></style>
      <div>
        <h2>Сэтгэгдлүүд (<span id="comment-count">0</span>)</h2>
        <comment-list></comment-list>
        <form id="comment-form">
          <textarea
            class="comment-input"
            rows="5"
            placeholder="Сэтгэгдэл үлдээх..."
          ></textarea>
          <button type="submit" class="btn btn-secondary">Илгээх</button>
        </form>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#comment-form")
      .addEventListener("submit", this.addComment.bind(this));

    this.shadowRoot
      .querySelector("comment-list")
      .addEventListener("comments-updated", this.updateCommentCount.bind(this));
    this.updateCommentCount();
  }

  async loadExternalStyles() {
    try {
      const indexCssResponse = await fetch("../css/index.css");
      const indexCssText = await indexCssResponse.text();
      this.shadowRoot.querySelector(
        "#external-styles"
      ).textContent = `${indexCssText}`;
    } catch (error) {
      console.error("Error loading external styles:", error);
    }
  }

  addComment(event) {
    event.preventDefault();
    const textarea = this.shadowRoot.querySelector("textarea");
    const commentText = textarea.value.trim();

    if (commentText) {
      const commentList = this.shadowRoot.querySelector("comment-list");

      commentList.addComment({
        text: commentText,
        author: "Bat Bold",
        timestamp: new Date().toLocaleString(),
      });
      textarea.value = "";

      this.updateCommentCount();
      const commentAddedEvent = new CustomEvent("comment-added", {
        detail: { commentText },
      });
      this.dispatchEvent(commentAddedEvent);
    }
  }

  updateCommentCount() {
    const count = this.shadowRoot.querySelector("comment-list").comments.length;
    this.shadowRoot.querySelector("#comment-count").textContent = count;
  }
}

class CommentList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.comments = this.getSavedComments();

    this.render();
  }

  getSavedComments() {
    const savedComments = localStorage.getItem("comments");
    return savedComments ? JSON.parse(savedComments) : [];
  }

  saveComments() {
    localStorage.setItem("comments", JSON.stringify(this.comments));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .comments {
          margin: 20px 0;
        }
      </style>
      <div class="comments">
        ${this.comments
          .map(
            (comment) =>
              `<comment-card comment="${comment.text}" author="${comment.author}" date="${comment.timestamp}"></comment-card>`
          )
          .join("")}
      </div>
    `;
  }

  addComment(comment) {
    this.comments.push(comment);
    this.saveComments();
    this.render();
  }
}

class CommentCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["comment", "author", "date"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "comment" || name === "author" || name === "date") {
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .comment {
          background-color: var(--bg-color);
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .author {
          font-weight: bold;
          color: var(--text-color);
          margin-bottom: 5px;
        }
        .text {
          font-size: 16px;
          line-height: 1.5;
        }
        .timestamp {
          font-size: 12px;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
        }
      </style>
      <div class="comment">
        <div class="author"><slot name="author"></slot></div>
        <div class="text"><slot name="comment"></slot></div>
        <div class="timestamp">
          <img src="../assets/icons/date.svg" alt="Time">
          <span><slot name="date"></slot></span>
        </div>
      </div>
    `;
    return template;
  }

  render() {
    const template = this.getTemplate();
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const authorSlot = document.createElement("span");
    authorSlot.setAttribute("slot", "author");
    authorSlot.textContent = this.getAttribute("author");
    this.appendChild(authorSlot);

    const commentSlot = document.createElement("span");
    commentSlot.setAttribute("slot", "comment");
    commentSlot.textContent = this.getAttribute("comment");
    this.appendChild(commentSlot);

    const dateSlot = document.createElement("span");
    dateSlot.setAttribute("slot", "date");
    dateSlot.textContent = this.getAttribute("date");
    this.appendChild(dateSlot);
  }
}

customElements.define("comment-section", CommentSection);
customElements.define("comment-list", CommentList);
customElements.define("comment-card", CommentCard);
