// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const Sidebar = () => {
// //   return (
// //     <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
// //       <div className="text-2xl font-bold mb-6">Drive App</div>
// //       <nav>
// //         <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
// //           My Files
// //         </Link>
// //         {/* Add more navigation links here if needed */}
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// import React from 'react';

// // Mock Link component for demonstration - replace with actual react-router-dom import
// const Link = ({ to, children, className, ...props }) => (
//   <a href={to} className={className} {...props}>
//     {children}
//   </a>
// );

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-xl border-r border-slate-700">
//       {/* Header */}
//       <div className="p-6 border-b border-slate-700">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
//             </svg>
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-white">Drive App</h1>
//             <p className="text-xs text-slate-400">Cloud Storage</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 space-y-2">
//         <div className="mb-6">
//           <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
//             Storage
//           </h3>
          
//           <Link 
//             to="/dashboard" 
//             className="group flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-lg border border-transparent hover:border-slate-600/50 relative overflow-hidden"
//           >
//             <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-200">
//               <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <span className="font-medium text-white group-hover:text-blue-200 transition-colors duration-200">
//                 My Files
//               </span>
//               <p className="text-xs text-slate-400 group-hover:text-slate-300">
//                 Browse all files
//               </p>
//             </div>
//             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>

//           <Link 
//             to="/recent" 
//             className="group flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-lg border border-transparent hover:border-slate-600/50 relative overflow-hidden"
//           >
//             <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-200">
//               <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <span className="font-medium text-white group-hover:text-green-200 transition-colors duration-200">
//                 Recent
//               </span>
//               <p className="text-xs text-slate-400 group-hover:text-slate-300">
//                 Recently accessed
//               </p>
//             </div>
//             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>

//           <Link 
//             to="/shared" 
//             className="group flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-lg border border-transparent hover:border-slate-600/50 relative overflow-hidden"
//           >
//             <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-200">
//               <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <span className="font-medium text-white group-hover:text-purple-200 transition-colors duration-200">
//                 Shared
//               </span>
//               <p className="text-xs text-slate-400 group-hover:text-slate-300">
//                 Shared with me
//               </p>
//             </div>
//             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>

//           <Link 
//             to="/trash" 
//             className="group flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-lg border border-transparent hover:border-slate-600/50 relative overflow-hidden"
//           >
//             <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-200">
//               <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <span className="font-medium text-white group-hover:text-red-200 transition-colors duration-200">
//                 Trash
//               </span>
//               <p className="text-xs text-slate-400 group-hover:text-slate-300">
//                 Deleted files
//               </p>
//             </div>
//             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
//             Tools
//           </h3>
          
//           <Link 
//             to="/upload" 
//             className="group flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-lg border border-transparent hover:border-slate-600/50 relative overflow-hidden"
//           >
//             <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors duration-200">
//               <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <span className="font-medium text-white group-hover:text-orange-200 transition-colors duration-200">
//                 Upload
//               </span>
//               <p className="text-xs text-slate-400 group-hover:text-slate-300">
//                 Add new files
//               </p>
//             </div>
//             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>
//         </div>
//       </nav>

//       {/* Storage Info */}
//       <div className="p-4 border-t border-slate-700">
//         <div className="bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-slate-300">Storage</span>
//             <span className="text-xs text-slate-400">75%</span>
//           </div>
//           <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '75%'}}></div>
//           </div>
//           <p className="text-xs text-slate-400">7.5 GB of 10 GB used</p>
//           <button className="mt-3 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 hover:shadow-lg">
//             Upgrade Storage
//           </button>
//         </div>
//       </div>

//       {/* User Profile */}
//       <div className="p-4 border-t border-slate-700">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
//             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium text-white truncate">John Doe</p>
//             <p className="text-xs text-slate-400 truncate">john@example.com</p>
//           </div>
//           <button className="text-slate-400 hover:text-white transition-colors duration-200">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React from 'react';

// const Sidebar = ({ onNewClick }) => {
//   return (
//     <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
//       {/* New Button */}
//       <div className="p-4">
//         <button
//           onClick={onNewClick}
//           className="flex items-center space-x-3 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-200 w-full"
//         >
//           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           <span className="text-gray-700 font-medium">New</span>
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-2">
//         <div className="space-y-1">
//           <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//             </svg>
//             <span>My Drive</span>
//           </a>
          
