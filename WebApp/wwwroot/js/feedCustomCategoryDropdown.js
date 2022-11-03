$('.feed-categories-select-box-item').click(function() {
    $("#feed-categories-select-box-item-init")[0].innerHTML = $(this)[0].innerHTML;
    $('.feed-categories-select-box-item.feed-categories-select-box-item-selected').removeClass('feed-categories-select-box-item-selected');
    $(this).addClass("feed-categories-select-box-item-selected");

})
$('.feed-categories-select-box').click(function() {
    $(this).children().toggleClass("feed-categories-select-box-item-visible");
})