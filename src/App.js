import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import Spinner from "../src/components/Loader/Loader";
import imagesAPI from "../src/services/images-api";
import Searchbar from "../src/components/Searchbar/Searchbar";
import ImageGalery from "./components/ImageGallery/ImageGallery";
import Button from "../src/components/Button/Button";
import Modal from "./components/Modal/Modal";

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    imagesAPI(searchQuery, page)
      .then(({ hits }) => {
        setImages([...hits]);
        setStatus("resolved");
      })
      .catch((error) => setError(error));
  }, [searchQuery, page]);

  const handleSearchForm = (imageName) => {
    setSearchQuery(imageName);
  };

  // const fetchImages=(searchQuery, page)=> {
  //   imagesAPI(searchQuery, page)
  //     .then(({ hits }) => {
  //       if (hits.length === 0) {
  //         toast.error("Oops.. no images found", {
  //           duration: 4000,
  //           position: "top-right",
  //         });
  //       } else {
  //         setImages([...images, ...hits])
  //         setStatus('resolved');

  //         window.scrollTo({
  //           top: document.documentElement.scrollHeight,
  //           behavior: "smooth",
  //         });
  //       }
  //     })
  //     .catch((error) => setError(error));
  // }

  const onBtnSearch = () => {
    setPage(page + 1);
  };

  const toggleModal = (data) => {
    setSelectedImg(data);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchForm}></Searchbar>
      {status === "pending" && <Spinner />}
      {status === "resolved" && (
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
// class App extends Component {
//   state = {
//     images: [],
//     searchQuery: "",
//     page: 1,
//     loading: false,
//     selectedImg: null,
//     error: null,
//     status: "idle",
//   };

//   //важно указывать оба параметра (prevProps, prevState)!!
//   componentDidUpdate(prevProps, prevState) {
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== searchQuery) {
//       this.setState({ status: "pending", page: 1, images: [] });
//       this.fetchImages(searchQuery, page);
//     }

//     if (prevState.page !== page) {
//       this.fetchImages(searchQuery, page);
//     }
//   }

//   handleSearchForm = (imageName) => {
//     this.setState({ searchQuery: imageName });
//   };

//   fetchImages(searchQuery, page) {
//     imagesAPI(searchQuery, page)
//       .then(({ hits }) => {
//         if (hits.length === 0) {
//           toast.error("Oops.. no images found", {
//             duration: 4000,
//             position: "top-right",
//           });
//         } else {
//           this.setState(({ images }) => ({
//             images: [...images, ...hits],
//             status: "resolved",
//           }));
//           window.scrollTo({
//             top: document.documentElement.scrollHeight,
//             behavior: "smooth",
//           });
//         }
//       })
//       .catch((error) => this.setState({ error }));
//   }

//   onBtnSearch = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   toggleModal = (data) => {
//     this.setState({ selectedImg: data });
//   };

//   render() {
//     const { selectedImg, images, status } = this.state;

//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearchForm}></Searchbar>
//         {status === "pending" && <Spinner />}
//         {status === "resolved" && (
//           <>
//             <ImageGalery handleOpenModal={this.toggleModal} images={images} />
//             <Button onClick={this.onBtnSearch} />
//             {selectedImg && (
//               <Modal
//                 selectedImg={selectedImg}
//                 onCloseModal={this.toggleModal}
//               />
//             )}
//           </>
//         )}
//         <Toaster />
//       </div>
//     );
//   }
// }

export default App;
