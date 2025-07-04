import React, { useState } from "react";
import { createPost } from "../../api/api";

function MakePost() {
    const [formData, setFormData] = useState({
        userId: "",
        caption: "",
        image_url: "",
        location: "",
    });

    const handleChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await createPost({
        userId: formData.userId,
        caption: formData.caption,
        image_url: formData.image_url
        });
    
        if (result.error) {
        alert(result.error);
        } else {
        console.log("Created Post!");
        }
    };
      

    

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-indigo-700">Create a Post</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700">UserId</label>
                    <input
                        type="text"
                        name="userId"
                        required
                        value={formData.userId}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Caption</label>
                    <input
                        type="text"
                        name="caption"
                        required
                        value={formData.caption}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image_url</label>
                    <input
                        type="text"
                        name="image_url"
                        required
                        value={formData.image_url}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700"
                >
                    Create Post!
                </button>
            </form>
        </main>
    );
}
export default MakePost;