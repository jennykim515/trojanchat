import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
// props: title, username, date, num comments
const Thread = (props) => {
    console.log(props);
    const threadinfo = props.threadInfo
    return (
        <Card variant="outlined">
            <h2>{threadinfo.title}</h2>
            <p>by {threadinfo.username}</p>
            <Button 
                variant="outlined"
                onClick={() => {
                    console.log("Clicked");
                }}
            >View More</Button>
        </Card>
    )
}

export default Thread;