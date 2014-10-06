# jQuery accessible tabs using ARIA
===========================

This simple script transforms this simple list of anchors to contents:

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

into shiny accessible tabs by adding ARIA attributes. Keyboard navigation is supported:

__If you focus in the tabs "buttons"__
- use up/left to see previous tab, 
- down/right to see next tab
- home to see first tab (wherever you are)
- and end to see last tab (wherever you are)

__If you focus in a tab content__
- use Ctrl Up/left to Set focus on the tab button for the currently displayed tab
- use Ctrl PageUp to Set focus on the previous tab button for the currently displayed tab
- use Ctrl PageDown to Set focus on the next tab button for the currently displayed tab
 
__Warning__: Ctrl+PageUp/PageDown combination could activate for some browsers a switch of browser tabs. Nothing to do for this, as far as I know (if you have a solution, let me know).

## Requirements

- jQuery (others smaller libraries should be ok, but didn't test for the moment)
- a small piece of CSS `` [aria-hidden=true] { display: none; } ``
- respect the classes given above, and the convention a href="#**id_fourth**" id="label&#95;&#95;**id_fourth**" (will improve later)
 
This jQuery plugin __doesn't style tabs__ (except ``aria-hidden="true"`` of course), styles can be added using other classes.

A very crappy example can be found here: http://www.nicolas-hoffmann.net/bordel/tabs/

It can be included for two tab systems or more in a page.

Enjoy.


<img src="http://www.nicolas-hoffmann.net/bordel/chuck-norris1.jpg" alt="Chuck Norris approved this" />
