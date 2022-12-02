import React from 'react'
import { useApp } from '../App';

export default function Upvote({post, votes, sendVoteCallback}) {
    const { apiPost } = useApp();
  const {upvotes, postId} = post;
  const vote = votes[postId] || 0;

  const sendVote = async (postId, numVotes) => {
    const dir = (Math.sign(numVotes)===1)?"up":"down";
    for (let i=0;i<Math.abs(numVotes);i++) {
        apiPost(`/post/vote?postId=${postId}&vote=${dir}`,{});
    }

    sendVoteCallback(postId, numVotes);
  }

  const upvote = (e) => {
    e.stopPropagation();
    if (vote==1) sendVote(postId,-1);
    else if (vote==0) sendVote(postId,1);
    else sendVote(postId,2);
  }
  const downvote = (e) => {
    e.stopPropagation();
    if (vote==1) sendVote(postId,-2);
    else if (vote==0) sendVote(postId,-1);
    else sendVote(postId,1);
  }

  return (
    <div className='upvoteContainer'>
        <div className={`upvote ${vote===1&&"green"}`} disabled={vote===1}  onClick={upvote}/>
        <p>{upvotes+vote}</p>
        <div className={`downvote ${vote===-1&&"red"}`} disabled={vote===-1} onClick={downvote}/>
    </div>
  )
}
