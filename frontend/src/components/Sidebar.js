
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
