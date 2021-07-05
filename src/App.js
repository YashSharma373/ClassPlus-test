import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "./Modal";

let page = 1; //new page for infinite searching
export default function App() {
  const [photoList, setPhotoList] = useState([]);
  const [modalDisplay, setModalDisplay] = useState("none");
  const [modalImg, setModalImg] = useState(
    "https://live.staticflickr.com/65535/51290030732_8f7b770c43_m.jpg "
  );

  const [searchedPhotoList, setSearchedPhotoList] = useState([]);

  // For Default Images
  useEffect(() => {
    async function getPhotos() {
      const resp = await fetch(
        "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=73f99ebac1941f49f6ebedba34cd563e&format=json&nojsoncallback=1&per_page=100"
      );
      const data = await resp.json();
      setPhotoList(data.photos.photo);
    }
    getPhotos();
  }, []);

  // Function to fetch more images for Infinite Scroll.
  async function getMorePhotos() {
    const resp = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=73f99ebac1941f49f6ebedba34cd563e&format=json&nojsoncallback=1&per_page=10&page=${page}`
    );
    const data = await resp.json();
    const newphotos = data.photos.photo;

    setPhotoList((prevPhotos) => [...prevPhotos, ...newphotos]);
    page++;
  }

  // Different API for fetching a particular search Image
  async function getSearchPhotos(text) {
    // setSearchMode(true);
    const resp = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=73f99ebac1941f49f6ebedba34cd563e&format=json&nojsoncallback=1&per_page=1000&text=${
        text === "" ? (text = "Happy") : text
      }`
    );

    const data = await resp.json();

    setSearchedPhotoList(data.photos.photo);
  }

  // Functions to Handle Modal
  function openModal(e) {
    setModalImg(e.target.getAttribute("src"));
    setModalDisplay("block");
  }

  function closeModal() {
    setModalDisplay("none");
  }

  return (
    <>
      <Modal
        modalDisplay={modalDisplay}
        closeModal={closeModal}
        modalImg={modalImg}
      />

      <Navbar getSearchPhotos={getSearchPhotos} />

      <div>
        {searchedPhotoList.length === 0 ? (
          photoList.length === 0 ? (
            // Loading State when fetching data
            <h1>Loading...</h1>
          ) : (
            // Infinte Scrolling for Images fetched
            <InfiniteScroll
              dataLength={photoList.length}
              next={getMorePhotos}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div className="image-showcase">
                {photoList.map((photo) => (
                  <div className="image-card">
                    <img
                      src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                      alt="random_pic"
                      onClick={openModal}
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          )
        ) : (
          // Different Images when Searching an image
          <div className="image-showcase">
            {searchedPhotoList.map((photo) => (
              <div className="image-card">
                <img
                  src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                  alt="random_pic"
                  onClick={openModal}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
