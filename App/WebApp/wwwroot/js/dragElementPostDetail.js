$(function() {
    $( "#add-post-answer-input-row" ).sortable({
        filter:"input",
        preventOnFilter: false,
        delay: 100,
        handle: '.add-post-answer-input-move-image-wrapper',
        cursor: 'move',
        //connectWith: "",
        stop: function (event, ui) {
            //p.HandleSortPareto(ui, ui.item)  // note this just handles the change in order
        },
        start: function (event, ui) {}
    });
    $('#answers input').bind('click.sortable mousedown.sortable',function(ev){
        ev.target.focus();
    });
});