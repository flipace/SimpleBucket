LoadingIndicator = React.createClass({
    render() {
        return (
            <div className={"spinner "+(this.props.relativePosition ? 'relative':'')}>
                <span className="message">
                    <div className="cube1"></div>
                    <div className="cube2"></div>
                </span>
                <p>{this.props.message}<br /><br /><span className="subline">{this.props.subline}</span></p>
            </div>
        )
    }
});
