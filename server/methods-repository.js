function getClient(userId) {
    var user = Meteor.users.findOne(userId);
    if(user) {
        var client = Bitbucket.forUser(user);
        return client;
    }

    return false;
}

Meteor.methods({
    'createRepository': function(params) {
        var client = getClient(this.userId);

        if(client) {
            var user = client.get("/1.0/user").user;

            var newRepo = client.post("/2.0/repositories/"+user.username+"/"+params.name, {
                is_private: true,
                scm: "git",
                fork_policy: "no_public_forks"
            });

            return newRepo;
        }

        return false;
    }
})
