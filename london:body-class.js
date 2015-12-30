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

Blaze.addBodyClass = function (fn) {
  if($.isArray(fn)) {
    return fn.forEach(Blaze.addBodyClass)
  }
  if(typeof fn !== 'function') {
    return Meteor.startup(function () { $('body').addClass(fn) })
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
      if (Router.current()) {
			     var url = Router.current().route.getName();
			     var urlParts = url.split('.');
			     var classes = [urlParts[0]];
			     var lastClass = urlParts[0];
			     for (var i=1; i<urlParts.length; i++) {
				      lastClass += '_' + urlParts[i];
				      classes.push(lastClass);
			     }
			     return classes.join(' ');
		    }
    })
  })
}
if(Package['meteorhacks:flow-router'] || Package['kadira:flow-router']) {
  Meteor.startup(function () {
    Blaze.addBodyClass(function () {
      FlowRouter.watchPathChange();
      var currentContext = FlowRouter.current();
      return currentContext &&
             currentContext.route &&
             currentContext.route.name
    });
  })
}