//           <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             <span>Shared with me</span>
//           </a>
          
//           <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span>Recent</span>
//           </a>
          
//           <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//             </svg>
//             <span>Starred</span>
//           </a>
          
//           <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//             <span>Trash</span>
//           </a>
//         </div>
//       </nav>

//       {/* Storage */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="space-y-2">
//           <div className="flex items-center justify-between text-sm text-gray-600">
//             <span>Storage</span>
//             <span>7.5 GB of 15 GB used</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-1">
//             <div className="bg-blue-600 h-1 rounded-full" style={{width: '50%'}}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// SidebarWithPopup.tsx
// import React from 'react';
// import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

// const Sidebar = ({ onNewClick }) => {
//   return (
//     <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
//       {/* New Button */}
//       <div className="p-4">
//         <button
//           onClick={onNewClick}
//           className="flex items-center space-x-3 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-all duration-200 w-full"
//         >
//           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           <span className="text-gray-700 font-medium">New</span>
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-2">
//         <div className="space-y-1">
//           <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
//             </svg>
//             <span>My Drive</span>
//           </Link>
          
//           <Link to="/shared" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             <span>Shared with me</span>
//           </Link>
          
//           <Link to="/recent" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span>Recent</span>
//           </Link>
          
//           <Link to="/starred" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//             </svg>
//             <span>Starred</span>
//           </Link>
          
//           <Link to="/trash" className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//             <span>Trash</span>
//           </Link>
//         </div>
//       </nav>

//       {/* Storage */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="space-y-2">
//           <div className="flex items-center justify-between text-sm text-gray-600">
//             <span>Storage</span>
//             <span>7.5 GB of 15 GB used</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-1">
//             <div className="bg-blue-600 h-1 rounded-full" style={{width: '50%'}}></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import React, { useState, useRef, useEffect } from 'react';
// import React, { useState, useRef, useEffect } from 'react';

// import { Link } from 'react-router-dom';
// import NewMenu from './FileUpload'; // Rename this if it's not the 'New' popup

// const Sidebar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const menuRef = useRef(null);

//   const toggleMenu = () => setShowMenu((prev) => !prev);
//   const closeMenu = () => setShowMenu(false);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         closeMenu();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full relative" ref={menuRef}>
//       {/* New Button */}
//       <div className="p-3">
//         <button
//           onClick={toggleMenu}
//           className="flex items-center space-x-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 w-full"
//         >
//           <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           <span className="text-sm text-gray-800 font-medium">New</span>
//         </button>
//         {showMenu && (
//           <div className="absolute z-50 mt-2 left-3 w-72">
//             <NewMenu onClose={closeMenu} />
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto px-2">
//         <ul className="space-y-1 text-sm">
//           <SidebarLink to="/my-drive" label="My Drive" icon="M3 7l1.664 11.648A2 2 0 006.655 21h10.69a2 2 0 001.991-2.352L21 7H3z" />
//           <SidebarLink to="/computers" label="Computers" icon="M9 12h6m2 0a2 2 0 01-2 2H9a2 2 0 01-2-2m12 0V7a2 2 0 00-2-2H7a2 2 0 00-2 2v5m12 0H5" />
//           <SidebarLink to="/shared" label="Shared with me" icon="M17 16l4-4m0 0l-4-4m4 4H7" />
//           <SidebarLink to="/recent" label="Recent" icon="M12 8v4l3 3M12 6a9 9 0 100 18 9 9 0 000-18z" />
//           <SidebarLink to="/starred" label="Starred" icon="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.909c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.175 0l-3.977 2.89c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.909a1 1 0 00.95-.69l1.518-4.674z" />
//           <SidebarLink to="/trash" label="Trash" icon="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
//         </ul>
//       </nav>

//       {/* Storage */}
//       <div className="p-4 border-t border-gray-200 text-xs text-gray-600">
//         <div className="flex justify-between mb-1">
//           <span>Storage</span>
//           <span>7.5 GB of 15 GB</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // SidebarLink component
// const SidebarLink = ({ to, label, icon }) => (
//   <Link
//     to={to}
//     className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-150"
//   >
//     <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
//     </svg>
//     <span className="text-sm font-medium">{label}</span>
//   </Link>
// );

