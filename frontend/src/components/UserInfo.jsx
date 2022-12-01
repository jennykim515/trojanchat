import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
// props: title, username, date, num comments
const UserInfo = (props) => {
    console.log(props);
    const UserInfo = props.UserInfo
    return (
        <Card variant="outlined">
            <h2>{UserInfo.username}</h2>
            <p>by {UserInfo.major}</p>
            <Button 
                variant="outlined"
            >View More</Button>
        </Card>
    )
}

export default UserInfo;