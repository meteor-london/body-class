/*
```
Meteor ================================================

'||     .|''''|, '||\   ||` '||'''|. .|''''|, '||\   ||`
 ||     ||    ||  ||\\  ||   ||   || ||    ||  ||\\  ||
 ||     ||    ||  || \\ ||   ||   || ||    ||  || \\ ||
 ||     ||    ||  ||  \\||   ||   || ||    ||  ||  \\||
.||...| `|....|' .||   \||. .||...|' `|....|' .||   \||.

 ============================================ body-class
```

Giving you `UI.addBodyClass` for **live live live** reactive class names on the body element.

Usage: `UI.addBodyClass(fn)`

Example:

```javascript

Session.setDefault('state', 'alpha')

UI.addBodyClass(function() {
  return Session.get('state')
})

```
results in `<body class="alpha">`

- If `iron:router` is present, the current route is automatically added as a body class.
- Calling addBodyClass multiple times is fine. They all end up as additional body classes.
- Duplicate classes are removed by virtue of using jQuery `addClass` to do the dirty work.

by: @olizilla for meteor-london
*/

UI.addBodyClass = function (fn) {
  if($.isArray(fn)) {
    return fn.forEach(UI.addBodyClass)
  }
  if(typeof fn !== 'function') {
    return Meteor.startup(function () { $('body').addClass(fn) })
  }

  Meteor.startup(function () {
    Deps.autorun(function () {
      $('body')
        .removeClass(fn._prev)
        .addClass(fn._prev = fn())
    })
  })
}

Meteor.startup(function(){
  if(this.Router) {
    UI.addBodyClass(function () { return Router.current() && Router.current().route.name })
  }
})
