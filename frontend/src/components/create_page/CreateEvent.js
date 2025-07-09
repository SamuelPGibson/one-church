import React from 'react';

const CreateEvent = ({ userId }) => (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Create New Event</h1>
        <p className="text-base text-gray-600 mb-6">
            Fill out the details below to create a new event for your community. Make sure to provide all the necessary information so attendees know what to expect.
        </p>
        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event Title"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Event Description"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                </label>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event Location"
                    required
                />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                    </label>
                    <input
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                    </label>
                    <input
                        type="datetime-local"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    className="bg-red-100 text-red-600 px-5 py-2 rounded font-semibold hover:bg-red-200"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="bg-gray-200 text-gray-700 px-5 py-2 rounded font-semibold hover:bg-gray-300"
                >
                    Save Draft
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700"
                >
                    Post Event
                </button>
            </div>
        </form>
    </div>
);

export default CreateEvent;
