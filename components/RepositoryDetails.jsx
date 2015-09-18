RepositoryDetails = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        if(this.props.repository) {
            Meteor.subscribe('repository', this.props.repository);

            return {
                repository: Repository.find().fetch()[0]
            }
        }

        return {

        }
    },
    render() {
        if(this.props.repository && this.data.repository) {
            return this.renderRepository();
        } else {
            return (
                <div>Please select a repository.</div>
            )
        }
    },
    renderRepository() {
        var repository = this.data.repository;
        console.log(this.data.repository);
        return (
            <div className="repository-details">
                <h1>{repository.name}</h1>
                <b>Slug:</b> <a href={repository.links.self.href} target="_blank">{repository.full_name}</a>
                <p>{repository.description}</p>
            </div>
        )
    }
})
