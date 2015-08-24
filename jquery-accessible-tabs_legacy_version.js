$(document).ready(function(){

        /*
         * jQuery Accessible tab panel system, using ARIA
         * Website: http://a11y.nicolas-hoffmann.net/tabs/
         * License MIT: https://github.com/nico3333fr/jquery-accessible-tabs-aria/blob/master/LICENSE
         */
        // Store current URL hash.
        var hash = window.location.hash.replace( "#", "" );
 
        /* Tabs ------------------------------------------------------------------------------------------------------------ */
        $( ".tabs__list" ).attr( "role", "tablist" )                    // ul        
        .children( ".tabs__item" ).attr( "role", "presentation" )       // li
        .find( ".tabs__link").attr( "role", "tab" )                     // a
        .each( function () {
                // controls/tabindex attributes
                var $this = $( this ),
                        controls = $this.attr( "href" ),
                        hx = $this.parents(".tabs__list").attr( "data-hx" ),
                        existing_hx = $this.parents(".tabs__list").attr( "data-existing-hx" ),
                        text = $this.html();
                        
                if ( typeof hx !== "undefined" && hx !== "undefined" && hx !== "" ) {
                        $(controls).prepend('<' + hx + ' class="invisible" tabindex="0">' + text + '</' + hx + '>');
                }
                if ( typeof existing_hx !== "undefined" && existing_hx !== "undefined" && existing_hx !== "" ) {
                        $(controls).find(existing_hx + ':first-child').attr('tabindex',0);
                }
                if ( typeof controls !== "undefined" && controls !== "" && controls !== "#" ) {
                        controls = controls.replace( "#", "" );
                        $this.attr({
                                "aria-controls": controls,
                                "tabindex": -1,
                                "aria-selected": "false"
                        });
                }             
                
                else {
                        // PEBCAK
                        $this.remove();
                }
                $this.removeAttr("href");
        } );
 
        /* Tabs content ---------------------------------------------------------------------------------------------------- */
        $( ".tabs__tabcontent" ).attr({
                "role": "tabpanel",             // contents
                "aria-hidden": "true"           // all hidden
                //"tabindex": 0
        })
        .each( function() {
                // label by link
                var $this = $( this );
                $this.attr( "aria-labelledby", "label_" + $this.attr( "id" ) );
        } );
 
        // search if hash is ON tabs
        if ( hash !== "" ) {
                // display
                $( "#" + hash + ".tabs__tabcontent" ).removeAttr( "aria-hidden" );
                // selection menu
                $( "#label_" + hash + ".tabs__link" ).attr({
                        "aria-selected": "true",
                        "tabindex": 0
                });
        }
        // search if hash is IN tabs
        if ( hash !== "" && $( "#" + hash + ".tabs__tabcontent" ).length === 0 ) {
                $( ".tabs__tabcontent" ).each( function() {
                        var $this = $(this),
                                $tab_id = $this.attr("id");
                        if ( $this.find( "#" + hash ).length ) {
                                // display
                                $this.removeAttr( "aria-hidden" );
                                // selection menu
                                $( "#label_" + $tab_id + ".tabs__link" ).attr({
                                        "aria-selected": "true",
                                        "tabindex": 0
                                });
                        }
                    
                });
        }
 
        // if no selected => select first
        $( ".tabs" ).each( function(index) {
                var $this = $(this);
                if ( $this.find( '.tabs__link[aria-selected="true"]' ).length === 0 ) {
                        $this.find( ".tabs__link:first" ).attr({
                                "aria-selected": "true",
                                "tabindex": 0
                        });
                        $this.find( ".tabs__tabcontent:first" ).removeAttr( "aria-hidden" );
                }
        } );
 
        /* Events ---------------------------------------------------------------------------------------------------------- */
        /* click on a tab link */
        $( "body" ).on( "click", ".tabs__link", function( event ) {
                var $this = $( this ),
                        $parent = $this.parents( ".tabs" ),
                        hx = $parent.attr( "data-hx" );
 
                // aria selected false on all links
                $parent.find( ".tabs__link" ).attr({ 
                          "tabindex": -1,
                          "aria-selected": "false"
                          });
 
                // add aria selected on $this
                $this.attr({    
                        "aria-selected": "true",
                        "tabindex": 0
                });
 
                // add aria-hidden on all tabs
                $parent.find( ".tabs__tabcontent" ).attr( "aria-hidden", "true" );
 
                // remove aria-hidden on tab linked
                $( "#" + $this.attr( "aria-controls" ) ).removeAttr( "aria-hidden" );

 
                event.preventDefault();
        } )
        /* Key down in tabs */
        .on( "keydown", ".tabs", function( event ) {
 
                var $parent = $(this),
                        $activated,
                        $focus_on_tab_only = false;
                
                // some event should be activated only if the focus is on tabs (not on tabpanel)
                if ( $( document.activeElement ).is( $parent.find('.tabs__link') ) ){
                   $focus_on_tab_only = true;
                   }
                 
                // catch keyboard event only if focus is on tab
                if ($focus_on_tab_only && !event.ctrlKey) {
                    // strike up or left in the tab
                    if ( event.keyCode == 37 || event.keyCode == 38 ) {
                            // find previous tab
                            $activated = $parent.find( '.tabs__link[aria-selected="true"]' ).parent();
                            // if we are on first => activate last
                            if ( $activated.is( ".tabs__item:first-child" ) ) {
                                    $parent.find( ".tabs__item:last-child a" ).click().focus();
                            }
                            // else activate previous
                            else {
                                    $activated.prev().children( ".tabs__link" ).click().focus();
                            }
                            event.preventDefault();
                    }
                    // strike down or right in the tab
                    else if ( event.keyCode == 40 || event.keyCode == 39 ) {
                            // find next tab
                            $activated = $parent.find( '.tabs__link[aria-selected="true"]' ).parent();
                            // if we are on last => activate first
                            if ( $activated.is( ".tabs__item:last-child" ) ) {
                                    $parent.find( ".tabs__item:first-child a" ).click().focus();
                            }
                            // else activate next
                            else {
                                    $activated.next().children( ".tabs__link" ).click().focus();
                            }
                            event.preventDefault();
                    }
                    else if ( event.keyCode == 36 ) {
                            // activate first tab
                            $parent.find( ".tabs__item:first-child a" ).click().focus();
                            event.preventDefault();
                    }
                    else if ( event.keyCode == 35 ) {
                            // activate last tab
                            $parent.find( ".tabs__item:last-child a" ).click().focus();
                            event.preventDefault();
                    }
                
                }
 
        } )
        .on( "keydown", ".tabs__tabcontent", function( event ) {
        
                var $this = $(this),
                       $tab_to_focus,
                       $parent;
                    
                    // CTRL up/Left
                    if ( (event.keyCode == 37 || event.keyCode == 38) && event.ctrlKey ) {
                             $tab_to_focus = $this.attr('aria-labelledby');
                             $("#" + $tab_to_focus).focus();
                             event.preventDefault();                             
                       }
                    // CTRL PageUp
                    if ( event.keyCode == 33 && event.ctrlKey ) {
                             $tab_focused = $this.attr('aria-labelledby');
                             $("#" + $tab_focused).focus();
                             
                             $parent = $("#" + $tab_focused).parent();
                             
                             // if we are on first => activate last
                             if ( $parent.is( ".tabs__item:first-child" ) ) {
                                   $parent.parent().find( ".tabs__item:last-child a" ).click().focus();
                             }
                             // else activate prev
                             else {
                                   $parent.prev().children( ".tabs__link" ).click().focus();
                             }
                             event.preventDefault();
                       }
                    // CTRL PageDown
                    if ( event.keyCode == 34 && event.ctrlKey ) {
                             $tab_focused = $this.attr('aria-labelledby');
                             $("#" + $tab_focused).focus();
                             
                             $parent = $("#" + $tab_focused).parent();
                             // if we are on last => activate first
                             if ( $parent.is( ".tabs__item:last-child" ) ) {
                                   $parent.parent().find( ".tabs__item:first-child a" ).click().focus();
                             }
                             // else activate next
                             else {
                                   $parent.next().children( ".tabs__link" ).click().focus();
                             }
                             event.preventDefault();
                       }
        
        } );
  
});
