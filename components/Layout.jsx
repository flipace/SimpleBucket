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
    logout() {
        Meteor.logout(function() {
            //location.reload();
        });
    },
    render() {
        if(!this.data.user) {
            return (
                <div className="page-wrap">
                    <Header />
                    <div className="login-container">
                        <h1>Make your Bitbucket life easier.</h1>
                        <p>With SimpleBucket, you can quickly browse through all your
                            repositories, issues and teams in a easy to use and clean interface.</p>
                        <div ref="loginButtons" />
                    </div>
                    <Footer />
                </div>
            )
        } else {
            return (
                <div className="page-wrap">
                    <Header />
                    <div className="f-l container-left">
                        <RepositoryList />
                    </div>
                    <div className="container-right">
                        <RepositoryDetails repository={this.data.repository} />
                    </div>
                    <div className="clear" />
                    <Footer />
                </div>
            )
        }
    }
})
