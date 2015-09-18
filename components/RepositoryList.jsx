RepositoryList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var repositories = Repositories.find({},{$order: ["name", "asc"]}).fetch();

        return {
            repositories: _.sortBy(repositories, function(repo) { return repo.name.toLowerCase()})
        }
    },
    onClickRepository(slug) {
        Session.set('repository', slug);
    },
    render() {
        return (
            <div>
                <h1>Repositories</h1>
                <div className="repository-list">
                    {this.data.repositories.map(this.renderRepository)}
                </div>
            </div>
        )
    },
    renderRepository(repo) {
        return (
            <div className="item" key={repo._id} onClick={this.onClickRepository.bind(null, repo.full_name)}>
                {repo.name}
            </div>
        )
    }
})
