Meteor.publish('repositories', function() {
    var self = this;

    if(this.userId) {
        var user = Meteor.users.findOne(this.userId);

        var client = Bitbucket.forUser(user);

        var teams = client.get('/2.0/teams?role=admin');

        _.each(teams.values, function(team) {
            var repos = client.get('/2.0/repositories/'+team.username);

            _.each(repos.values, function(repo) {
                self.added('repositories', Random.id(), repo)
            });
        });

        self.ready();
    }
});
