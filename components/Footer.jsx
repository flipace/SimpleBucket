Footer = React.createClass({
    render() {
        if(Meteor.user()) {
            return this.renderFooterLoggedIn();
        } else {
            return this.renderFooterGuest();
        }
    },
    renderFooterLoggedIn() {
        return (
            <div className="footer logged-in">
                <a href="https://github.com/flipace/SimpleBucket">SimpleBucket on GitHub</a>
            </div>
        );
    },
    renderFooterGuest() {
        return (
            <div className="footer">
                <a href="https://github.com/flipace/SimpleBucket">SimpleBucket on GitHub</a>
            </div>
        )
    }
})
