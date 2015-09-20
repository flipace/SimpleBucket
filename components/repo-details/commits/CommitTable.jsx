CommitTable = React.createClass({
    getInitialState() {
        return {
            dateType: 'standard'
        }
    },
    shouldComponentUpdate(nextProps) {
        if(nextProps.commits.length == this.props.commits.length) {
            return false;
        }

        return true;
    },
    componentDidMount() {
        this.initCopy();
    },
    componentDidUpdate() {
        this.initCopy();
    },
    initCopy() {
        var client = new ZeroClipboard($('.copy-hash'));
    },
    render() {
        var autolinker = new Autolinker({

        });

        return (
            <table className="commit-table" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Author</th>
                        <th>Message</th>
                        <th>Hash to Clipboard</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.commits.map((commit, i) => {
                    return this.renderSingleCommit(commit, i, autolinker);
                })}
                </tbody>
            </table>
        )
    },
    renderSingleCommit(commit, i, autolinker) {
        return (
            <tr key={i}>
                <td className="date-col">{moment(commit.date).calendar()}</td>
                <td className="author-col" dangerouslySetInnerHTML={{__html: autolinker.link(commit.author.raw.replace(/[\<\>]/g, ''))}}></td>
                <td className="message-col">{commit.message}</td>
                <td className="hash-col"><a className="button small copy-hash" data-clipboard-text={commit.hash}><i className="fa fa-copy"></i> Hash</a></td>
            </tr>
        );
    },
})
