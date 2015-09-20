RepositoryOverview = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        if(this.state.showHeatmap) {
            handle = Meteor.subscribe('commits', this.data.full_name, 99999999);

            var commits = Commits.find().fetch();

            return {
                ...this.props,
                commits: handle.ready() ? commits : false
            }
        } else {
            return {
                ...this.props
            }
        }
    },
    getInitialState() {
        return {
            showHeatmap: this.data && this.data.commits ? true : false
        }
    },
    componentDidMount() {
        this.initClipboard();

        this.cal = new CalHeatMap();
    },
    componentDidUpdate() {
        this.initClipboard();
        this.updateHeatmap();
    },
    initClipboard() {
        var client = new ZeroClipboard($('.clone-link'));

        client.on('copy', function(evt) {
            $(evt.target)
                .addClass('animated flash');

            if($(evt.target).parent().find('.copy-info').length <= 0) {
                $(evt.target).after('<span class="copy-info animated fadeIn">Copied to clipboard</span>')
            }

            $(evt.target).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(evt) {
                    $(this).removeClass('animated flash');
                    $(this)
                        .parent()
                        .find('.copy-info').removeClass('animated fadeIn')
                        .addClass('animated fadeOut')
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(evt) {
                            $(this).remove();
                        })
                });
        });
    },
    updateHeatmap() {
        if(this.state.showHeatmap && this.data.commits) {
            if(this.data.commits.length > 0) {
                var data = {};

                this.data.commits.map((commit, i) => {
                    data[moment(commit.date).unix()] = 1
                });

                this.cal.init({
                    itemSelector: React.findDOMNode(this.refs.heatmap),
                    domain: 'month',
                    start: moment(this.data.commits[this.data.commits.length-1].date).subtract(7, 'days').toDate(),
                    maxDate: moment(this.data.commits[0].date).add(7, 'days').toDate(),
                    displayLegend: false,
                    data
                });
            }
        }
    },
    onClickShowHeatmap() {
        if(!this.state.showHeatmap) {
            this.setState({
                showHeatmap: true
            });
        }
    },
    render() {
        return (
            <div>
                <p>{this.data.description}</p>

                <hr />

                <table>
                {this.data.links.clone.map(this.renderCloneLink)}
                </table>

                <hr />

                {this.renderHeatmap()}

                {this.state.showHeatmap && !this.data.commits ? <LoadingIndicator relativePosition={true} message="Aggregating commit history..." subline="this can take some time" /> : ''}
            </div>
        )
    },
    renderCloneLink(clone, i) {
        return (
            <tr key={i+clone.name}>
                <td><b>{clone.name.toUpperCase()}</b></td>
                <td><span className="clone-link" data-clipboard-text={clone.href}>{clone.href}</span></td>
            </tr>
        )
    },
    renderHeatmap() {
        return (
            <div>
                <div ref="heatmap" style={{display: this.state.showHeatmap ? 'block' : 'none'}}></div>
                {this.state.showHeatmap ? '' : <a className="button" onClick={this.onClickShowHeatmap}>Load Heatmap</a>}
            </div>
        )
    }
})
