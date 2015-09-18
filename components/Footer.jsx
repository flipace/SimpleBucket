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
                footer
            </div>
        );
    }
})
