import React from 'react';
import { useApp } from '../App';
import Button from './buttons/buttons';

export default function AddThreadButton() {
    const { loggedIn } = useApp();

    if (!loggedIn) {
        return (
            <div className="comment-form-container margin-top">
                <p>
                    <a href="/login">Log in</a> to add a Thread!
                </p>
            </div>
        );
    }

    return (
        <div className="loading">
            <Button onClick={() => (window.location = '/addthread')} type="RED">
                Create Thread
            </Button>
        </div>
    );
}
