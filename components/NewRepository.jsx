NewRepositoryForm = React.createClass({
    getInitialState() {
        return {
            repo_name: ''
        }
    },
    changeName(evt) {
        this.setState({
            repo_name: evt.target.value
        });
    },
    onClickCreate() {
        Meteor.call('createRepository', { name: this.state.repo_name }, (err, res) => {
            console.log(err, res);
            window.modal.close();
        });
    },
    render() {
        return (
            <div>
                <h1>Create a new repository</h1>

                <input type="text" value={this.state.repo_name} onChange={this.changeName} />

                <a className="button" onClick={this.onClickCreate}>Create repository</a>
            </div>
        )
    }
})
