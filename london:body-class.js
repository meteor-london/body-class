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

Giving you `Blaze.addBodyClass` for **live live live** reactive class names on the body element.

Usage: `Blaze.addBodyClass(fn)`

Example:

```javascript

Session.setDefault('state', 'alpha')

Blaze.addBodyClass(function() {
  return Session.get('state')
})

```
results in `<body class="alpha">`

- If `iron:router` is present, the current route is automatically added as a body class.
- Calling addBodyClass multiple times is fine. They all end up as additional body classes.
- Duplicate classes are removed by virtue of using jQuery `addClass` to do the dirty work.

by: @olizilla for meteor-london
*/
var prevSingleton

Blaze.addBodyClass = function (fn) {
  if($.isArray(fn)) {
    return fn.forEach(Blaze.addBodyClass)
  }
  if(typeof fn !== 'function') {
    $('body').removeClass(prevSingleton)
    return Meteor.startup(function () { $('body').addClass(prevSingleton = fn) })
  }

  Meteor.startup(function () {
    Tracker.autorun(function () {
      $('body')
        .removeClass(fn._prev)
        .addClass(fn._prev = fn())
    })
  })
}
if(Package['iron:router']) {
  Meteor.startup(function () {
    Blaze.addBodyClass(function () {
      var className = Router.current() && Router.current().route.getName();
      if(className){
            className = className.replace(/\./g, '-');
      }
      return className;
    })
  })
}
if(Package['meteorhacks:flow-router'] || Package['kadira:flow-router']) {
  Meteor.startup(function () {
    // Since we need to wait for startup, we need to addBodyClass immediately, as the entry page will already have rendered
    Blaze.addBodyClass(FlowRouter.getRouteName())
    FlowRouter.triggers.enter([function (context) {
      Blaze.addBodyClass(context.route.name)
    }])
  })
}
