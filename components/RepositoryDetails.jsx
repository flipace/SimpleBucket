RepositoryDetails = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        if(this.props.repository) {
            RepositorySubscription = Meteor.subscribe('repository', this.props.repository);

            return {
                isLoaded: RepositorySubscription.ready(),
                repository: Repository.find().fetch()[0],
                page: Session.get('repository.page') || 'overview'
            }
        }

        return {

        }
    },
    goToPage(page) {
        Session.set('repository.page', page);
    },
    render() {
        if(this.props.repository) {
            return (
                <VelocityTransitionGroup transitionName="default">
                    {this.data.isLoaded ? this.renderRepository() : <LoadingIndicator message="Loading repository data" />}
                </VelocityTransitionGroup>
            );
        } else {
            return (
                <div>Please select a repository.</div>
            )
        }
    },
    renderRepository() {
        var repository = this.data.repository;

        return (
            <div key={this.props.repository.replace('/','-')} className="repository-details">
                <div className="repository-header">
                    <div className="f-l">
                        <span><a href={repository.links.self.href} target="_blank">{repository.full_name}</a></span>
                        <h1>{repository.name}</h1>
                    </div>

                    <div className="f-r">
                        {this.renderOwner()}
                    </div>
                    <div className="clear" />

                    {this.renderButton('overview')}
                    {this.renderButton('commits')}
                </div>

                <VelocityTransitionGroup transitionName="default">
                    <div key="repository-body" className="repository-body">
                        {this.renderPage()}
                    </div>
                </VelocityTransitionGroup>
            </div>
        )
    },
    renderOwner() {
        var owner = this.data.repository.owner;

        return (
            <div className="repository-owner">
                <span className="username">
                    <a href={owner.links.html.href} target="_blank">
                        <div style={{backgroundImage: 'url('+owner.links.avatar.href+')'}} className="avatar" />
                        <br />
                        {owner.display_name} ({owner.username})
                    </a>
                </span>
            </div>
        )
    },
    renderButton(page) {
        var text = _.capitalize(page);
        var color = "blue";

        switch(page) {
            case 'overview':
                color = "green";
                break;
            case 'commits':
                text = "Commits";
                break;
            case 'pullrequests':
                text = "Pull Requests";
                break;
        }

        return (
            <a className={"button small "+color} onClick={this.goToPage.bind(null, page)}>
                {text}
            </a>
        );
    },
    renderPage() {
        switch(this.data.page) {
            case 'commits':
                return <RepositoryCommits key="commits" {...this.data.repository} />; break;
            case 'overview':
                return <RepositoryOverview key="overview" {...this.data.repository} />; break;
        }
    }
});
