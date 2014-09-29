$(document).ready(function(){


  /* loading aria attribute on tabs ---------------------------------------------------------------------------------- */
  $('.tabs__list').attr('role', 'tablist');      // ul
  $('.tabs__item').attr('role', 'presentation'); // li
  
  $('.tabs__link').attr('role', 'tab');          // a
  $('.tabs__link').each(function() {             // controls attribute
     $this = $(this);
     controls = '' + $this.attr('href');
     controls = controls.replace('#','');
     $this.attr('aria-controls', controls);
     $this.attr('tabindex', '-1');
  });
  
  $('.tabs__tabcontent').attr('role', 'tabpanel');    // contents
  $('.tabs__tabcontent').attr('aria-hidden', 'true'); // all hidden
  $('.tabs__tabcontent').each(function() {            // label by link
     $this = $(this);
     labelledby = 'label_' + $this.attr('id');
     $this.attr('aria-labelledby', labelledby);
  });
  
  // hash => select the good one
  hash = window.location.hash;
  hash = hash.replace('#','');
  $('.tabs__tabcontent').each(function() {
     $this = $(this);
     if ( hash == $this.attr('id') ){
         selector = '#' + hash;
         // display
         $(selector).removeAttr('aria-hidden');
         // selection menu
         selector = '#label_' + hash;
         $(selector).attr('aria-selected', 'true');
         $(selector).attr('tabindex', '0');
         return false;
     }
  });
  // if no selected => select first
  $( ".tabs" ).each(function( index ) {
     var $this = $(this);
     if ($this.find('.tabs__link[aria-selected]').length == 0) {
        $this.find('.tabs__link:first').attr('aria-selected', 'true');
        $this.find('.tabs__link:first').attr('tabindex', '0');
        $this.find('.tabs__tabcontent:first').removeAttr('aria-hidden');
     }
  });
   
  /* click on a link */
  $('.tabs__link').click(
     function() {
      $this = $(this);
      
      // find parent
      $parent = $this.parents(".tabs");
      
      // remove aria selected on all link
      $parent.find('.tabs__link').removeAttr('aria-selected');
      $parent.find('.tabs__link').attr('tabindex', '-1');
      
      // add aria selected on $this
      $this.attr('aria-selected', 'true');
      $this.attr('tabindex', '0');
      
      // add aria-hidden on all tabs
      $parent.find('.tabs__tabcontent').attr('aria-hidden', 'true');
      
      // remove aria-hidden on tab linked
      id_to_show = '#' + $this.attr('aria-controls');
      $(id_to_show).removeAttr('aria-hidden');
      
      return false;
      }
    );

  $('body').on('keydown','.tabs', function(event) {
  
      $parent = $(this);
  
      // strike up or left in the tab
      if (event.keyCode == 37 || event.keyCode == 38) {
         // find previous tab
         // if we are on first => activate last
         $activated = $parent.find('.tabs__link[aria-selected="true"]').parent();
         if($activated.is('.tabs__item:first-child')) {
            $parent.find('.tabs__item:last-child a').click().focus();
            }
            else { // else activate previous
                 $activated.prev().children('.tabs__link').click().focus();
                 }
         event.preventDefault();
         }
      // strike down or right in the tab
      if (event.keyCode == 40 || event.keyCode == 39) {
         // find next tab
         // if we are on last => activate first
         $activated = $parent.find('.tabs__link[aria-selected="true"]').parent();
         if($activated.is('.tabs__item:last-child')) {
            $parent.find('.tabs__item:first-child a').click().focus();
            }
            else { // else activate next
                 $activated.next().children('.tabs__link').click().focus();
                 }
         event.preventDefault();
         }
      
      }
    );
  
});
