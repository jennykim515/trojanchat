import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

const School = (props) => {
    console.log(props);
    const schoolInfo = props.schoolInfo
    return (
        <Card variant="outlined">
            <h2>{schoolInfo.school}</h2>
            {/* <p>by {schoolInfo.username}</p> */}
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