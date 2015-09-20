Meteor.autosubscribe(function(){
  var newUser = Meteor.user();
  Meteor.subscribe('currentAccessToken');
});

Repositories = new Mongo.Collection('repositories');
Repository = new Mongo.Collection('repository');
Commits = new Mongo.Collection('commits');

RepositoriesSubscription = Meteor.subscribe('repositories');
