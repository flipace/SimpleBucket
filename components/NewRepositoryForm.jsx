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
        this.setState({
            isCreating: true
        });

        Meteor.call('createRepository', { name: this.state.repo_name }, (err, res) => {
            window.modal.close();

            this.setState({
                repo_name: '',
                isCreating: false
            });

            Session.set('repository', res.full_name);
        });
    },
    render() {
        if(this.state.isCreating) {
            return (
                <div>
                    <h1>Create a new repository</h1>

                    <LoadingIndicator relativePosition={true} />
                    <br /><br />
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Create a new repository</h1>

                    <input type="text" value={this.state.repo_name} placeholder="My new repository" onChange={this.changeName} />

                    <br />
                    <br />

                    <a className="button large" onClick={this.onClickCreate}>Create repository</a>
                </div>
            )
        }
    }
})
