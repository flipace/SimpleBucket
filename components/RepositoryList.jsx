RepositoryList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var repositories = Repositories.find({},{$order: ["name", "asc"]}).fetch();

        return {
            isLoaded: RepositoriesSubscription.ready(),
            repositories: _.sortBy(repositories, function(repo) { return repo.name.toLowerCase()}),
            repository: Session.get('repository')
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
                    <VelocityTransitionGroup transitionName="default">
                        {this.data.isLoaded ? this.data.repositories.map(this.renderRepository) : <LoadingIndicator message="Loading repositories..." />}
                    </VelocityTransitionGroup>
                </div>
            </div>
        )
    },
    renderRepository(repo) {
        return (
            <div className={"item"+(this.data.repository == repo.full_name ? ' active' : '')} key={repo._id} onClick={this.onClickRepository.bind(null, repo.full_name)}>
                {repo.name}
            </div>
        )
    }
})
