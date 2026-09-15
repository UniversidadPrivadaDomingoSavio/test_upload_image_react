import { useState } from "react";
import DragImage from "./components/DragImage";
import ImageGallery from "./components/ImageGallery";

function App() {
  const [refreshImages, setRefreshImages] = useState(false);

  const handleImageUploaded = () => {
    setRefreshImages((prev) => !prev);
  };

  return (
    <>
      <div className="uppercase font-black bg-blue-600 p-4 m-4 rounded-lg">
        <h1 className="max-w-4xl mx-auto text-center text-4xl text-white">
          Proyecto Imagenes Ventura
        </h1>
      </div>

      <DragImage onImageUploaded={handleImageUploaded} />

      <ImageGallery refreshImages={refreshImages} />
    </>
  );
}

export default App;
