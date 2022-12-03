import React from 'react';
import { useApp } from '../App';
import Button from './buttons/buttons';

export default function AddThreadButton({school}) {
    const { loggedIn } = useApp();

    if (!loggedIn) {
        return (
            <div className="comment-form-containerp">
                <p>
                    <a href="/login">Log in</a> to add a Thread!
                </p>
            </div>
        );
    }

    return (
        <Button onClick={() => (window.location = '/addthread/' + school)} type="RED">
            Create Thread
         </Button>
    );
}
