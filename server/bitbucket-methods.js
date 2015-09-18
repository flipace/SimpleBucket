Meteor.publish('repository', function(path) {
    var client = getClient(this.userId);
    var repository = client.get('/2.0/repositories/'+path)

    this.added('repository', Random.id(), repository);

    this.ready();
});

function getClient(userId) {
    var user = Meteor.users.findOne(userId);
    var client = Bitbucket.forUser(user);
    return client;
}
