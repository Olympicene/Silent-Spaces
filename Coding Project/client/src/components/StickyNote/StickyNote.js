export default function StickyNote() {
    require('./StickyNote.css');
      
    return (
        <div className="stickynote-container">
            <div className="stickynote-header">
                <div>notes</div>
            </div>
            <textarea className='stickynote-textarea'></textarea>
        </div>
    );
}