import React, {useState, useEffect} from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
const ColumnsPhotoAlbum = ({photos, openLightbox}) => {
  import("react-photo-album/columns.css");

  return (
    <PhotoAlbum
      layout="columns"
      photos={photos}
      onClick={({index}) => openLightbox(index)}
    />
  );
};

function ImagesAlbum({images}) {
  const [index, setIndex] = useState(-1);
  const [isMdOrLarger, setIsMdOrLarger] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMdOrLarger(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const photos = images.map(img => ({
    src: img.src,
    width: 300,
    height: 300,
  }));

  return (
    <>
      <div>
        {isClient &&
          (isMdOrLarger ? (
            <ColumnsPhotoAlbum photos={photos} openLightbox={setIndex} />
          ) : (
            <PhotoAlbum
              layout="rows"
              photos={photos}
              onClick={({index}) => setIndex(index)}
            />
          ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos.map(photo => ({src: photo.src}))}
      />
    </>
  );
}

export default ImagesAlbum;
