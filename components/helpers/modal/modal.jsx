Modal = React.createClass({
	open() {
		this.setState({active: true});
	},
	close() {
		this.setState({active: false});
	},
	toggle() {
		this.setState({active: this.state.active ? false : true});
	},
	getInitialState() {
		return {
			active: this.props.active
		}
	},
    componentWillReceiveProps(nextProps) {
        if(typeof(nextProps.active) != 'undefined') {
            this.setState({
                active: nextProps.active
            });
        }
    },
	render() {
		return (
			<div className={"modal "+(this.state.active ? 'active' : '')}>
				<div className="content">
					<span className="closeModal fa fa-times" onClick={this.close}></span>

					{this.props.children}
				</div>
			</div>
		)
	}
})
