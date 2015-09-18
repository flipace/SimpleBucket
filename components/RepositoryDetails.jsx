RepositoryDetails = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        if(this.props.repository) {
            RepositorySubscription = Meteor.subscribe('repository', this.props.repository);

            return {
                isLoaded: RepositorySubscription.ready(),
                repository: Repository.find().fetch()[0]
            }
        }

        return {

        }
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
            <div key={this.props.repository} className="repository-details">
                <div className="repository-header">
                    <div className="f-l">
                        <span><a href={repository.links.self.href} target="_blank">{repository.full_name}</a></span>
                        <h1>{repository.name}</h1>
                    </div>
                    <div className="f-r">
                        {this.renderOwner()}
                    </div>
                    <div className="clear" />
                </div>

                <div className="repository-body">
                    <p>{repository.description}</p>

                    {this.renderButton('self')}
                    {this.renderButton('commits')}
                    {this.renderButton('pullrequests')}

                    <hr />

                    <table>
                    {this.data.repository.links.clone.map(this.renderCloneMethod)}
                    </table>
                    
                </div>
            </div>
        )
    },
    renderButton(page) {
        var links = this.data.repository.links;
        var url = links.html.href;
        var text = _.capitalize(page);
        var color = "blue";

        switch(page) {
            case 'self':
                text = "Go to repository";
                color = "green";
                break;
            case 'commits':
                url += '/commits/all';
                text = "Commits";
                break;
            case 'pullrequests':
                url += '/pull-requests/';
                text = "Pull Requests";
                break;
        }

        return (
            <a className={"button "+color} href={url} target="_blank">
                {text}
            </a>
        );
    },
    renderOwner() {
        var owner = this.data.repository.owner;

        return (
            <div className="repository-owner">
                <span className="username">
                    <a href={owner.links.self.href} target="_blank">
                        <div style={{backgroundImage: 'url('+owner.links.avatar.href+')'}} className="avatar" />
                        <br />
                        {owner.display_name} ({owner.username})
                    </a>
                </span>
            </div>
        )
    },
    renderCloneMethod(clone, i) {
        return (
            <tr key={i+clone.name}>
                <td><b>{clone.name.toUpperCase()}</b></td>
                <td><span className="clone-link">{clone.href}</span></td>
            </tr>
        )
    }
})
