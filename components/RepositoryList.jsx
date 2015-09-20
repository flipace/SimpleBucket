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
    getInitialState() {
        return {
            showList: true
        }
    },
    onClickRepository(path) {
        Session.set('repository', path);
        this.setState({
            showList: false
        });
    },
    onClickAdd() {
        var modal = React.createElement(Modal, {
            active: true
        }, <NewRepositoryForm />);

        window['modal'] = React.render(modal, $('#modal-container')[0]);
    },
    onClickToggleRepositoryList() {
        this.setState({
            showList: !this.state.showList
        });
    },
    render() {
        return (
            <div>
                <h1 onClick={this.onClickToggleRepositoryList}><span className="toggle">Toggle</span> Repositories <i className="fa fa-plus f-r" onClick={this.onClickAdd}></i></h1>
                <VelocityTransitionGroup key={"repository-list"} transitionName="default">
                    <div className={"repository-list"+(!this.state.showList ? " hidden" : "")}>
                            {this.data.isLoaded ? this.data.repositories.map(this.renderRepository) : <LoadingIndicator message="Loading repositories..." />}
                    </div>
                </VelocityTransitionGroup>
            </div>
        )
    },
    renderRepository(repo) {
        var path = repo.links.self.href.substr(repo.links.self.href.indexOf(repo.owner.username));

        return (
            <div className={"item"+(this.data.repository == repo.full_name ? ' active' : '')} key={repo._id} onClick={this.onClickRepository.bind(null, path)}>
                {repo.name}
            </div>
        )
    }
})
