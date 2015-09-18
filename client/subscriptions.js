Meteor.autosubscribe(function(){
  var newUser = Meteor.user();
  Meteor.subscribe('currentAccessToken');
});

Repositories = new Mongo.Collection('repositories');
Repository = new Mongo.Collection('repository');

Meteor.subscribe('repositories');