// export default Sidebar;
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewMenu from './FileUpload'; // Make sure this is the popup component

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const closeMenu = () => setShowMenu(false);
  const toggleSidebar = () => setCollapsed((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-200 relative`}
      ref={menuRef}
    >
      {/* Toggle Button */}
      <div className="p-2 flex justify-end">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {collapsed ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* New Button */}
      <div className="p-3">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 w-full"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {!collapsed && <span className="text-sm text-gray-800 font-medium">New</span>}
        </button>
        {showMenu && !collapsed && (
          <div className="absolute z-50 mt-2 left-3 w-72">
            <NewMenu onClose={closeMenu} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2">
        <ul className="space-y-1 text-sm">
          <SidebarLink to="/my-drive" label="My Drive" iconPath="M3 7l1.664 11.648A2 2 0 006.655 21h10.69a2 2 0 001.991-2.352L21 7H3z" collapsed={collapsed} />
          <SidebarLink to="/computers" label="Computers" iconPath="M9 12h6m2 0a2 2 0 01-2 2H9a2 2 0 01-2-2m12 0V7a2 2 0 00-2-2H7a2 2 0 00-2 2v5m12 0H5" collapsed={collapsed} />
          <SidebarLink to="/shared" label="Shared with me" iconPath="M17 16l4-4m0 0l-4-4m4 4H7" collapsed={collapsed} />
          <SidebarLink to="/recent" label="Recent" iconPath="M12 8v4l3 3M12 6a9 9 0 100 18 9 9 0 000-18z" collapsed={collapsed} />
          <SidebarLink to="/starred" label="Starred" iconPath="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.909c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.175 0l-3.977 2.89c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.909a1 1 0 00.95-.69l1.518-4.674z" collapsed={collapsed} />
          <SidebarLink to="/trash" label="Trash" iconPath="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" collapsed={collapsed} />
        </ul>
      </nav>

      {/* Storage */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 text-xs text-gray-600">
          <div className="flex justify-between mb-1">
            <span>Storage</span>
            <span>7.5 GB of 15 GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

// SidebarLink component
const SidebarLink = ({ to, label, iconPath, collapsed }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-150"
  >
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
    </svg>
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
  </Link>
);

export default Sidebar;
// import React, { useState, useRef, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import NewMenu from './FileUpload';

// const Sidebar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const menuRef = useRef(null);

//   const toggleMenu = () => setShowMenu((prev) => !prev);
//   const closeMenu = () => setShowMenu(false);
//   const toggleSidebar = () => setCollapsed((prev) => !prev);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         closeMenu();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div
//       className={`${
//         collapsed ? 'w-16' : 'w-64'
//       } bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-200 relative`}
//       ref={menuRef}
//     >
//       {/* Toggle Button */}
//       <div className="p-2 flex justify-end">
//         <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none">
//           {collapsed ? (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           ) : (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* New Button */}
//       <div className="p-3">
//         <button
//           onClick={toggleMenu}
//           className="flex items-center justify-center space-x-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 w-full"
//         >
//           <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//           </svg>
//           {!collapsed && <span className="text-sm text-gray-800 font-medium">New</span>}
//         </button>
//         {showMenu && !collapsed && (
//           <div className="absolute z-50 mt-2 left-3 w-72">
//             <NewMenu onClose={closeMenu} />
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto px-2">
//         <ul className="space-y-1 text-sm">
//           <SidebarLink to="/FileBrowser" label="My Drive" iconPath="M3 7l1.664 11.648A2 2 0 006.655 21h10.69a2 2 0 001.991-2.352L21 7H3z" collapsed={collapsed} />
//           {/* Add more links below if needed */}
//         </ul>
//       </nav>

//       {/* Storage */}
//       {!collapsed && (
//         <div className="p-4 border-t border-gray-200 text-xs text-gray-600">
//           <div className="flex justify-between mb-1">
//             <span>Storage</span>
//             <span>7.5 GB of 15 GB</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // NavLink Sidebar Item
// const SidebarLink = ({ to, label, iconPath, collapsed }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-150 ${
//         isActive ? 'bg-gray-200 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
//       }`
//     }
//   >
//     <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
//     </svg>
//     {!collapsed && <span className="text-sm font-medium">{label}</span>}
//   </NavLink>
// );

// export default Sidebar;
