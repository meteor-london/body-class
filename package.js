Package.describe({
  summary: "Giving you `UI.addBodyClass` for reactive class names on the body element",
  version: "1.0.0",
  name: "london:body-class",
  git: "https://github.com/meteor-london/body-class.git"
})

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0.1')
  api.use('jquery')
  api.use('ui')
  api.use('iron:router@0.9.1', { "weak": true })
  api.addFiles('london:body-class.js', 'client')
})
