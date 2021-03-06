function getClient(userId) {
    var user = Meteor.users.findOne(userId);
    if(user) {
        var client = Bitbucket.forUser(user);
        return client;
    }

    return false;
}

RepositoryCache = new ReactiveVar({ });
DeletedRepositoryId = new ReactiveVar('');

Meteor.publish('repositories', function() {
    var self = this;
    var client = getClient(this.userId);
    var cache = RepositoryCache.get();

    if(typeof(cache[this.userId]) == 'undefined') {
        cache[this.userId] = {};
    }

    if(!client) { return; }

    var teams = client.get('/2.0/teams?role=admin');
    var user = client.get('/1.0/user').user;

    _.each(teams.values, function(team) {
        cache[self.userId][team.username] = [];
        var repos = client.get('/2.0/repositories/'+team.username);

        _.each(repos.values, function(repo) {
            cache[self.userId][team.username].push(_.extend(repo, {randomId: Random.id()}));
        });
    });

    cache[this.userId][user.username] = [];
    var repos = client.get('/2.0/repositories/'+user.username);

    _.each(repos.values, function(repo) {
        cache[self.userId][user.username].push(_.extend(repo, {randomId: Random.id()}));
    });

    var added = [];
    var deleted = [];

    Tracker.autorun(() => {
        var cache = RepositoryCache.get();

        _.each(cache[this.userId], (user) => {
            _.each(user, (repo) => {
                if(_.contains(added, repo.randomId) !== true) {
                    this.added('repositories', repo.randomId, repo);
                    added.push(repo.randomId);
                }
            });
        });

        var id = DeletedRepositoryId.get();

        if(id != "" && _.contains(deleted, id) === false) {
            this.removed('repositories', id);
            deleted.push(id);
        }
    });

    RepositoryCache.set(cache);

    self.ready();
});

Meteor.publish('repository', function(path) {
    var client = getClient(this.userId);

    if(!client) { return; }

    var repository = client.get('/2.0/repositories/'+path)

    this.added('repository', Random.id(), repository);

    this.ready();
});

var CommitCache = {  };

Meteor.publish('commits', function(repo, limit) {
    if(repo === false) {
        this.stop();
    } else if ( typeof(CommitCache[this.userId]) == 'undefined' ) {
        CommitCache[this.userId] = {
            repo: {
                page: 1,
                values: []
            }
        }
    }

    var cache = CommitCache[this.userId]['repo'];

    var client = getClient(this.userId);
    var ready = false;

    if(!client) { return; }

    var lengthBefore = cache.values.length;

    while(cache.values.length < limit) {
        var url = '/2.0/repositories/'+repo+'/commits?page='+cache.page;
        var commits = client.get(url);

        if(commits.values.length <= 0) {
            break;
        }

        cache.values = cache.values.concat(commits.values);

        cache.page ++;
    }

    cache.values.map((commit) => {
        this.added('commits', Random.id(), commit);
    });

    this.ready();
});
