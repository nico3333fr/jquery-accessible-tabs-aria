jQuery(document).ready(function($) {

    /*
     * jQuery Accessible tab panel system, using ARIA
     * @version v1.6.1
     * Website: https://a11y.nicolas-hoffmann.net/tabs/
     * License MIT: https://github.com/nico3333fr/jquery-accessible-tabs-aria/blob/master/LICENSE
     */
    // Store current URL hash.
    var hash = window.location.hash.replace("#", "");

    /* Tabs ------------------------------------------------------------------------------------------------------------ */
    var $tabs = $(".js-tabs"),
        $body = $("body");

    if ($tabs.length) {

        var $tab_list = $tabs.find(".js-tablist");
        $tab_list.each(function() {
            var $this_tab_list = $(this),
                options = $this_tab_list.data(),
                $tabs_prefix_classes = typeof options.tabsPrefixClass !== 'undefined' ? options.tabsPrefixClass + '-' : '',
                $hx = typeof options.hx !== 'undefined' ? options.hx : '',
                $existing_hx = typeof options.existingHx !== 'undefined' ? options.existingHx : '',
                $this_tab_list_items = $this_tab_list.children(".js-tablist__item"),
                $this_tab_list_links = $this_tab_list.find(".js-tablist__link");

            // roles init
            $this_tab_list.attr("role", "tablist"); // ul        
            $this_tab_list_items.attr("role", "presentation"); // li
            $this_tab_list_links.attr("role", "tab"); // a

            // classes init
            $this_tab_list.addClass($tabs_prefix_classes + 'tabs__list');
            $this_tab_list_items.addClass($tabs_prefix_classes + 'tabs__item');
            $this_tab_list_links.addClass($tabs_prefix_classes + 'tabs__link');

            // controls/tabindex attributes
            $this_tab_list_links.each(function() {
                var $this = $(this),
                    $hx_generated_class = typeof options.tabsGeneratedHxClass !== 'undefined' ? options.tabsGeneratedHxClass : 'invisible',
                    $href = $this.attr("href"),
                    $controls = $($href),
                    $text = $this.text();

                if ($hx !== "") {
                    $controls.prepend('<' + $hx + ' class="' + $hx_generated_class + '" tabindex="0">' + $text + '</' + $hx + '>');
                }
                if ($existing_hx !== "") {
                    $controls.find($existing_hx + ':first-child').attr('tabindex', 0);
                }
                if (typeof $href !== "undefined" && $href !== "" && $href !== "#") {
                    $this.attr({
                        "aria-controls": $href.replace("#", ""),
                        "tabindex": -1,
                        "aria-selected": "false"
                    });
                }

                $this.removeAttr("href");

            });
        });

        /* Tabs content ---------------------------------------------------------------------------------------------------- */
        $(".js-tabcontent").attr({
                "role": "tabpanel", // contents
                "aria-hidden": "true" // all hidden
                //"tabindex": 0
            })
            .each(function() {
                var $this = $(this),
                    $this_id = $this.attr("id"),
                    $prefix_attribute = $("#label_" + $this_id).closest('.js-tablist').attr('data-tabs-prefix-class'),
                    $tabs_prefix_classes = typeof $prefix_attribute !== 'undefined' ? $prefix_attribute + '-' : '';
                // label by link
                $this.attr("aria-labelledby", "label_" + $this_id);

                $this.addClass($tabs_prefix_classes + 'tabs__content');
            });

        // search if hash is ON not disabled tab
        if (hash !== "" && $("#" + hash + ".js-tabcontent").length !== 0) {
            if ($("#label_" + hash + ".js-tablist__link:not([aria-disabled='true'])").length) {
                // display not disabled
                $("#" + hash + ".js-tabcontent").removeAttr("aria-hidden");
                // selection menu
                $("#label_" + hash + ".js-tablist__link").attr({
                    "aria-selected": "true",
                    "tabindex": 0
                });
            }

        }
        // search if hash is IN not disabled tab
        if (hash !== "" && $("#" + hash).parents('.js-tabcontent').length) {
            var $this_hash = $("#" + hash),
                $tab_content_parent = $this_hash.parents('.js-tabcontent'),
                $tab_content_parent_id = $tab_content_parent.attr('id');

            if ($("#label_" + $tab_content_parent_id + ".js-tablist__link:not([aria-disabled='true'])").length) {
                $tab_content_parent.removeAttr("aria-hidden");
                // selection menu
                $("#label_" + $tab_content_parent_id + ".js-tablist__link").attr({
                    "aria-selected": "true",
                    "tabindex": 0
                });
            }
        }

        // search if data-selected="1" is on a not disabled tab for each tab system
        $tabs.each(function() {
            var $this = $(this),
                $tab_selected = $this.find('.js-tablist__link[aria-selected="true"]'),
                $tab_data_selected = $this.find('.js-tablist__link[data-selected="1"]:not([aria-disabled="true"]):first'),
                $tab_data_selected_content = $('#' + $tab_data_selected.attr('aria-controls'));

            if ($tab_selected.length === 0 && $tab_data_selected.length !== 0) {
                $tab_data_selected.attr({
                    "aria-selected": "true",
                    "tabindex": 0
                });
                $tab_data_selected_content.removeAttr("aria-hidden");
            }
        });

        // if no selected => select first not disabled
        $tabs.each(function() {
            var $this = $(this),
                $tab_selected = $this.find('.js-tablist__link[aria-selected="true"]'),
                $first_link = $this.find('.js-tablist__link:not([aria-disabled="true"]):first'),
                $first_content = $('#' + $first_link.attr('aria-controls'));

            if ($tab_selected.length === 0) {
                $first_link.attr({
                    "aria-selected": "true",
                    "tabindex": 0
                });
                $first_content.removeAttr("aria-hidden");
            }
        });

        /* Events ---------------------------------------------------------------------------------------------------------- */
        /* click on a tab link */
        $body.on("click", ".js-tablist__link[aria-disabled='true']", function() {
            return false;
        });
        $body.on("click", ".js-tablist__link:not([aria-disabled='true'])", function(event) {
                var $this = $(this),
                    $hash_to_update = $this.attr("aria-controls"),
                    $tab_content_linked = $("#" + $this.attr("aria-controls")),
                    $parent = $this.closest(".js-tabs"),
                    options = $parent.data(),
                    tabs_disable_fragments = typeof options.tabsDisableFragment !== 'undefined' ? true : false,
                    $all_tab_links = $parent.find(".js-tablist__link"),
                    $all_tab_contents = $parent.find(".js-tabcontent");

                // aria selected false on all links
                $all_tab_links.attr({
                    "tabindex": -1,
                    "aria-selected": "false"
                });

                // add aria selected on $this
                $this.attr({
                    "aria-selected": "true",
                    "tabindex": 0
                });

                // add aria-hidden on all tabs contents
                $all_tab_contents.attr("aria-hidden", "true");

                // remove aria-hidden on tab linked
                $tab_content_linked.removeAttr("aria-hidden");

                // add fragment (timeout for transitions)
                if (tabs_disable_fragments === false) {
                    setTimeout(function() {
                        history.pushState(null, null, location.pathname + location.search + '#' + $hash_to_update)
                    }, 1000);
                }

                event.preventDefault();
            })
            /* Key down in tabs */
            .on("keydown", ".js-tablist", function(event) {

                var $parent = $(this).closest('.js-tabs'),
                    $activated = $parent.find('.js-tablist__link[aria-selected="true"]').parent(),
                    $last_link = $parent.find('.js-tablist__item:last-child .js-tablist__link'),
                    $first_link = $parent.find('.js-tablist__item:first-child .js-tablist__link'),
                    $focus_on_tab_only = false,
                    $prev = $activated,
                    $next = $activated;

                // search valid previous 
                do {
                    // if we are on first => activate last
                    if ($prev.is(".js-tablist__item:first-child")) {
                        $prev = $last_link.parent();
                    }
                    // else previous
                    else {
                        $prev = $prev.prev();
                    }
                }
                while ($prev.children('.js-tablist__link').attr('aria-disabled') === 'true' && $prev !== $activated);

                // search valid next
                do {
                    // if we are on last => activate first
                    if ($next.is(".js-tablist__item:last-child")) {
                        $next = $first_link.parent();
                    }
                    // else previous
                    else {
                        $next = $next.next();
                    }
                }
                while ($next.children('.js-tablist__link').attr('aria-disabled') === 'true' && $next !== $activated);

                // some event should be activated only if the focus is on tabs (not on tabpanel)
                if ($(document.activeElement).is($parent.find('.js-tablist__link'))) {
                    $focus_on_tab_only = true;
                }

                // catch keyboard event only if focus is on tab
                if ($focus_on_tab_only && !event.ctrlKey) {
                    // strike up or left in the tab
                    if (event.keyCode == 37 || event.keyCode == 38) {

                        $prev.children(".js-tablist__link").click().focus();

                        event.preventDefault();
                    }
                    // strike down or right in the tab
                    else if (event.keyCode == 40 || event.keyCode == 39) {

                        $next.children(".js-tablist__link").click().focus();

                        event.preventDefault();
                    } else if (event.keyCode == 36) {
                        // activate first tab
                        $first_link.click().focus();
                        event.preventDefault();
                    } else if (event.keyCode == 35) {
                        // activate last tab
                        $last_link.click().focus();
                        event.preventDefault();
                    }

                }

            })
            .on("keydown", ".js-tabcontent", function(event) {

                var $this = $(this),
                    $selector_tab_to_focus = $this.attr('aria-labelledby'),
                    $tab_to_focus = $("#" + $selector_tab_to_focus),
                    $parent_item = $tab_to_focus.parent(),
                    $parent_list = $parent_item.parent(),
                    $first_item = $parent_list.find('.js-tablist__item:first-child'),
                    $last_item = $parent_list.find('.js-tablist__item:last-child'),
                    $prev_item = $parent_item,
                    $next_item = $parent_item;

                // CTRL up/Left
                if ((event.keyCode == 37 || event.keyCode == 38) && event.ctrlKey) {
                    $tab_to_focus.focus();
                    event.preventDefault();
                }
                // CTRL PageUp
                if (event.keyCode == 33 && event.ctrlKey) {
                    //$tab_to_focus.focus();

                    // search valid previous 
                    do {
                        // if we are on first => last
                        if ($prev_item.is(".js-tablist__item:first-child")) {
                            $prev_item = $last_item;
                        }
                        // else previous
                        else {
                            $prev_item = $prev_item.prev();
                        }
                    }
                    while ($prev_item.children('.js-tablist__link').attr('aria-disabled') === 'true' && $prev_item !== $parent_item);

                    $prev_item.children(".js-tablist__link").click().focus();

                    event.preventDefault();
                }
                // CTRL PageDown
                if (event.keyCode == 34 && event.ctrlKey) {
                    $tab_to_focus.focus();

                    // search valid next 
                    do {
                        // if we are on last => first
                        if ($next_item.is(".js-tablist__item:last-child")) {
                            $next_item = $first_item;
                        }
                        // else previous
                        else {
                            $next_item = $next_item.next();
                        }
                    }
                    while ($next_item.children('.js-tablist__link').attr('aria-disabled') === 'true' && $next_item !== $parent_item);

                    $next_item.children(".js-tablist__link").click().focus();

                    event.preventDefault();
                }

            })
            /* click on a tab link */
            .on("click", ".js-link-to-tab", function() {
                var $this = $(this),
                    $tab_to_go = $($this.attr('href')),
                    $button_to_click = $('#' + $tab_to_go.attr('aria-labelledby'));

                if ($button_to_click.attr('aria-disabled') !== 'true') {
                    // activate tabs
                    $button_to_click.click();
                    // give focus to the good button
                    setTimeout(function() {
                        $button_to_click.focus()
                    }, 10);
                }

            });

    }

});
