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
      <img class="user-image" src="https://storage.googleapis.com/wedding_iota/0.jpg">
    </div>
    <div class="message">
      <h2>@ ${user.name}<h2>
      <p>${user.message}</p>
    </div>
  `);
}

$(document).ready(function() {
  displayBackground();
  showDialog({
    name: 'Elaine Huang',
    message: 'Yeah! Demo! CSS Day~!'
  });
});
