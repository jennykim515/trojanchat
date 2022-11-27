import Button from './buttons/buttons'
import { TextField, Grid } from '@mui/material'

export default function AddComment(){

    /*const { commentValue, handleCommentValue, 
        enterCommentLine, submitCommentLine} = this.props;*/

    return(
        <form>
            <div className="comment-form-container">
            <style>{`.comment-form-container{ margin-left:auto; margin-right:auto; justify-content: center; align-items: center;`}</style>
            <Grid container justifyContent="center"   alignItems="center">
                <TextField fullWidth id="filled-multiline-flexible" placeholder="Type Comment" multiline rows={3}/>
                    <Grid item xs={3}><Button type='RED' text='Post' onClick={handleComment()}/></Grid>
            </Grid>
            </div>
        </form>
    )
}