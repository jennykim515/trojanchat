import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
// props: title, username, date, num comments
const School = (props) => {
    console.log(props);
    const threadinfo = props.schoolInfo
    return (
        <Card variant="outlined">
            <h2>{threadinfo.school}</h2>
            <p>Threads: {threadinfo.numThreads}</p>
            <Button 
                variant="outlined"
                onClick={() => {
                    console.log("Clicked");
                }}
            >View More</Button>
        </Card>
    )
}

export default School;