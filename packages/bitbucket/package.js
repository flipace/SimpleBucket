Package.describe({
  name: 'flipace:bitbucket',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use('http', ['client', 'server']);
  api.use('templating', 'client');
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('random', 'client');
  api.use('underscore', 'server');
  api.use('service-configuration', ['client', 'server']);

  api.addFiles(
    ['bitbucket_configure.html', 'bitbucket_configure.js'],
    'client');

  api.addFiles('./bitbucket_server.js', 'server');
  api.addFiles('./bitbucket_client.js', 'client');

  api.export('Bitbucket');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('bitbucket-oauth');
  api.addFiles('bitbucket-oauth-tests.js');
});
