$('.add-post-categories-select-box-item').click(function() {
    $("#add-post-categories-select-box-item-init")[0].innerHTML = $(this)[0].innerHTML;
    $('.add-post-categories-select-box-item.add-post-categories-select-box-item-selected').removeClass('add-post-categories-select-box-item-selected');
    $(this).addClass("add-post-categories-select-box-item-selected");
    if ($("#add-post-categories-select-box-item-init").hasClass("input-wrapper-error")){
        $("#add-post-categories-select-box-item-init").removeClass("input-wrapper-error");
    }
})
$('.add-post-categories-select-box').click(function() {
    $(this).children().toggleClass("add-post-categories-select-box-item-visible");
})
