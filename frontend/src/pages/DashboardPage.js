
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import FileBrowser from '../components/FileBrowser';
import axios from 'axios';

const DashboardPage = () => {
  const [showNewPopup, setShowNewPopup] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For search results

  useEffect(() => {
    fetchFilesAndFolders();
  }, []);

  const fetchFilesAndFolders = async () => {
    try {
      const res = await axios.get('/api/files-and-folders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAllFiles(res.data.files);
      setAllFolders(res.data.folders);
      setFilteredData([...res.data.files, ...res.data.folders]); // default full list
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleSearchResults = (searchQuery) => {
    const results = [...allFiles, ...allFolders].filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(results);
  };

  const handleNewClick = () => {
    setShowNewPopup(true);
  };

  const handleCloseNewPopup = () => {
    setShowNewPopup(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <Sidebar onNewClick={handleNewClick} />

      <div className="flex flex-col flex-1 h-full">
        <Header allItems={[...allFiles, ...allFolders]} onSearchResults={handleSearchResults} />

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4">
          <div className="w-full h-full">
            <FileBrowser filesAndFolders={filteredData} />
          </div>
        </main>
      </div>

      {/* Upload popup */}
      {showNewPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl h-[90vh] overflow-y-auto relative">
            <button onClick={handleCloseNewPopup} className="absolute top-4 right-4 text-gray-600 hover:text-red-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Upload New Files/Folders</h2>
            <div className="w-full">
              <FileBrowser isPopup={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
