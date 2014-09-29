# jquery-accessible-tabs-aria
===========================

This simple script transforms this code:

```
<div class="tabs">
  <ul class="tabs__list">
   <li class="tabs__item">
    <a href="#id_first" id="label_id_first" class="tabs__link">1st tab</a>
   </li>
   <li class="tabs__item">
    <a href="#id_second" id="label_id_second" class="tabs__link">2nd tab</a>
   </li>
   <li class="tabs__item">
    <a href="#id_third" id="label_id_third" class="tabs__link">3rd tab</a>
   </li>
   <li class="tabs__item">
    <a href="#id_fourth" id="label_id_fourth" class="tabs__link">4th tab</a>
   </li>
  </ul>
 <div id="id_first" class="tabs__tabcontent">
   here the content of 1st tab
 </div>
 <div id="id_second" class="tabs__tabcontent">
   here the content of 2nd tab
 </div>
 <div id="id_third" class="tabs__tabcontent">
   here the content of 3rd tab
 </div>
 <div id="id_fourth" class="tabs__tabcontent">
   here the content of 4th tab
 </div>
</div>
```

into accessible tabs by adding ARIA attributes. Keyboard navigation is supported (use up/left to see previous tab, and down/right to see next tab).

## Requirements

- jQuery (others smaller libraries should be ok, but didn't test for the moment)
- a small piece of CSS `` [aria-hidden=true] { display: none; } ``
- respect the classes given above, and the convention a href="#**id_fourth**" id="label__&#95;&#95;id_fourth__" (will improve later)
 
This jQuery plugin doesn't style (except ``aria-hidden="true"`` of course), styles can be added using other classes.

Enjoy.
