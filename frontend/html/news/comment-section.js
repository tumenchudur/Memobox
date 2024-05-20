class CommentSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 50px;
                }
                .comment-input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-sizing: border-box;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    background-color: #007bff;
                    color: white;
                    cursor: pointer;
                }
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
            <div>
                <h2>Сэтгэгдлүүд (<span id="comment-count">1</span>)</h2>
                <form id="comment-form">
                    <textarea class="comment-input" rows="5" placeholder="Сэтгэгдэл үлдээх..."></textarea>
                    <button class="btn btn-secondary">Илгээх</button>
                </form>
                <div class="comments">
                    <div class="comment">
                        <div class="author">John Doe</div>
                        <div class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec varius nunc.</div>
                        <div class="timestamp">
                            <img src="../assets/icons/time.svg" alt="Time">
                            <span>2024-11-23 15:45</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#comment-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.addComment();
      });

    this.updateCommentCount();
  }

  addComment() {
    const textarea = this.shadowRoot.querySelector("textarea");
    const commentText = textarea.value.trim();
    if (commentText) {
      const comment = document.createElement("div");
      comment.classList.add("comment");
      comment.innerHTML = `
                <div class="author">John Doe</div>
                <div class="text">${commentText}</div>
                <div class="timestamp">
                    <img src="../assets/icons/time.svg" alt="Time">
                    <span>${new Date().toLocaleString()}</span>
                </div>
            `;
      this.shadowRoot.querySelector(".comments").appendChild(comment);
      textarea.value = "";
      this.updateCommentCount();
    }
  }

  updateCommentCount() {
    const count = this.shadowRoot.querySelector(".comments").childElementCount;
    this.shadowRoot.querySelector("#comment-count").textContent = count;
  }
}

customElements.define("comment-section", CommentSection);
