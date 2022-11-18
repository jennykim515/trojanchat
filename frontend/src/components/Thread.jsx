import Card from '@mui/material/Card'

// props: title, username, date, num comments
const Thread = (props) => {
    console.log(props);
    const threadinfo = props.threadInfo
    return (
        <Card variant="outlined">
            <h2>{threadinfo.title}</h2>
            <p>by {threadinfo.username}</p>
        </Card>
    )
}

export default Thread;