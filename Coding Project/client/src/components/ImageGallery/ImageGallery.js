import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import styles from "./ImageGallery.module.css"

const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
    },
];

const MyGallery = ({img}) => {

    const formattedImage = img.map((url) => ({
        original: url
    }));


    return (
        <ImageGallery
            className={styles['image-gallery-image']}
            items={formattedImage}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
        />
    )
}

export default MyGallery;
