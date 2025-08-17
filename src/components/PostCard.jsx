import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ $id, title, image }) {
  const [imageState, setImageState] = useState({
    url: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (!image) {
          throw new Error('No image ID provided');
        }
        
        const url = appwriteService.getFileView(image);

        if (!url) {
          throw new Error('URL generation returned null');
        }

        // Verify the URL works
        const img = new Image();
        img.onload = () => {
          setImageState({ url, loading: false, error: null });
        };
        img.onerror = () => {
          throw new Error('Image failed to load');
        };
        img.src = url;

      } catch (error) {
        setImageState({
          url: null,
          loading: false,
          error: error.message
        });
      }
    };

    loadImage();
  }, [image]);

  if (imageState.loading) {
    return (
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="animate-pulse h-48 bg-gray-300 rounded-xl" />
      </div>
    );
  }

  if (imageState.error) {
    return (
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="h-48 bg-red-50 rounded-xl flex items-center justify-center">
          <span className="text-red-500">
            Image Error: {imageState.error}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 truncate mt-2">
          {title}
        </h2>
      </div>
    );
  }

  return (
    <Link to={`/post/${$id}`} className="block hover:scale-[1.02] transition-all">
      <div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-md">
        <div className="w-full flex justify-center mb-4 h-48 overflow-hidden">
          <img 
            src={imageState.url}
            alt={title}
            className="rounded-xl object-cover w-full h-full"
            loading="lazy"
            onError={() => setImageState(prev => ({
              ...prev,
              error: 'Image failed to render'
            }))}
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;