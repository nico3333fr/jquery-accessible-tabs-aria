# jQuery accessible tabs using ARIA

A presentation and demo page is here: https://a11y.nicolas-hoffmann.net/tabs/ 

This simple script transforms this simple list of anchors to contents:

```
<div class="js-tabs">
  <ul class="js-tablist">
   <li class="js-tablist__item">
    <a href="#id_first" id="label_id_first" class="js-tablist__link">1st tab</a>
   </li>
   <li class="js-tablist__item">
    <a href="#id_second" id="label_id_second" class="js-tablist__link">2nd tab</a>
   </li>
   <li class="js-tablist__item">
    <a href="#id_third" id="label_id_third" class="js-tablist__link">3rd tab</a>
   </li>
   <li class="js-tablist__item">
    <a href="#id_fourth" id="label_id_fourth" class="js-tablist__link">4th tab</a>
   </li>
  </ul>
 <div id="id_first" class="js-tabcontent">
   here the content of 1st tab
 </div>
 <div id="id_second" class="js-tabcontent">
   here the content of 2nd tab
 </div>
 <div id="id_third" class="js-tabcontent">
   here the content of 3rd tab
 </div>
 <div id="id_fourth" class="js-tabcontent">
   here the content of 4th tab
 </div>
</div>
```

into shiny accessible tabs by adding ARIA attributes. 

Keyboard navigation is supported, based on ARIA DP (http://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel && http://www.oaa-accessibility.org/examplep/tabpanel1/):

__If you focus in the tabs "buttons"__
- use Up/Left to see previous tab, 
- use Down/Right to see next tab
- Use "Home" to see first tab (wherever you are in tab buttons)
- Use "End" to see last tab (wherever you are in tab buttons)

__If you focus in a tab content__
- use Ctrl Up/left to Set focus on the tab button for the currently displayed tab
- use Ctrl PageUp to Set focus on the previous tab button for the currently displayed tab
- use Ctrl PageDown to Set focus on the next tab button for the currently displayed tab
 
__Warning__: Ctrl+PageUp/PageDown combination could activate for some browsers a switch of browser tabs. Nothing to do for this, as far as I know (if you have a solution, let me know).

## Normal or nested tabs?

If you need to have nested tabs, you should use ```jquery-accessible-nested-tabs.js``` which has stricter selectors. 
See this issue that explains why https://github.com/nico3333fr/jquery-accessible-tabs-aria/issues/17

## Features

If there is a fragment in URL, the script detects if it is **on** or **in** a tab content, and select the tab automatically.

You can make a link to a tab (which opens it). ```<a href="#link-to-tab-content" class="js-link-to-tab">link to tab</a>```

Fragment is added to URL if you select a tab.

You can also use disabled tab (see https://a11y.nicolas-hoffmann.net/tabs/#disabled_work for a demo)

If you need a tab to be opened by default, it is possible, using ```data-selected="1"``` on the ```js-tablist__link``` you need to open.

Other tabs are still available, here are the rules for this feature:

- The fragment detection has always priority on this feature;
- If there are several ```data-selected="1"``` put on tabs (which does not make sense and should never happen), the first one will be used;
- If the ```data-selected="1"``` attribute is set on a disabled tab, of course it won’t be selected.


## Requirements

- jQuery (others smaller libraries should be ok, but didn't test for the moment)
- a small piece of CSS `` .js-tabcontent[aria-hidden=true] { display: none; } ``
- respect the classes given above, and the convention a href="#**id_fourth**" id="label&#95;**id_fourth**" (will improve later)
- Use attribute data-hx="hx" (ex data-hx="h2" if your tab system is after a h1) to specify Hx structure in your tabs if they don't have one in tab content (will be added, and can be hidden throught a class invisible) OR
- Indicate the hx structure contained in your tab contents, using the attribute data-existing-hx="h2"
 
This jQuery plugin __doesn't style tabs__ (except ``.js-tabcontent[aria-hidden=true]`` of course), styles can be added using other classes.

A demo page is here with full docs and examples: https://a11y.nicolas-hoffmann.net/tabs/ 

It can be included for one, two tab systems or more in a page.

Enjoy.

<img src="https://www.nicolas-hoffmann.net/bordel/chuck-norris1.jpg" alt="Chuck Norris approved this" />

P.S: this plugin is in [MIT license](https://github.com/nico3333fr/jquery-accessible-tabs-aria/blob/master/LICENSE). It couldn't be done without the precious help of @ScreenFeedFr, @sophieschuermans, @goetsu and @romaingervois.
