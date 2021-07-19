import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import Spinner from "../src/components/Loader/Loader";
import imagesAPI from "../src/services/images-api";
import Searchbar from "../src/components/Searchbar/Searchbar";
import ImageGalery from "./components/ImageGallery/ImageGallery";
import Button from "../src/components/Button/Button";
import Modal from "./components/Modal/Modal";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setStatus(Status.PENDING);
    imagesAPI(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          toast.error("Oops.. no images found", {
            duration: 4000,
            position: "top-right",
          });
        }
        setImages((prev) => [...prev, ...hits]);
        setStatus(Status.RESOLVED);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => new Error(error));
  }, [searchQuery, page]);

  const handleSearchForm = (imageName) => {
    setSearchQuery(imageName);
    setPage(1);
    setImages([]);
  };

  const onBtnSearch = () => setPage((page) => page + 1);

  const toggleModal = (data) => setSelectedImg(data);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchForm}></Searchbar>
      {status === Status.PENDING && <Spinner />}

      {status === Status.RESOLVED && (
        <>
          <ImageGalery handleOpenModal={toggleModal} images={images} />
          <Button onClick={onBtnSearch} />
          {selectedImg && (
            <Modal selectedImg={selectedImg} onCloseModal={toggleModal} />
          )}
        </>
      )}

      <Toaster />
    </div>
  );
}

export default App;
