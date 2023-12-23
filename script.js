("use strict");
const tabs = document.querySelector(".tabs");
const category_name = document.querySelectorAll(".category_name");
const container = document.querySelector(".container");
const contentBox = document.querySelector(".content_box");

const fetch_data = async () => {
  try {
    res = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    data = await res.json();
    return data;
  } catch {
    (err) => {
      return err.Message;
    };
  }
};

const func = async function () {
  const jsonData = await fetch_data();
  jsonData["categories"].forEach((data) => {
    const html = `
      <button class="tab" data-id=${data["category_name"]}>
      <img
        data-id=${data["category_name"]}
        class="emoji"
        src="./assests/images/${data["category_name"].toLowerCase()}-emoji.png"
        alt="Men Emoji"
      />
      <p class="category_name">${data["category_name"]}</p>
    </button>
    </div>
    `;
    tabs.innerHTML = tabs.innerHTML + html;
  });
  jsonData["categories"].forEach((data) => {
    const html = `
  <div data-id="${data["category_name"]}" class="content_container">
  </div>`;
    contentBox.innerHTML = contentBox.innerHTML + html;
  });
  const contentContainer = document.querySelectorAll(".content_container");
  contentContainer.forEach((el) => {
    jsonData["categories"].forEach((category) => {
      if (el.dataset.id === category["category_name"]) {
        category["category_products"].forEach((product) => {
          html = `<div class="content">
          <img src=${product.image} alt="Product Image" />
          <div class="product_name">
            <p>${
              product.title.length > 11
                ? product.title.slice(0, 11) + ".."
                : product.title
            }</p>
            <p>&bull;</p>
            <p>${product.vendor}</p>
          </div>
          <div class="product_price">
            <p>${product.price}</p>
            <p>${product.compare_at_price}</p>
            <p>${
              100 -
              Math.floor(
                (Number(product.price) / Number(product.compare_at_price)) * 100
              )
            }% off</p>
          </div>
          <button>Add to Cart</button>
        </div>`;
          el.innerHTML = el.innerHTML + html;
        });
      }
    });
  });
  const emojis = document.querySelectorAll(".emoji");
  const tab = document.querySelectorAll(".tab");
  tab[0].classList.add("active_tab");

  tabs.addEventListener("click", function (e) {
    Target = e.target.closest(".tab");
    emojis.forEach((emoji) => {
      if (Target.dataset.id === emoji.dataset.id) {
        emoji.style.display = "block";
      } else {
        emoji.style.display = "none";
      }
    });
  });

  tabs.addEventListener("click", function (e) {
    Target = e.target.closest(".tab");
    tab.forEach((tab) => {
      if (Target.dataset.id === tab.dataset.id) {
        tab.classList.add("active_tab");
      } else {
        tab.classList.remove("active_tab");
      }
    });
  });

  tabs.addEventListener("click", function (e) {
    Target = e.target.closest(".tab");
    contentContainer.forEach((content) => {
      if (Target.dataset.id === content.dataset.id) {
        content.style.display = "flex";
      } else {
        content.style.display = "none";
      }
    });
  });
};
func();
