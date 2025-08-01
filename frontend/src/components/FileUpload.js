// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const FileUpload = ({ currentPath, onUploadSuccess }) => {
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [folderName, setFolderName] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [creatingFolder, setCreatingFolder] = useState(false);

//   const folderInputRef = useRef();
//   const fileInputRef = useRef();

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const handleFolderChange = (e) => {
//     setFolderFiles(e.target.files);
//   };

//   const handleSingleFilesChange = (e) => {
//     setSingleFiles(e.target.files);
//   };

//   const uploadFiles = async (type) => {
//     const isFolder = type === 'folder';
//     const fileList = isFolder ? folderFiles : singleFiles;

//     if (!fileList || fileList.length === 0) {
//       alert(`Please select ${isFolder ? 'a folder' : 'files'} to upload.`);
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < fileList.length; i++) {
//       formData.append('files', fileList[i]);
//     }
//     formData.append('folderPath', currentPath);

//     setUploading(true);
//     try {
//       await axiosInstance.post('/upload-to-folder', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Upload successful');
//       onUploadSuccess();
//       if (isFolder) {
//         setFolderFiles(null);
//         folderInputRef.current.value = null;
//       } else {
//         setSingleFiles(null);
//         fileInputRef.current.value = null;
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       alert('Upload failed.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleCreateFolder = async () => {
//     if (!folderName.trim()) {
//       alert('Folder name cannot be empty');
//       return;
//     }

//     setCreatingFolder(true);
//     try {
//       await axiosInstance.post('/create-folder', {
//         folderName,
//         parentPath: currentPath,
//       });
//       alert('Folder created successfully!');
//       setFolderName('');
//       onUploadSuccess();
//     } catch (error) {
//       console.error('Create folder error:', error);
//       alert('Failed to create folder');
//     } finally {
//       setCreatingFolder(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//       {/* Create Folder */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
//             <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800">Create New Folder</h3>
//         </div>
//         <div className="space-y-3">
//           <input
//             type="text"
//             placeholder="Enter folder name (e.g. docs)"
//             value={folderName}
//             onChange={(e) => setFolderName(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
//           />
//           <button
//             onClick={handleCreateFolder}
//             disabled={creatingFolder}
//             className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//           >
//             {creatingFolder ? (
//               <>
//                 <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span>Creating...</span>
//               </>
//             ) : (
//               <>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 <span>Create Folder</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Upload Folder */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//             <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800">Upload Folder</h3>
//         </div>
//         <div className="space-y-3">
//           <div className="relative">
//             <input
//               ref={folderInputRef}
//               type="file"
//               webkitdirectory="true"
//               directory="true"
//               multiple
//               onChange={handleFolderChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//           </div>
//           <button
//             onClick={() => uploadFiles('folder')}
//             disabled={uploading}
//             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//           >
//             {uploading ? (
//               <>
//                 <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span>Uploading...</span>
//               </>
//             ) : (
//               <>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//                 <span>Upload Folder</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Upload Files */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//             <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800">Upload Files</h3>
//         </div>
//         <div className="space-y-3">
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             onChange={handleSingleFilesChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
//           />
//           <button
//             onClick={() => uploadFiles('file')}
//             disabled={uploading}
//             className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//           >
//             {uploading ? (
//               <>
//                 <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span>Uploading...</span>
//               </>
//             ) : (
//               <>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//                 <span>Upload Files</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;

// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const FileUploadSidebar = ({ currentPath, onUploadSuccess }) => {
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [folderName, setFolderName] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [creatingFolder, setCreatingFolder] = useState(false);

//   const folderInputRef = useRef();
//   const fileInputRef = useRef();

//   const token = localStorage.getItem('token');
//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const handleFolderChange = (e) => setFolderFiles(e.target.files);
//   const handleSingleFilesChange = (e) => setSingleFiles(e.target.files);

//   const uploadFiles = async (type) => {
//     const isFolder = type === 'folder';
//     const fileList = isFolder ? folderFiles : singleFiles;
//     if (!fileList || fileList.length === 0) return alert(`Please select ${isFolder ? 'a folder' : 'files'}`);

//     const formData = new FormData();
//     for (let file of fileList) formData.append('files', file);
//     formData.append('folderPath', currentPath);

//     setUploading(true);
//     try {
//       await axiosInstance.post('/upload-to-folder', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert('Upload successful');
//       onUploadSuccess();
//       if (isFolder) {
//         setFolderFiles(null);
//         folderInputRef.current.value = null;
//       } else {
//         setSingleFiles(null);
//         fileInputRef.current.value = null;
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Upload failed.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleCreateFolder = async () => {
//     if (!folderName.trim()) return alert('Folder name required');
//     setCreatingFolder(true);
//     try {
//       await axiosInstance.post('/create-folder', {
//         folderName,
//         parentPath: currentPath,
//       });
//       alert('Folder created!');
//       setFolderName('');
//       onUploadSuccess();
//     } catch (err) {
//       console.error(err);
//       alert('Folder creation failed.');
//     } finally {
//       setCreatingFolder(false);
//     }
//   };

//   return (
//     <div className="w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-4 space-y-4">
//       {/* Create Folder */}
//       <div>
//         <button
//           onClick={handleCreateFolder}
//           disabled={creatingFolder}
//           className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
//         >
//           <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           {creatingFolder ? 'Creating Folder...' : 'Create New Folder'}
//         </button>
//         <input
//           type="text"
//           placeholder="Folder name"
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//           className="mt-2 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       </div>

//       {/* Upload Folder */}
//       <div>
//         <label className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition cursor-pointer">
//           <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3-3m0 0l-3 3m3-3v12" />
//           </svg>
//           Upload Folder
//           <input
//             ref={folderInputRef}
//             type="file"
//             webkitdirectory="true"
//             directory="true"
//             multiple
//             onChange={handleFolderChange}
//             className="hidden"
//           />
//         </label>
//         <button
//           onClick={() => uploadFiles('folder')}
//           disabled={uploading}
//           className="w-full mt-2 text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md transition"
//         >
//           {uploading ? 'Uploading Folder...' : 'Upload Folder'}
//         </button>
//       </div>

//       {/* Upload Files */}
//       <div>
//         <label className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition cursor-pointer">
//           <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3-3m0 0l-3 3m3-3v12" />
//           </svg>
//           Upload Files
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             onChange={handleSingleFilesChange}
//             className="hidden"
//           />
//         </label>
//         <button
//           onClick={() => uploadFiles('file')}
//           disabled={uploading}
//           className="w-full mt-2 text-xs text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md transition"
//         >
//           {uploading ? 'Uploading Files...' : 'Upload Files'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FileUploadSidebar;
// FileUploadSidebar.js
// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const FileUploadSidebar = ({ currentPath, onUploadSuccess }) => {
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [folderName, setFolderName] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [creatingFolder, setCreatingFolder] = useState(false);

//   const folderInputRef = useRef();
//   const fileInputRef = useRef();

//   const token = localStorage.getItem('token');
//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const handleFolderChange = (e) => setFolderFiles(e.target.files);
//   const handleSingleFilesChange = (e) => setSingleFiles(e.target.files);

//   const uploadFiles = async (type) => {
//     const isFolder = type === 'folder';
//     const fileList = isFolder ? folderFiles : singleFiles;
//     if (!fileList || fileList.length === 0) return alert(`Please select ${isFolder ? 'a folder' : 'files'}`);

//     const formData = new FormData();
//     for (let file of fileList) formData.append('files', file);
//     formData.append('folderPath', currentPath);

//     setUploading(true);
//     try {
//       await axiosInstance.post('/upload-to-folder', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert('Upload successful');
//       if (typeof onUploadSuccess === 'function') {
//         onUploadSuccess();
//       }
//       if (isFolder) {
//         setFolderFiles(null);
//         folderInputRef.current.value = null;
//       } else {
//         setSingleFiles(null);
//         fileInputRef.current.value = null;
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Upload failed.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleCreateFolder = async () => {
//     if (!folderName.trim()) return alert('Folder name required');
//     setCreatingFolder(true);
//     try {
//       await axiosInstance.post('/create-folder', {
//         folderName,
//         parentPath: currentPath,
//       });
//       alert('Folder created!');
//       setFolderName('');
//       if (typeof onUploadSuccess === 'function') {
//         onUploadSuccess();
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Folder creation failed.');
//     } finally {
//       setCreatingFolder(false);
//     }
//   };

//   return (
//     <div className="w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-4 space-y-4">
//       {/* Create Folder */}
//       <div>
//         <button
//           onClick={handleCreateFolder}
//           disabled={creatingFolder}
//           className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition"
//         >
//           <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           {creatingFolder ? 'Creating Folder...' : 'Create New Folder'}
//         </button>
//         <input
//           type="text"
//           placeholder="Folder name"
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//           className="mt-2 w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       </div>

//       {/* Upload Folder */}
//       <div>
//         <label className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition cursor-pointer">
//           <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3-3m0 0l-3 3m3-3v12" />
//           </svg>
//           Upload Folder
//           <input
//             ref={folderInputRef}
//             type="file"
//             webkitdirectory="true"
//             directory="true"
//             multiple
//             onChange={handleFolderChange}
//             className="hidden"
//           />
//         </label>
//         <button
//           onClick={() => uploadFiles('folder')}
//           disabled={uploading}
//           className="w-full mt-2 text-xs text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md transition"
//         >
//           {uploading ? 'Uploading Folder...' : 'Upload Folder'}
//         </button>
//       </div>

//       {/* Upload Files */}
//       <div>
//         <label className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition cursor-pointer">
//           <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3-3m0 0l-3 3m3-3v12" />
//           </svg>
//           Upload Files
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             onChange={handleSingleFilesChange}
//             className="hidden"
//           />
//         </label>
//         <button
//           onClick={() => uploadFiles('file')}
//           disabled={uploading}
//           className="w-full mt-2 text-xs text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md transition"
//         >
//           {uploading ? 'Uploading Files...' : 'Upload Files'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FileUploadSidebar;
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
    baseURL: 'http://localhost:3000/api/files',
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
