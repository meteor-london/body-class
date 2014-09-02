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

```shell
meteor add london:body-class
```

Call `UI.addBodyClass(fn)` with a function and it's return value will be added as a class to the body.

If that function uses a reactive data source (Collection, Session, etc) then the body class will update when the dependencies change.

You can also just call `UI.addBodyClass('foo')` with a string to add a static class to the body.

## Examples

```javascript
Session.setDefault('state', 'alpha')

UI.addBodyClass(function() {
  return Session.get('state')
})
```
results in
```html
<body class="alpha">
```

The value from `Session.get('state')` is added as a class to the <body> element,
It will be updated whenever the value for `state` changes.


```javascript
// You can also add static classes
UI.addBodyClass('foo')

// Or some combination of the two...
UI.addBodyClass([
 'bar',
  function () { return Meteor.status().status }
])
```
results in

```html
<body class="foo bar connected">
```

Where `connected` will update to reflect the current connection state with the server.

So, remember kids:

- If [iron:router](https://atmospherejs.com/iron/router) is present, the current route is automatically added as a body class.
- Calling `addBodyClass` multiple times is fine. They all end up as additional body classes.
- Duplicate classes are removed by virtue of using jQuery `addClass` to do the dirty work.
- For bonus points: add `Meteor.status().status` as a body class so you can visualize the connection health.
