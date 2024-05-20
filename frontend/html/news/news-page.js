class NewsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style id="external-styles"></style>
            <style>
                // :host {
                //     --bg-color: white;
                //     --text-color: black;
                //     background-color: var(--bg-color);
                //     color: var(--text-color);
                //     display: block;
                //     padding: 20px;
                //     font-family: 'Inter', sans-serif;
                // }
                // :host([dark-mode]) {
                //     --bg-color: #333;
                //     --text-color: white;
                // }
                // header{
                //     display: flex;
                //     justify-content: space-between;
                // }

                footer {
                   border-top: 1px solid var(--dark); 
                   margin-top: 50px;
                }

                .footer-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .footer-asset {
                    display: flex;
                    gap: 10px;
                }
                
                .logo {
                    width: 150px;
                    height: 55px;
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
            <div class="">
                <header class="container">
                    <div class="flex justify-between header">
                        <a href="index.html">
                            <img class="logo" src="../assets/images/logo.png" />
                        </a>
                        <a href="login.html" class="btn btn-secondary">Нэвтрэх</a>
                    </div>
                </header>
                
                
                <main class="container">
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
                </main>
                <footer
                    class="container"
                    style="border-top: 1px solid var(--dark); margin-top: 50px"
                    >
                        <div class="flex justify-between header">
                            <a href="index.html">
                            <img class="logo" src="../assets/images/logo.png" />
                            </a>

                            <div style="display: flex; gap: 10px; flex-direction: column">
                            <div style="display: flex; justify-items: items; gap: 10px">
                                <img
                                style="width: 20px; height: 20px"
                                src="../assets/icons/pin.svg"
                                />

                                <p style="font-size: small; font-weight: var(--semi-bold)">
                                Сүхбаатар дүүрэг 6-р хороо , бага тойруу , Ж . Самбуугийн гудамж 6
                                тоот
                                </p>
                            </div>
                            <div style="display: flex; justify-items: center; gap: 10px">
                                <img
                                style="width: 20px; height: 20px"
                                src="../assets/icons/phone.svg"
                                />

                                <p style="font-size: small; font-weight: var(--semi-bold)">
                                9909-3223
                                </p>
                            </div>
                            <div style="display: flex; justify-items: center; gap: 10px">
                                <img
                                style="width: 20px; height: 20px"
                                src="../assets/icons/mail.svg"
                                />

                                <p style="font-size: small; font-weight: var(--semi-bold)">
                                info@memobox.mn
                                </p>
                            </div>
                            </div>
                        </div>

                        <p style="font-size: small">
                            © Зохиогчийн эрх хуулиар хамгаалагдсан. Мэдээлэл хуулбарлах хориотой
                        </p>
                    </footer>
            </div>
        `;
  }

  connectedCallback() {
    this.fetchData();
    this.loadExternalStyles();
  }

  fetchData() {
    // Placeholder for fetching data
    console.log("Fetching data...");
  }

  async loadExternalStyles() {
    try {
      const baseCssResponse = await fetch("../css/_base.css");
      const indexCssResponse = await fetch("../css/index.css");
      const baseCssText = await baseCssResponse.text();
      const indexCssText = await indexCssResponse.text();
      this.shadowRoot.querySelector(
        "#external-styles"
      ).textContent = `${baseCssText}\n${indexCssText}`;
    } catch (error) {
      console.error("Error loading external styles:", error);
    }
  }
}

customElements.define("news-page", NewsPage);
