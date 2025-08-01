
import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileUploadSidebar = ({ currentPath, onUploadSuccess }) => {
  const [folderFiles, setFolderFiles] = useState(null);
  const [singleFiles, setSingleFiles] = useState(null);
  const [folderName, setFolderName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);

  const folderInputRef = useRef();
  const fileInputRef = useRef();

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'https://drive-1-n7u7.onrender.com/api/files',
    headers: { Authorization: `Bearer ${token}` },
  });

  const handleFolderChange = (e) => setFolderFiles(e.target.files);
  const handleSingleFilesChange = (e) => setSingleFiles(e.target.files);

  const uploadFiles = async (type) => {
    const isFolder = type === 'folder';
    const fileList = isFolder ? folderFiles : singleFiles;
    if (!fileList || fileList.length === 0) return alert(`Please select ${isFolder ? 'a folder' : 'files'}`);

    const formData = new FormData();
    for (let file of fileList) formData.append('files', file);
    formData.append('folderPath', currentPath);

    setUploading(true);
    try {
      await axiosInstance.post('/upload-to-folder', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Upload successful');
      if (typeof onUploadSuccess === 'function') onUploadSuccess();

      if (isFolder) {
        setFolderFiles(null);
        folderInputRef.current.value = null;
      } else {
        setSingleFiles(null);
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error(error);
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return alert('Folder name required');
    setCreatingFolder(true);
    try {
      await axiosInstance.post('/create-folder', {
        folderName,
        parentPath: currentPath,
      });
      alert('Folder created!');
      setFolderName('');
      if (typeof onUploadSuccess === 'function') onUploadSuccess();
    } catch (err) {
      console.error(err);
      alert('Folder creation failed.');
    } finally {
      setCreatingFolder(false);
    }
  };

  return (
    <div className="w-60 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
      {/* Create Folder */}
      <div className="px-2">
        <input
          type="text"
          placeholder="New folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full mb-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <button
          onClick={handleCreateFolder}
          disabled={creatingFolder}
          className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
        >
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {creatingFolder ? 'Creating folder...' : 'Create new folder'}
        </button>
      </div>

      {/* Upload Folder */}
      <div className="mt-1">
        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload folder
          <input
            ref={folderInputRef}
            type="file"
            webkitdirectory="true"
            directory="true"
            multiple
            onChange={handleFolderChange}
            className="hidden"
          />
        </label>
        <button
          onClick={() => uploadFiles('folder')}
          disabled={uploading}
          className="w-full px-4 py-2 text-xs text-blue-700 text-left hover:bg-gray-100"
        >
          {uploading ? 'Uploading folder…' : 'Confirm upload'}
        </button>
      </div>

      {/* Upload Files */}
      <div>
        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload files
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleSingleFilesChange}
            className="hidden"
          />
        </label>
        <button
          onClick={() => uploadFiles('file')}
          disabled={uploading}
          className="w-full px-4 py-2 text-xs text-green-700 text-left hover:bg-gray-100"
        >
          {uploading ? 'Uploading files…' : 'Confirm upload'}
        </button>
      </div>
    </div>
  );
};

export default FileUploadSidebar;
