import { useState } from 'react'


export function ReviewHelpful() {
    return <div className="review-helpful">
        <span>Helpful?</span>
        <span className="answer" name='yes'><img className="icon-answer" src='/images/like-icon.png' /> Yes</span>
        <span className="answer" name='no'><img className="icon-answer" src='/images/dislike-icon.png' /> No</span>
    </div>
}