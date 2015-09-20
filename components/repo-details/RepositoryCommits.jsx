RepositoryCommits = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var handle = Meteor.subscribe("commits", this.props.full_name, this.state.limit);

        if(handle.ready()) {
            commits = Commits.find().fetch();

            return {
                commits,
                isLoading: false
            };
        }

        return {
            commits: this.data.commits || false,
            isLoading: true
        };
    },
    getInitialState() {
        return {
            limit: 30,
            increments: 30
        }
    },
    getMoreCommits() {
        this.setState({
            limit: this.state.limit+this.state.increments
        });
    },
    componentWillUnmount() {
        Meteor.subscribe("commits", false);
    },
    componentDidUpdate() {
        var client = new ZeroClipboard($('.copy-hash'));
    },
    render() {
        if(this.data.commits) {
            return this.renderCommits();
        } else {
            return (
                <LoadingIndicator message="Loading commits..." />
            )
        }
    },
    renderCommits() {
        return (
            <div>
                <h2>Commits</h2>

                <CommitTable commits={this.data.commits} />

                {() => {
                    if(this.data.isLoading) {
                        return (
                            <LoadingIndicator message="Loading more commits..." relativePosition={true} />
                        )
                    } else {
                        return this.renderMoreButton();
                    }
                }()}
            </div>
        );
    },
    renderMoreButton() {
        return (
            <div>
                <br />
                <a className="button" onClick={this.getMoreCommits}>Show more commits</a>
            </div>
        )
    }
})
