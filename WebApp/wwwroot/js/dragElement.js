$(function() {
    $( "#answers" ).sortable({
        filter:"input",
        preventOnFilter: false,
        delay: 100,
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
