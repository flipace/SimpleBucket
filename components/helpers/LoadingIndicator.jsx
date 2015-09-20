LoadingIndicator = React.createClass({
    render() {
        return (
            <div className={"spinner "+(this.props.relativePosition ? 'relative':'')}>
                <span className="message">
                    <div className="cube1"></div>
                    <div className="cube2"></div>
                </span>
            </div>
        )
    }
});
