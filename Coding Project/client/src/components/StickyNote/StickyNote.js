import styles from "./StickyNote.module.css"

export default function StickyNote() {
      
    return (
        <div className={styles['stickynote-container']}>
            <div className={styles['stickynote-header']}>
                <div>notes</div>
            </div>
            <textarea className={styles['stickynote-textarea']}></textarea>
        </div>
    );
}