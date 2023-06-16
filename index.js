let isRequesting = false;

const API_URL = "http://127.0.0.1:5000/";

function init() {
  const shareButton = createBtn();

  function appendShareButton() {
    const buttonsWrapper = document.querySelector(
      "#root > div.apppage > div:nth-child(1) > div.container-fluid.chattop > div:nth-child(3) > div.row.pb-1.pt-2.justify-content-between.chatheaderbg-normal.align-items-center > div.col-3.col-md-3 > div > div"
    );

    if (buttonsWrapper) {
      buttonsWrapper.appendChild(shareButton);
    }
  }

  appendShareButton();

  const id = setInterval(() => {
    if (
      !document.querySelector("#export-button") ||
      document.querySelector("#export-button").style.display === "none"
    ) {
      appendShareButton();
    }
  }, 300);

  shareButton.addEventListener("click", async () => {
    if (isRequesting) return;
    isRequesting = true;
    shareButton.innerHTML = "📋 Copied!";
    setTimeout(function () {
      shareButton.innerHTML = "✂️ Copy";
    }, 500);

    shareButton.style.cursor = "pointer";
    isRequesting = false;
    console.log(document.title);

    const find = document.querySelectorAll('[class*="inner-scroll-view"]');

    console.log(find);
    const threadContainer = find[0];

    console.log(threadContainer);

    const conversationData = {
      title: document.title,
      items: [],
    };

    for (const node of threadContainer.children) {
      const AI_NAME = document.title.split("-")[1].trim();
      const img = node.querySelector("img");

      const markdown = node.querySelector("p");

      if (img) {
        conversationData.items.push({
          from: `${AI_NAME}`,
          value: markdown.textContent,
        });
      } else {
        conversationData.items.push({
          from: "human",
          value: markdown.textContent,
        });
      }
    }

    console.log(JSON.stringify(conversationData));
    console.log(JSON.stringify(conversationData.items));
    navigator.clipboard
      .writeText(JSON.stringify(conversationData))
      .then(() => {
        console.log("JSON copied to clipboard");
      })
      .catch((err) => {
        console.log("Error copying JSON to clipboard:", err);
      });

    // setTimeout(() => {
    //   shareButton.innerHTML = "✂️ Copy";
    //   shareButton.style.cursor = "pointer";
    //   isRequesting = false;
    // }, 1000);
  });
}

function showIfNotLoading(loadingElement, newElement) {
  const timerId = setInterval(() => {
    if (loadingElement.disabled) {
      isLoading = true;
      newElement.style.display = "none";
    } else {
      isLoading = false;
      newElement.style.display = "flex";
      clearInterval(timerId);
    }
  }, 100);
}

// function getAvatarImage() {
//   // Create a canvas element
//   try {
//     const canvas = document.createElement("canvas");

//     const image = document.querySelectorAll("img")[3];

//     // Set the canvas size to 30x30 pixels
//     canvas.width = 48;
//     canvas.height = 48;

//     // Draw the img onto the canvas
//     canvas.getContext("2d").drawImage(image, 0, 0);

//     // Convert the canvas to a base64 string as a JPEG image
//     const base64 = canvas.toDataURL("image/jpeg");

//     return base64;
//   } catch (error) {
//     console.log("Error generating avatar image.");
//     return null;
//   }
// }

function createBtn() {
  const button = document.createElement("button");
  button.id = "export-button";
  button.classList.add("btn", "flex", "justify-center", "btn-neutral");
  button.textContent = "✂️ Copy";

  return button;
}

init();
