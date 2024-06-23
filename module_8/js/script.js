const btn = document.querySelector(".gallery-button");
const gallery = document.querySelector(".gallery");

let data;

fetch("https://api.thecatapi.com/v1/images/search?limit=10")
.then((res) => res.json())
.then((res) => {
    data = res;
})
.catch((err) => console.log(err.message));

btn.addEventListener("click", startLoadingImages);

function startLoadingImages () {
    let i = 0;
    const chunkSize = 50;
  
    function insertImagesChunk() {
      let end = Math.min(i + chunkSize, data.length);
      do {
        let elem = `<img src=${data[i].url}></img>`;
        gallery.innerHTML += elem;
        i++;
      } while (i < end);
  
      if (i < data.length) {
        setTimeout(insertImagesChunk, 1000);
      }
    }
  
    insertImagesChunk();
  }
  
