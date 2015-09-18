var ReactTransitionGroup = React.addons.TransitionGroup;

VelocityTransitions = {
	// Forcefeeding: property order = [after, before]
	'slide-forward': {
		duration: 200,
		enter: {
			translateX: [ '0%', '100%' ],
		},
		leave: {
			translateX: [ '-100%', '0%' ],
		}
	},
	'slide-back': {
		duration: 200,
		enter: {
			translateX: [ '0%', '-100%' ],
		},
		leave: {
			translateX: [ '100%', '0%' ],
		}
	},
    'slide-down': {
        duration: 200,
        enter: {
            translateY: [ '0%', '-50%' ],
    		opacity: [ 1, 0 ],
        },
        leave: {
            translateY: [ '-50%', '0%' ],
    		opacity: [ 0,1],
        }
    },
	'slideover-forward': {
		duration: 200,
		enter: {
			translateX: [ '0%', '100%' ],
			zIndex: [ 1, 1 ]
		},
		leave: {
			// translateX: [ '0%', '0%' ],
			zIndex: [ 0, 0 ]
		}
	},
	'slideover-back': {
		duration: 200,
		enter: {
			// translateX: [ '0%', '0%' ],
			zIndex: [ 0, 0 ]
		},
		leave: {
			translateX: [ '100%', '0%' ],
			zIndex: [ 1, 1 ]
		}
	},
	default: {
		duration: 200,
		enter: {
			opacity: [ 1, 0 ],
		},
		leave: {
			opacity: [ 0, 1 ],
		}
	}
};

VelocityTransitionGroupChild = React.createClass({
	propTypes: {
		transitionName: React.PropTypes.string.isRequired,
	},

    getInitialState() {
        return {
            transitionName: this.props.transitionName
        }
    },

	_getTransition: function() {
		if (!VelocityTransitions[this.state.transitionName]) {
			console.warn('TransitionName ' + this.state.transitionName + ' wasn\'t found in VelocityTransitionGroupChild transitions.');
		}
		return VelocityTransitions[this.state.transitionName] || VelocityTransitions.default;
	},

    componentWillReceiveProps: function(nextProps) {
        if(!this._getTransition().keepOnTransitionNameChange) {
            this.setState({
                transitionName: nextProps.transitionName
            })
        }
    },

	componentWillEnter: function(done) {
		var node = this.getDOMNode();
		var transition = this._getTransition();
		$.Velocity(
			node,
			transition.enter,
			{
				duration: transition.duration,
				complete: done
			});
	},

	componentWillLeave: function(done) {
		var node = this.getDOMNode();
		var transition = this._getTransition();
		$.Velocity(
			node,
			transition.leave,
			{
				duration: transition.duration,
				complete: done
			});
	},

	render: function() {
		return React.Children.only(this.props.children);
	}
});

VelocityTransitionGroup = React.createClass({
	propTypes: {
		transitionName: React.PropTypes.string.isRequired,
	},

	_wrapChild: function(child) {
		return (
			<VelocityTransitionGroupChild
				transitionName={this.props.transitionName}
				>
				{child}
			</VelocityTransitionGroupChild>
		);
	},

	render: function() {
		return (
			<ReactTransitionGroup
				{...this.props}
				childFactory={this._wrapChild}
				/>
		);
	}
});
