import { useEffect, useState } from "react";

type Image = {
  id: number;
  name: string;
  mime_type: string;
  created_at: string;
};

type ImageGalleryProps = {
  refreshImages: boolean;
};

export default function ImageGallery({ refreshImages }: ImageGalleryProps) {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/images`,
        );

        const data = await response.json();

        setImages(data);
      } catch (error) {
        console.error("Error obteniendo imágenes:", error);
      }
    };

    getImages();
  }, [refreshImages]);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6">Galería</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {images.map((image) => (
          <div
            key={image.id}
            className="border rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/api/images/${image.id}`}
              alt={image.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-3">
              <p className="font-semibold">{image.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
