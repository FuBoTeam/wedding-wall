const displayBackground = () => {
  let dataInfo = '';

  backgroundImages.forEach((image, index) => {
    const block = `
      <div class="pic-block">
        <img src="${image.url}" alt="images">
      </div>`;
    dataInfo = dataInfo + block;
  });

  $('#root').html(dataInfo);
  $('#root').addClass('hidden');

  $(window).on("load", function() {
    $('#loading').addClass('hidden');
    $('#root').removeClass('hidden');
  });
};

const showDialog = (user) => {
  $('#dialog').addClass('show-dialog');
  $('.modal-sm').html(`
    <div class="image-container">
      <img class="user-image" src="${user.img_url}">
    </div>
    <div class="message">
      <h2>@ ${user.name}<h2>
      <p>${user.message}</p>
    </div>
  `);

  setTimeout(() => {
    $('#dialog').removeClass('show-dialog');
  }, 3000);
}

class Quene {
  constructor() {
    this.q = [];
  }

  push(element) {
    this.q.push(element);
  }

  pop() {
    const result = this.q.splice(0, 1)[0];
    return result;
  }

  isEmpty() {
    return this.q.length === 0;
  }
}

const pickUpFeed = (newFeeds, oldFeeds) => {
  const nextFeed = newFeeds.isEmpty() ? oldFeeds.pop() : newFeeds.pop();
  showDialog(nextFeed);
  oldFeeds.push(nextFeed);
}

$(document).ready(function() {
  displayBackground();
  const newFeeds = new Quene();
  const oldFeeds = new Quene();

  users.forEach((user) => {
    newFeeds.push(user);
  });

  setInterval(() => {
    pickUpFeed(newFeeds, oldFeeds)
  }, 5000);
});
