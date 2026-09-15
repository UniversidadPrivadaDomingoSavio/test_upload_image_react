import { useState } from "react";
import { useDropzone } from "react-dropzone";

type DragImageProps = {
  onImageUploaded: () => void;
};

export default function DragImage({ onImageUploaded }: DragImageProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const clearImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },

    maxFiles: 1,

    onDrop: (files) => {
      const file = files[0];

      if (!file) return;

      // Si ya había una imagen, liberar su preview anterior
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
    },
  });

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:4000/api/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error guardando imagen");
      }

      // Actualiza el listado de imágenes
      onImageUploaded();

      // Limpia la imagen de la dropzone
      clearImage();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl bg-white shadow-lg rounded-lg p-10 mt-10 mx-auto">
      <h1 className="text-2xl text-blue-600 font-black text-center">Menu</h1>

      <p className="font-semibold text-black">Arrastre para subir la Imagen:</p>

      <br />

      <div
        {...getRootProps()}
        className="relative border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500 transition"
      >
        <input {...getInputProps()} />

        {!preview && (
          <>
            {isDragActive ? (
              <p>Suelta la imagen aquí...</p>
            ) : (
              <>
                <p className="font-semibold">Arrastra una imagen aquí</p>

                <p className="text-gray-500 text-sm mt-2">
                  o haz clic para seleccionar
                </p>
              </>
            )}
          </>
        )}

        {preview && (
          <div className="relative flex justify-center mt-5">
            {/* Botón para eliminar la imagen */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                clearImage();
              }}
              className="
                absolute
                -top-3
                right-1/2
                translate-x-20
                w-8
                h-8
                bg-red-500
                text-white
                font-bold
                rounded-full
                flex
                items-center
                justify-center
                hover:bg-red-700
                transition
                z-10
              "
            >
              ×
            </button>

            <img
              src={preview}
              alt="Preview"
              className="w-36 h-36 object-cover rounded-xl"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!image}
        className="
          block
          ml-auto
          max-w-56
          text-center
          mt-4
          bg-blue-600
          text-white
          font-bold
          p-2
          rounded-lg
          hover:bg-white
          hover:shadow-lg
          hover:text-black
          transition-all
          duration-300
          disabled:bg-gray-300
          disabled:text-gray-500
          disabled:cursor-not-allowed
          disabled:hover:shadow-none
        "
      >
        Guardar Imagen
      </button>
    </div>
  );
}
