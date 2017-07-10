jQuery(document).ready(function() {
    jQuery('.menu a').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        $(this).addClass('active');
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 70
        }, 1500);
    });

    // Cache selectors
    var topMenu = $(".menu");

    var topMenuHeight = topMenu.outerHeight() + 15;
    // All list items
    var menuItems = topMenu.find("a");
    // Anchors corresponding to menu items
    var scrollItems = menuItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    // Bind to scroll
    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        // Set/remove active class
        menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
        if (fromTop + $('#contact').height() + 352 >= $('body').height()) {
            menuItems.parent().removeClass("active").end().filter("[href='#contact']").parent().addClass("active");
        };
    });​
});