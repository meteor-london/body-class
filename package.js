Package.describe({
  summary: 'Giving you `Blaze.addBodyClass` for reactive class names on the body element',
  version: '2.2.0',
  name: 'london:body-class',
  git: 'https://github.com/meteor-london/body-class.git'
})

Package.onUse(function (api) {
  api.versionsFrom('1.0.1');
  api.use('blaze', 'client')
  api.use('jquery', 'client')
  api.use('iron:router@1.0.0','client', { 'weak': true })
  api.use('meteorhacks:flow-router@1.4.0', 'client', { 'weak': true })
  api.addFiles('london:body-class.js', 'client')
})
