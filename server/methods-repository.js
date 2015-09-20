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

            var newRepo = client.post("/2.0/repositories/"+user.username+"/"+slugify(params.name), {
                is_private: true,
                scm: "git",
                fork_policy: "no_public_forks",
                name: params.name
            });

            var repo = client.get(newRepo.resource_uri.replace('1.0','2.0'));

            var cache = RepositoryCache.get();
            cache[user.username].push(_.extend(repo, {randomId: Random.id()}));
            RepositoryCache.set(cache);

            return repo;
        }

        return false;
    },
    'deleteRepository': function(params) {
        var client = getClient(this.userId);

        if(client) {
            client.delete("/2.0/repositories/"+params.path);

            var cache = RepositoryCache.get();
            var repoName = params.path.split("/");

            _.each(cache, (userRepos, user) => {
                if(user == repoName[0]) {
                    _.each(userRepos, (repo, index) => {
                        if(params.path == repo.full_name) {
                            DeletedRepositoryId.set(repo.randomId);
                            delete cache[user][index];
                        }
                    })
                }
            });

            RepositoryCache.set(cache);
        }

        return false;
    }
})
