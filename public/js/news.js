const new_image = document.getElementById('new_image');
const new_title = document.getElementById('new_title');
const new_content =document.getElementById('new_content');

const showNewsDetails = (data) => {
  console.log(data);
  window.location.replace('/readnews');
  new_image.src = data.urlToImage;
  new_title.textContent = data.title;
  new_content.textContent = data.content;
}