class NewsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --bg-color: var(--light-color);
          --text-color: var(--dark-color);
        }
        :host([theme="dark"]) {
          --bg-color: var(--dark-color);
          --text-color: var(--light-color);
        }
        .title {
          color: var(--text-color);
        }
      </style>
      <h1 class="title">Дуусдаггүй Дарханы замын бүтээн байгуулалтын 6 жилийн ой</h1>
      <article>
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="../assets/images/news3.png" alt="Author" style="height: 30px; width: 30px; border-radius: 50%;">
            <p>B. Tumenchudur</p>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="../assets/icons/date.svg" alt="Date">
            <p class="status sm news">2024-11-23</p>
          </div>
        </div>
        <figure>
          <img class="trend__news__img" src="../assets/images/news.png" alt="">
        </figure>
        <div style="margin-top: 50px; margin-bottom: 50px;">
          <p>
            Нийслэлд газ ачиж явсан машин суудлын автомашинтай мөргөлдөж дэлбэрсэн явдал боллоо. Тус дэлбэрэлтэд олон иргэн эрүүл мэнд, эд хөрөнгөөр хохирч, гурван онцгой байдлын алба хаагч амиа алдсан харамсалтай явдал тохиосон юм. Уг үйл явдалтай холбогдуулан хэн, юу хэлж, ямар шийдвэрүүд гаргав. Шадар сайд С.Амарсайхан “Дэлбэрэлтийн улмаас газ тээвэрлэж явсан машины ёонкс 40 метрт шидэгдэхэд харамсалтай нь гурван албан хаагч өртөж амиа алдлаа. 11 иргэн Гэмтэл согог судлалын төв болон түлэнхийн эмнэлэгт хүргэгдсэн. Галд өртсөн өрхүүдийг ойролцоох буудалд байрлуулж хүнсээр хангах, эмнэлгийн тусламж үйлчилгээг үзүүлж байна. 120 гаруй албан хаагч 25 тээврийн хэрэгсэлтэйгээр ажиллаж галыг унтраасан. Ойр хавьд эрэн хайх ажиллагааг үргэлжлүүлж байна” гэв.
          </p>
        </div>
      </article>
      <comment-section></comment-section>
    `;
  }

  static get observedAttributes() {
    return ["theme"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "theme") {
      this.shadowRoot.host.style.setProperty(
        "--bg-color",
        newValue === "dark" ? "#343a40" : "#f8f9fa"
      );
      this.shadowRoot.host.style.setProperty(
        "--text-color",
        newValue === "dark" ? "#f8f9fa" : "#343a40"
      );
    }
  }
}

customElements.define("news-page", NewsPage);

// news-card component
class NewsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --bg-color: var(--light-color);
          --text-color: var(--dark-color);
        }
        :host([theme="dark"]) {
          --bg-color: var(--dark-color);
          --text-color: var(--light-color);
        }
        .news-card {
          background-color: var(--bg-color);
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .title {
          font-size: 20px;
          font-weight: bold;
          color: var(--text-color);
          margin-bottom: 10px;
        }
        .description {
          font-size: 16px;
          color: var(--text-color);
          margin-bottom: 10px;
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
      <div class="news-card">
        <div class="title"><slot name="title"></slot></div>
        <div class="description"><slot name="description"></slot></div>
        <div class="timestamp">
          <img src="../assets/icons/date.svg" alt="Time">
          <span><slot name="date"></slot></span>
        </div>
      </div>
    `;
  }

  static get observedAttributes() {
    return ["theme"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "theme") {
      this.shadowRoot.host.style.setProperty(
        "--bg-color",
        newValue === "dark" ? "#343a40" : "#f8f9fa"
      );
      this.shadowRoot.host.style.setProperty(
        "--text-color",
        newValue === "dark" ? "#f8f9fa" : "#343a40"
      );
    }
  }
}
