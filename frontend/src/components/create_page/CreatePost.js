
import React, {useState} from 'react';

const CreatePost = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [uploadedURL, setUploadedURL] = useState('');

  // STEP 1: When the user selects a file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // STEP 2: Upload the file to S3 via presigned URL
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      // Step 2.1: Ask Django backend for a presigned URL
      const params = new URLSearchParams({
        filename: file.name,
        filetype: file.type,
      });

      const response = await fetch(`http://127.0.0.1:8000/api/presigned-url/?${params}`);
      if (!response.ok) {
        throw new Error('Failed to get presigned URL');
      }

      const { uploadURL, key } = await response.json();

      // Step 2.2: Upload the file to S3 directly
      const uploadResponse = await fetch(uploadURL, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();   // << important!
        console.error("S3 error:", errorText);
      }

    } catch (error) {
      console.error('Error:', error.message);
    }
  };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4">
            <header className="w-full max-w-2xl mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
                    Create a New Post
                </h1>
                <p className="text-lg text-gray-600 text-center">
                    Share your thoughts with the community by creating a new post below.
                </p>
            </header>
            <form className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md flex flex-col gap-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">
                        Upload Picture
                    </label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        id="image"
                        name="image"
                        accept="image/jpeg"
                        className="block w-full text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="caption">
                        Caption
                    </label>
                    <textarea
                        id="caption"
                        name="caption"
                        rows="3"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Write your caption here..."
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Add a location"
                    />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                        Save as Draft
                    </button>
                    <button
                        type="submit"
                        onClick={handleUpload}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;