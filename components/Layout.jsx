MainLayout = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user(),
            repository: Session.get('repository') || false
        }
    },
    componentDidMount() {
        this.renderLogin();
    },
    componentDidUpdate() {
        this.renderLogin();
    },
    renderLogin() {
        if(this.refs.loginButtons) {
            Blaze.renderWithData(Template.loginButtons,{}, React.findDOMNode(this.refs.loginButtons));
        }
    },
    render() {
        if(!this.data.user) {
            return (
                <div className="page-wrap">
                    <Header />
                    <div className="login-container">
                        <div className="center">
                            <img className="logo" src="images/bitbucket-logo.png" />
                            <h1>Make your Bitbucket life easier.</h1>
                            <p>With SimpleBucket, you can quickly browse through all your
                                repositories, issues and teams in an easy to use and clean interface.</p>
                            <div ref="loginButtons" />

                            <img src="images/preview.png" className="preview" />

                            <Footer />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="page-wrap">
                    <Header loggedIn={true} />
                    <div className="container">
                        <div className="f-l container-left">
                            <RepositoryList />
                        </div>
                        <div className="container-right">
                            <VelocityTransitionGroup key={this.data.repository._id} transitionName="default">
                                <RepositoryDetails repository={this.data.repository} />
                            </VelocityTransitionGroup>
                        </div>
                        <div className="clear" />
                    </div>
                </div>
            )
        }
    }
})
