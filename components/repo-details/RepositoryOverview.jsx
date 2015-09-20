RepositoryOverview = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            ...this.props
        }
    },
    componentDidMount() {
        this.initClipboard();
    },
    componentDidUpdate() {
        this.initClipboard();
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
    render() {
        return (
            <div>
                <p>{this.data.description}</p>

                <hr />

                <table>
                {this.data.links.clone.map(this.renderCloneLink)}
                </table>
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
})
