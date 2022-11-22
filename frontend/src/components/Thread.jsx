import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

// props: title, userName, timeCreated, comments
const Thread = (props) => {
    const threadinfo = props.threadInfo

    return (
        <Card variant="outlined">
            <h2>{threadinfo.title}</h2>
            <p>by {threadinfo.userName}</p>
            <p>Time {threadinfo.timeCreated}</p>
            <Button 
                variant="outlined"
                onClick={() => {
                    // console.log("Clicked");
                }}
            >View More</Button>
        </Card>
    )
}

export default Thread;
