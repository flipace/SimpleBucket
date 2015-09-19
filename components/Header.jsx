Header = React.createClass({
    onClickLogout() {
        Meteor.logout(function() {
            location.reload();
        });
    },
    render() {
        return (
            <div className="header">
                <span className="f-l logo">SimpleBucket</span>
                <div className="f-r">
                    {this.renderNavigation()}
                </div>
            </div>
        )
    },
    renderNavigation() {
        if(Meteor.user()) {
            return this.renderNavigationLoggedIn();
        } else {
            return '';
        }
    },
    renderNavigationLoggedIn() {
        return (
            <div>
                <a onClick={this.onClickLogout}>Logout</a>
            </div>
        );
    }
})
