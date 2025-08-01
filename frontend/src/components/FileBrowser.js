
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileBrowser = ({ currentPath = '', setCurrentPath, onRefresh, isPopup = false }) => {
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [internalPath, setInternalPath] = useState(currentPath);

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'https://drive-1-n7u7.onrender.com/api/files',
    headers: { Authorization: `Bearer ${token}` },
  });

  const currentActivePath = currentPath || internalPath;

  const fetchFiles = async () => {
    setLoadingFiles(true);
    try {
      const res = await axiosInstance.get('/list', {
        params: { path: currentActivePath },
      });
      setFiles(res.data.items || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      alert(error.response?.status === 401 ? 'Unauthorized. Please login again.' : 'Failed to load files.');
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentActivePath]);

  const enterFolder = (folder) => {
    const newPath = currentActivePath + folder + '/';
    setCurrentPath ? setCurrentPath(newPath) : setInternalPath(newPath);
  };

  const goBack = () => {
    const parts = currentActivePath.split('/').filter(Boolean);
    parts.pop();
    const newPath = parts.length ? parts.join('/') + '/' : '';
    setCurrentPath ? setCurrentPath(newPath) : setInternalPath(newPath);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    // <div className={`w-full max-w-full space-y-4 ${isPopup ? '' : 'p-0'} overflow-x-auto`}>
    // <div className={`w-full max-w-md space-y-4 ${isPopup ? '' : 'p-0'} overflow-x-auto`}>
<div className={`w-full max-w-[1350px] mx-auto space-y-4 ${isPopup ? '' : 'p-0'} overflow-x-auto mt-8`}>

      {/* Navigation */}
      <div className={`rounded-lg ${isPopup ? '' : 'shadow-sm border border-gray-200'} p-4 bg-white w-full`}>
        <div className="flex items-center space-x-4">
          <button 
            onClick={goBack} 
            disabled={!currentActivePath} 
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2 text-sm text-gray-600 overflow-hidden">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs break-all max-w-[300px] truncate">
              {currentActivePath || '/'}
            </span>
          </div>
        </div>
      </div>

      {/* File & Folder List */}
      <div className={`rounded-lg ${isPopup ? '' : 'shadow-sm border border-gray-200'} bg-white w-full`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Contents</h3>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          {loadingFiles ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-3">
                <svg className="animate-spin w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                </svg>
                <span className="text-gray-600">Loading files...</span>
              </div>
            </div>
          ) : files.length > 0 ? (
            <div className="space-y-2">
              {files.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                      {item.isFolder ? (
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.6a1 1 0 01.7.3l5.4 5.4a1 1 0 01.3.7V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      {item.isFolder ? (
                        <button
                          onClick={() => enterFolder(item.name)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-left truncate"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <div>
                          <p className="font-medium text-gray-800 text-sm truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {!item.isFolder && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Open</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.4a1 1 0 00-.3-.7L13.3 3.3A1 1 0 0012.6 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500">No items found</p>
              <p className="text-gray-400 text-sm mt-1">This folder is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileBrowser;
