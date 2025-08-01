
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FileBrowser = () => {
//   const [files, setFiles] = useState([]);
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const fetchFiles = async () => {
//     try {
//       const res = await axiosInstance.get('/');
//       setFiles(res.data.files || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const handleFolderChange = (e) => {
//     setFolderFiles(e.target.files);
//   };

//   const handleSingleFilesChange = (e) => {
//     setSingleFiles(e.target.files);
//   };

//   const uploadFiles = async (type) => {
//     let fileList = type === 'folder' ? folderFiles : singleFiles;
//     let endpoint = type === 'folder' ? '/upload-folder' : '/upload';

//     if (!fileList || fileList.length === 0) {
//       alert(`Please select ${type === 'folder' ? 'a folder' : 'files'} to upload.`);
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < fileList.length; i++) {
//       formData.append('files', fileList[i]);
//     }

//     setUploading(true);
//     try {
//       await axiosInstance.post(endpoint, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Upload successful');
//       setFolderFiles(null);
//       setSingleFiles(null);
//       fetchFiles();
//     } catch (error) {
//       console.error('Upload error:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       }
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">📁 Cloud File Manager</h2>

//       {/* Upload Folder */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Folder:</h3>
//         <input
//           type="file"
//           webkitdirectory="true"
//           directory="true"
//           multiple
//           onChange={handleFolderChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('folder')}
//           disabled={uploading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Folder'}
//         </button>
//       </div>

//       {/* Upload Files */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Files:</h3>
//         <input
//           type="file"
//           multiple
//           onChange={handleSingleFilesChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('file')}
//           disabled={uploading}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Files'}
//         </button>
//       </div>

//       {/* Uploaded Files List */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">📄 Uploaded Files:</h3>
//         <ul className="list-disc list-inside">
//           {files.length > 0 ? (
//             files.map((file, index) => <li key={index}>{file}</li>)
//           ) : (
//             <li>No files found</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FileBrowser = () => {
//   const [files, setFiles] = useState([]);
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const fetchFiles = async () => {
//     try {
//       const res = await axiosInstance.get('/');
//       setFiles(res.data.files || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const handleFolderChange = (e) => {
//     setFolderFiles(e.target.files);
//   };

//   const handleSingleFilesChange = (e) => {
//     setSingleFiles(e.target.files);
//   };

//   const uploadFiles = async (type) => {
//     let fileList = type === 'folder' ? folderFiles : singleFiles;
//     let endpoint = type === 'folder' ? '/upload-folder' : '/upload';

//     if (!fileList || fileList.length === 0) {
//       alert(`Please select ${type === 'folder' ? 'a folder' : 'files'} to upload.`);
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < fileList.length; i++) {
//       formData.append('files', fileList[i]);
//     }

//     setUploading(true);
//     try {
//       await axiosInstance.post(endpoint, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Upload successful');
//       setFolderFiles(null);
//       setSingleFiles(null);
//       fetchFiles();
//     } catch (error) {
//       console.error('Upload error:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       }
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">📁 Cloud File Manager</h2>

//       {/* Upload Folder */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Folder:</h3>
//         <input
//           type="file"
//           webkitdirectory="true"
//           directory="true"
//           multiple
//           onChange={handleFolderChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('folder')}
//           disabled={uploading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Folder'}
//         </button>
//       </div>

//       {/* Upload Files */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Files:</h3>
//         <input
//           type="file"
//           multiple
//           onChange={handleSingleFilesChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('file')}
//           disabled={uploading}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Files'}
//         </button>
//       </div>

//       {/* Uploaded Files List */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">📄 Uploaded Files:</h3>
//         <ul className="list-disc list-inside">
//           {files.length > 0 ? (
//             files.map((file, index) => <li key={index}>{file}</li>)
//           ) : (
//             <li>No files found</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;
// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

// const FileBrowser = () => {
//   const [files, setFiles] = useState([]);
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const folderInputRef = useRef();
//   const fileInputRef = useRef();

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const fetchFiles = async () => {
//     try {
//       const res = await axiosInstance.get('/');
//       setFiles(res.data.files || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const handleFolderChange = (e) => {
//     setFolderFiles(e.target.files);
//   };

//   const handleSingleFilesChange = (e) => {
//     setSingleFiles(e.target.files);
//   };

//   const uploadFiles = async (type) => {
//     const isFolder = type === 'folder';
//     const fileList = isFolder ? folderFiles : singleFiles;
//     const endpoint = isFolder ? '/upload-folder' : '/upload';

//     if (!fileList || fileList.length === 0) {
//       alert(`Please select ${isFolder ? 'a folder' : 'files'} to upload.`);
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < fileList.length; i++) {
//       formData.append('files', fileList[i]);
//     }

//     setUploading(true);
//     try {
//       await axiosInstance.post(endpoint, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Upload successful');
//       if (isFolder) {
//         setFolderFiles(null);
//         folderInputRef.current.value = null;
//       } else {
//         setSingleFiles(null);
//         fileInputRef.current.value = null;
//       }
//       fetchFiles();
//     } catch (error) {
//       console.error('Upload error:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       }
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">📁 Cloud File Manager</h2>

//       {/* Upload Folder */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Folder:</h3>
//         <input
//           ref={folderInputRef}
//           type="file"
//           webkitdirectory="true"
//           directory="true"
//           multiple
//           onChange={handleFolderChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('folder')}
//           disabled={uploading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Folder'}
//         </button>
//       </div>

//       {/* Upload Files */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Files:</h3>
//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           onChange={handleSingleFilesChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('file')}
//           disabled={uploading}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Files'}
//         </button>
//       </div>

//       {/* Uploaded Files List */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">📄 Uploaded Files:</h3>
//         <ul className="list-disc list-inside">
//           {files.length > 0 ? (
//             files.map((file, index) => <li key={index}>{file}</li>)
//           ) : (
//             <li>No files found</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const FileBrowser = () => {
//   const [files, setFiles] = useState([]);
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [loadingFiles, setLoadingFiles] = useState(true);

//   const folderInputRef = useRef();
//   const fileInputRef = useRef();

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const fetchFiles = async () => {
//     setLoadingFiles(true);
//     try {
//       const res = await axiosInstance.get('/');
//       setFiles(res.data.files || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       } else {
//         alert('Failed to load files.');
//       }
//     } finally {
//       setLoadingFiles(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const handleFolderChange = (e) => {
//     setFolderFiles(e.target.files);
//   };

//   const handleSingleFilesChange = (e) => {
//     setSingleFiles(e.target.files);
//   };

//   const uploadFiles = async (type) => {
//     const isFolder = type === 'folder';
//     const fileList = isFolder ? folderFiles : singleFiles;
//     const endpoint = isFolder ? '/upload-folder' : '/upload';

//     if (!fileList || fileList.length === 0) {
//       alert(`Please select ${isFolder ? 'a folder' : 'files'} to upload.`);
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < fileList.length; i++) {
//       formData.append('files', fileList[i]);
//     }

//     setUploading(true);
//     try {
//       await axiosInstance.post(endpoint, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Upload successful');
//       fetchFiles(); // Refresh file list
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

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">📁 Cloud File Manager</h2>

//       {/* Upload Folder */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Folder:</h3>
//         <input
//           ref={folderInputRef}
//           type="file"
//           webkitdirectory="true"
//           directory="true"
//           multiple
//           onChange={handleFolderChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('folder')}
//           disabled={uploading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Folder'}
//         </button>
//       </div>

//       {/* Upload Files */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Files:</h3>
//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           onChange={handleSingleFilesChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('file')}
//           disabled={uploading}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Files'}
//         </button>
//       </div>

//       {/* Uploaded Files List */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">📄 Uploaded Files:</h3>
//         {loadingFiles ? (
//           <p>Loading files...</p>
//         ) : files.length > 0 ? (
//           <ul className="space-y-3">
//             {files.map((file) => (
//               <li key={file.id} className="flex items-center justify-between border p-2 rounded-md">
//                 <div>
//                   <p className="font-medium">{file.name}</p>
//                   <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
//                 </div>
//                 <a
//                   href={file.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   Open
//                 </a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No files found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const FileBrowser = () => {
//   const [files, setFiles] = useState([]);
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [folderName, setFolderName] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [loadingFiles, setLoadingFiles] = useState(true);
//   const [creatingFolder, setCreatingFolder] = useState(false);

//   const folderInputRef = useRef();
//   const fileInputRef = useRef();

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const fetchFiles = async () => {
//     setLoadingFiles(true);
//     try {
//       const res = await axiosInstance.get('/');
//       setFiles(res.data.files || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       } else {
//         alert('Failed to load files.');
//       }
//     } finally {
//       setLoadingFiles(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const handleFolderChange = (e) => {
//     setFolderFiles(e.target.files);
//   };

//   const handleSingleFilesChange = (e) => {
//     setSingleFiles(e.target.files);
//   };

//   const uploadFiles = async (type) => {
//     const isFolder = type === 'folder';
//     const fileList = isFolder ? folderFiles : singleFiles;
//     const endpoint = isFolder ? '/upload-folder' : '/upload';

//     if (!fileList || fileList.length === 0) {
//       alert(`Please select ${isFolder ? 'a folder' : 'files'} to upload.`);
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < fileList.length; i++) {
//       formData.append('files', fileList[i]);
//     }

//     setUploading(true);
//     try {
//       await axiosInstance.post(endpoint, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Upload successful');
//       fetchFiles(); // Refresh file list
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
//       await axiosInstance.post('/create-folder', { folderPath: folderName });
//       alert('Folder created successfully!');
//       setFolderName('');
//       fetchFiles();
//     } catch (error) {
//       console.error('Create folder error:', error);
//       alert('Failed to create folder');
//     } finally {
//       setCreatingFolder(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">📁 Cloud File Manager</h2>

//       {/* Create Folder */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Create New Folder:</h3>
//         <input
//           type="text"
//           placeholder="Enter folder name (e.g. legal/docs)"
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//           className="border px-3 py-2 rounded w-full mb-2"
//         />
//         <button
//           onClick={handleCreateFolder}
//           disabled={creatingFolder}
//           className="bg-purple-600 text-white px-4 py-2 rounded"
//         >
//           {creatingFolder ? 'Creating...' : 'Create Folder'}
//         </button>
//       </div>

//       {/* Upload Folder */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Folder:</h3>
//         <input
//           ref={folderInputRef}
//           type="file"
//           webkitdirectory="true"
//           directory="true"
//           multiple
//           onChange={handleFolderChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('folder')}
//           disabled={uploading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Folder'}
//         </button>
//       </div>

//       {/* Upload Files */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Files:</h3>
//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           onChange={handleSingleFilesChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('file')}
//           disabled={uploading}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Files'}
//         </button>
//       </div>

//       {/* Uploaded Files List */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">📄 Uploaded Files:</h3>
//         {loadingFiles ? (
//           <p>Loading files...</p>
//         ) : files.length > 0 ? (
//           <ul className="space-y-3">
//             {files.map((file) => (
//               <li key={file.id} className="flex items-center justify-between border p-2 rounded-md">
//                 <div>
//                   <p className="font-medium">{file.name}</p>
//                   <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
//                 </div>
//                 <a
//                   href={file.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   Open
//                 </a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No files found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const FileBrowser = () => {
//   const [files, setFiles] = useState([]);
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [folderName, setFolderName] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [loadingFiles, setLoadingFiles] = useState(true);
//   const [creatingFolder, setCreatingFolder] = useState(false);
//   const [currentPath, setCurrentPath] = useState('');

//   const folderInputRef = useRef();
//   const fileInputRef = useRef();

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const fetchFiles = async () => {
//     setLoadingFiles(true);
//     try {
//       const res = await axiosInstance.get('/list', {
//         params: { path: currentPath },
//       });
//       setFiles(res.data.items || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       } else {
//         alert('Failed to load files.');
//       }
//     } finally {
//       setLoadingFiles(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, [currentPath]);

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
//       fetchFiles();
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
//       fetchFiles();
//     } catch (error) {
//       console.error('Create folder error:', error);
//       alert('Failed to create folder');
//     } finally {
//       setCreatingFolder(false);
//     }
//   };

//   const enterFolder = (folder) => {
//     setCurrentPath((prev) => prev + folder + '/');
//   };

//   const goBack = () => {
//     const parts = currentPath.split('/').filter(Boolean);
//     parts.pop();
//     const newPath = parts.length ? parts.join('/') + '/' : '';
//     setCurrentPath(newPath);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">📁 Cloud File Manager</h2>

//       <div className="mb-4 flex items-center space-x-4">
//         <button onClick={goBack} disabled={!currentPath} className="bg-gray-300 px-3 py-1 rounded">
//           🔙 Back
//         </button>
//         <span className="font-mono text-sm text-gray-600">{currentPath || '/'}</span>
//       </div>

//       {/* Create Folder */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Create New Folder:</h3>
//         <input
//           type="text"
//           placeholder="Enter folder name (e.g. docs)"
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//           className="border px-3 py-2 rounded w-full mb-2"
//         />
//         <button
//           onClick={handleCreateFolder}
//           disabled={creatingFolder}
//           className="bg-purple-600 text-white px-4 py-2 rounded"
//         >
//           {creatingFolder ? 'Creating...' : 'Create Folder'}
//         </button>
//       </div>

//       {/* Upload Folder */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Folder:</h3>
//         <input
//           ref={folderInputRef}
//           type="file"
//           webkitdirectory="true"
//           directory="true"
//           multiple
//           onChange={handleFolderChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('folder')}
//           disabled={uploading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Folder'}
//         </button>
//       </div>

//       {/* Upload Files */}
//       <div className="mb-6 border p-4 rounded-lg">
//         <h3 className="font-semibold mb-2">Upload Files:</h3>
//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           onChange={handleSingleFilesChange}
//           className="mb-2 block"
//         />
//         <button
//           onClick={() => uploadFiles('file')}
//           disabled={uploading}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {uploading ? 'Uploading...' : 'Upload Files'}
//         </button>
//       </div>

//       {/* File & Folder List */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">📄 Contents:</h3>
//         {loadingFiles ? (
//           <p>Loading files...</p>
//         ) : files.length > 0 ? (
//           <ul className="space-y-3">
//             {files.map((item, index) => (
//               <li key={index} className="flex items-center justify-between border p-2 rounded-md">
//                 <div>
//                   {item.isFolder ? (
//                     <button
//                       onClick={() => enterFolder(item.name)}
//                       className="text-blue-600 underline"
//                     >
//                       📁 {item.name}
//                     </button>
//                   ) : (
//                     <>
//                       <p>{item.name}</p>
//                       <p className="text-sm text-gray-500">{(item.size / 1024).toFixed(2)} KB</p>
//                     </>
//                   )}
//                 </div>
//                 {!item.isFolder && (
//                   <a
//                     href={item.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     Open
//                   </a>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const FileBrowser = () => {
//   const [files, setFiles] = useState([]);
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [folderName, setFolderName] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [loadingFiles, setLoadingFiles] = useState(true);
//   const [creatingFolder, setCreatingFolder] = useState(false);
//   const [currentPath, setCurrentPath] = useState('');

//   const folderInputRef = useRef();
//   const fileInputRef = useRef();

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const fetchFiles = async () => {
//     setLoadingFiles(true);
//     try {
//       const res = await axiosInstance.get('/list', {
//         params: { path: currentPath },
//       });
//       setFiles(res.data.items || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       } else {
//         alert('Failed to load files.');
//       }
//     } finally {
//       setLoadingFiles(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, [currentPath]);

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
//       fetchFiles();
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
//       fetchFiles();
//     } catch (error) {
//       console.error('Create folder error:', error);
//       alert('Failed to create folder');
//     } finally {
//       setCreatingFolder(false);
//     }
//   };

//   const enterFolder = (folder) => {
//     setCurrentPath((prev) => prev + folder + '/');
//   };

//   const goBack = () => {
//     const parts = currentPath.split('/').filter(Boolean);
//     parts.pop();
//     const newPath = parts.length ? parts.join('/') + '/' : '';
//     setCurrentPath(newPath);
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 B';
//     const k = 1024;
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center space-x-3 mb-2">
//             <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
//               </svg>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800">Cloud File Manager</h2>
//           </div>
//           <p className="text-gray-600">Manage your files and folders with ease</p>
//         </div>

//         {/* Navigation */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={goBack} 
//                 disabled={!currentPath} 
//                 className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-lg transition-colors duration-200"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 <span>Back</span>
//               </button>
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                 </svg>
//                 <span className="font-mono bg-gray-100 px-2 py-1 rounded">
//                   {currentPath || '/'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Create Folder */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Create New Folder</h3>
//             </div>
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Enter folder name (e.g. docs)"
//                 value={folderName}
//                 onChange={(e) => setFolderName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
//               />
//               <button
//                 onClick={handleCreateFolder}
//                 disabled={creatingFolder}
//                 className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 {creatingFolder ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Creating...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                     <span>Create Folder</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Upload Folder */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Upload Folder</h3>
//             </div>
//             <div className="space-y-3">
//               <div className="relative">
//                 <input
//                   ref={folderInputRef}
//                   type="file"
//                   webkitdirectory="true"
//                   directory="true"
//                   multiple
//                   onChange={handleFolderChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//               </div>
//               <button
//                 onClick={() => uploadFiles('folder')}
//                 disabled={uploading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 {uploading ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Uploading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     <span>Upload Folder</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Upload Files */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Upload Files</h3>
//             </div>
//             <div className="space-y-3">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 multiple
//                 onChange={handleSingleFilesChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
//               />
//               <button
//                 onClick={() => uploadFiles('file')}
//                 disabled={uploading}
//                 className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 {uploading ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Uploading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     <span>Upload Files</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* File & Folder List */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">Contents</h3>
//             </div>
//           </div>

//           <div className="p-6">
//             {loadingFiles ? (
//               <div className="flex items-center justify-center py-12">
//                 <div className="flex items-center space-x-3">
//                   <svg className="animate-spin w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <span className="text-gray-600">Loading files...</span>
//                 </div>
//               </div>
//             ) : files.length > 0 ? (
//               <ul className="space-y-2">
//                 {files.map((item, index) => (
//                   <li key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-10 h-10 flex items-center justify-center">
//                         {item.isFolder ? (
//                           <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
//                           </svg>
//                         ) : (
//                           <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                         )}
//                       </div>
//                       <div>
//                         {item.isFolder ? (
//                           <button
//                             onClick={() => enterFolder(item.name)}
//                             className="text-blue-600 hover:text-blue-800 font-medium text-left transition-colors duration-200"
//                           >
//                             {item.name}
//                           </button>
//                         ) : (
//                           <div>
//                             <p className="font-medium text-gray-800">{item.name}</p>
//                             <p className="text-sm text-gray-500">{formatFileSize(item.size)}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     {!item.isFolder && (
//                       <a
//                         href={item.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                         </svg>
//                         <span>Open</span>
//                       </a>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <div className="text-center py-12">
//                 <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                 </svg>
//                 <p className="text-gray-500 text-lg">No items found</p>
//                 <p className="text-gray-400 text-sm mt-1">This folder is empty</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';

// const FileBrowser = () => {
//   const [files, setFiles] = useState([]);
//   const [folderFiles, setFolderFiles] = useState(null);
//   const [singleFiles, setSingleFiles] = useState(null);
//   const [folderName, setFolderName] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [loadingFiles, setLoadingFiles] = useState(true);
//   const [creatingFolder, setCreatingFolder] = useState(false);
//   const [currentPath, setCurrentPath] = useState('');

//   const folderInputRef = useRef();
//   const fileInputRef = useRef();

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const fetchFiles = async () => {
//     setLoadingFiles(true);
//     try {
//       const res = await axiosInstance.get('/list', {
//         params: { path: currentPath },
//       });
//       setFiles(res.data.items || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       } else {
//         alert('Failed to load files.');
//       }
//     } finally {
//       setLoadingFiles(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, [currentPath]);

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
//       fetchFiles();
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
//       fetchFiles();
//     } catch (error) {
//       console.error('Create folder error:', error);
//       alert('Failed to create folder');
//     } finally {
//       setCreatingFolder(false);
//     }
//   };

//   const enterFolder = (folder) => {
//     setCurrentPath((prev) => prev + folder + '/');
//   };

//   const goBack = () => {
//     const parts = currentPath.split('/').filter(Boolean);
//     parts.pop();
//     const newPath = parts.length ? parts.join('/') + '/' : '';
//     setCurrentPath(newPath);
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 B';
//     const k = 1024;
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center space-x-3 mb-2">
//             <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
//               </svg>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800">Cloud File Manager</h2>
//           </div>
//           <p className="text-gray-600">Manage your files and folders with ease</p>
//         </div>

//         {/* Navigation */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={goBack} 
//                 disabled={!currentPath} 
//                 className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-lg transition-colors duration-200"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 <span>Back</span>
//               </button>
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                 </svg>
//                 <span className="font-mono bg-gray-100 px-2 py-1 rounded">
//                   {currentPath || '/'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Create Folder */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Create New Folder</h3>
//             </div>
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Enter folder name (e.g. docs)"
//                 value={folderName}
//                 onChange={(e) => setFolderName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
//               />
//               <button
//                 onClick={handleCreateFolder}
//                 disabled={creatingFolder}
//                 className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 {creatingFolder ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Creating...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                     <span>Create Folder</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Upload Folder */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Upload Folder</h3>
//             </div>
//             <div className="space-y-3">
//               <div className="relative">
//                 <input
//                   ref={folderInputRef}
//                   type="file"
//                   webkitdirectory="true"
//                   directory="true"
//                   multiple
//                   onChange={handleFolderChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 />
//               </div>
//               <button
//                 onClick={() => uploadFiles('folder')}
//                 disabled={uploading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 {uploading ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Uploading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     <span>Upload Folder</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Upload Files */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">Upload Files</h3>
//             </div>
//             <div className="space-y-3">
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 multiple
//                 onChange={handleSingleFilesChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
//               />
//               <button
//                 onClick={() => uploadFiles('file')}
//                 disabled={uploading}
//                 className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
//               >
//                 {uploading ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Uploading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     <span>Upload Files</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* File & Folder List */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">Contents</h3>
//             </div>
//           </div>

//           <div className="p-6">
//             {loadingFiles ? (
//               <div className="flex items-center justify-center py-12">
//                 <div className="flex items-center space-x-3">
//                   <svg className="animate-spin w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <span className="text-gray-600">Loading files...</span>
//                 </div>
//               </div>
//             ) : files.length > 0 ? (
//               <ul className="space-y-2">
//                 {files.map((item, index) => (
//                   <li key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-10 h-10 flex items-center justify-center">
//                         {item.isFolder ? (
//                           <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
//                           </svg>
//                         ) : (
//                           <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                         )}
//                       </div>
//                       <div>
//                         {item.isFolder ? (
//                           <button
//                             onClick={() => enterFolder(item.name)}
//                             className="text-blue-600 hover:text-blue-800 font-medium text-left transition-colors duration-200"
//                           >
//                             {item.name}
//                           </button>
//                         ) : (
//                           <div>
//                             <p className="font-medium text-gray-800">{item.name}</p>
//                             <p className="text-sm text-gray-500">{formatFileSize(item.size)}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     {!item.isFolder && (
//                       <a
//                         href={item.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                         </svg>
//                         <span>Open</span>
//                       </a>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <div className="text-center py-12">
//                 <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//                 </svg>
//                 <p className="text-gray-500 text-lg">No items found</p>
//                 <p className="text-gray-400 text-sm mt-1">This folder is empty</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FileBrowser = ({ currentPath = '', setCurrentPath, onRefresh }) => {
//   const [files, setFiles] = useState([]);
//   const [loadingFiles, setLoadingFiles] = useState(true);
//   const [internalPath, setInternalPath] = useState(currentPath);

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const currentActivePath = currentPath || internalPath;

//   const fetchFiles = async () => {
//     setLoadingFiles(true);
//     try {
//       const res = await axiosInstance.get('/list', {
//         params: { path: currentActivePath },
//       });
//       setFiles(res.data.items || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       } else {
//         alert('Failed to load files.');
//       }
//     } finally {
//       setLoadingFiles(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, [currentActivePath]);

//   const enterFolder = (folder) => {
//     const newPath = currentActivePath + folder + '/';
//     if (setCurrentPath) {
//       setCurrentPath(newPath);
//     } else {
//       setInternalPath(newPath);
//     }
//   };

//   const goBack = () => {
//     const parts = currentActivePath.split('/').filter(Boolean);
//     parts.pop();
//     const newPath = parts.length ? parts.join('/') + '/' : '';
//     if (setCurrentPath) {
//       setCurrentPath(newPath);
//     } else {
//       setInternalPath(newPath);
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 B';
//     const k = 1024;
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
   
//     <div className="px-4 w-full space-y-4">

//       {/* Navigation */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={goBack} 
//             disabled={!currentActivePath} 
//             className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-md transition-colors duration-200"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             <span>Back</span>
//           </button>
//           <div className="flex items-center space-x-2 text-sm text-gray-600">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//             </svg>
//             <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
//               {currentActivePath || '/'}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* File & Folder List */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
//               <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800">Contents</h3>
//           </div>
//         </div>

//         <div className="p-4">
//           {loadingFiles ? (
//             <div className="flex items-center justify-center py-8">
//               <div className="flex items-center space-x-3">
//                 <svg className="animate-spin w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span className="text-gray-600">Loading files...</span>
//               </div>
//             </div>
//           ) : files.length > 0 ? (
//             <div className="space-y-2">
//               {files.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 flex items-center justify-center">
//                       {item.isFolder ? (
//                         <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
//                         </svg>
//                       ) : (
//                         <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                         </svg>
//                       )}
//                     </div>
//                     <div>
//                       {item.isFolder ? (
//                         <button
//                           onClick={() => enterFolder(item.name)}
//                           className="text-blue-600 hover:text-blue-800 font-medium text-left transition-colors duration-200"
//                         >
//                           {item.name}
//                         </button>
//                       ) : (
//                         <div>
//                           <p className="font-medium text-gray-800 text-sm">{item.name}</p>
//                           <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   {!item.isFolder && (
//                     <a
//                       href={item.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-md transition-colors duration-200 text-sm"
//                     >
//                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                       </svg>
//                       <span>Open</span>
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//               <p className="text-gray-500">No items found</p>
//               <p className="text-gray-400 text-sm mt-1">This folder is empty</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const FileBrowser = ({ currentPath = '', setCurrentPath, onRefresh, isPopup = false }) => {
//   const [files, setFiles] = useState([]);
//   const [loadingFiles, setLoadingFiles] = useState(true);
//   const [internalPath, setInternalPath] = useState(currentPath);

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:3000/api/files',
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   const currentActivePath = currentPath || internalPath;

//   const fetchFiles = async () => {
//     setLoadingFiles(true);
//     try {
//       const res = await axiosInstance.get('/list', {
//         params: { path: currentActivePath },
//       });
//       setFiles(res.data.items || []);
//     } catch (error) {
//       console.error('Error fetching files:', error);
//       if (error.response?.status === 401) {
//         alert('Unauthorized. Please login again.');
//       } else {
//         alert('Failed to load files.');
//       }
//     } finally {
//       setLoadingFiles(false);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, [currentActivePath]);

//   const enterFolder = (folder) => {
//     const newPath = currentActivePath + folder + '/';
//     if (setCurrentPath) {
//       setCurrentPath(newPath);
//     } else {
//       setInternalPath(newPath);
//     }
//   };

//   const goBack = () => {
//     const parts = currentActivePath.split('/').filter(Boolean);
//     parts.pop();
//     const newPath = parts.length ? parts.join('/') + '/' : '';
//     if (setCurrentPath) {
//       setCurrentPath(newPath);
//     } else {
//       setInternalPath(newPath);
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 B';
//     const k = 1024;
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <div className={`w-full space-y-4 ${isPopup ? '' : 'p-0'}`}>
//       {/* Navigation */}
//       <div className={`rounded-lg ${isPopup ? '' : 'shadow-sm border border-gray-200'} p-4 bg-white`}>
//         <div className="flex items-center space-x-4">
//           <button 
//             onClick={goBack} 
//             disabled={!currentActivePath} 
//             className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-md transition-colors duration-200"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             <span>Back</span>
//           </button>
//           <div className="flex items-center space-x-2 text-sm text-gray-600">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//             </svg>
//             <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
//               {currentActivePath || '/'}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* File & Folder List */}
//       <div className={`rounded-lg ${isPopup ? '' : 'shadow-sm border border-gray-200'} bg-white`}>
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
//               <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800">Contents</h3>
//           </div>
//         </div>

//         <div className="p-4">
//           {loadingFiles ? (
//             <div className="flex items-center justify-center py-8">
//               <div className="flex items-center space-x-3">
//                 <svg className="animate-spin w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 <span className="text-gray-600">Loading files...</span>
//               </div>
//             </div>
//           ) : files.length > 0 ? (
//             <div className="space-y-2">
//               {files.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 flex items-center justify-center">
//                       {item.isFolder ? (
//                         <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
//                         </svg>
//                       ) : (
//                         <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                         </svg>
//                       )}
//                     </div>
//                     <div>
//                       {item.isFolder ? (
//                         <button
//                           onClick={() => enterFolder(item.name)}
//                           className="text-blue-600 hover:text-blue-800 font-medium text-left transition-colors duration-200"
//                         >
//                           {item.name}
//                         </button>
//                       ) : (
//                         <div>
//                           <p className="font-medium text-gray-800 text-sm">{item.name}</p>
//                           <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   {!item.isFolder && (
//                     <a
//                       href={item.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-md transition-colors duration-200 text-sm"
//                     >
//                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                       </svg>
//                       <span>Open</span>
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//               </svg>
//               <p className="text-gray-500">No items found</p>
//               <p className="text-gray-400 text-sm mt-1">This folder is empty</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileBrowser;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileBrowser = ({ currentPath = '', setCurrentPath, onRefresh, isPopup = false }) => {
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [internalPath, setInternalPath] = useState(currentPath);

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/files',
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
