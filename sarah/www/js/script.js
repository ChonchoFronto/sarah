$(document).ready(function() {
  $('.cmd-item').click(function() {
    $('.cmd-item').siblings().removeClass('selected');
    $(this).addClass('selected');
    var $newText = $(this).html();
    $('.desc').empty();
    $('.desc').append($newText);
    console.log($newText);
  });
});
