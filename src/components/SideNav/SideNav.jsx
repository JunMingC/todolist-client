import './SideNav.scss'
import React from 'react'

const SideNav = () => {
    return (
        <div className="sidenav-container">
            <div className="sidenav-header-container">
                <div className="sidenav-header">
                    To Do List
                </div>
            </div>
            <div className="sidenav-category-container">
                <div className='sidenav-category-item'>
                    <div className='sidenav-category-icon'>•</div>
                    <div className='sidenav-category-text'>Tasks</div>
                </div>

                <div className='sidenav-category-item disabled' title="Work in Progress">
                    <div className='sidenav-category-icon'>•</div>
                    <div className='sidenav-category-text'>Priorities</div>
                </div>

                <div className='sidenav-category-item disabled' title="Work in Progress">
                    <div className='sidenav-category-icon'>•</div>
                    <div className='sidenav-category-text'>Status</div>
                </div>

                <div className='sidenav-category-item disabled' title="Work in Progress">
                    <div className='sidenav-category-icon'>•</div>
                    <div className='sidenav-category-text'>Tags</div>
                </div>
            </div>
        </div >
    )
}

export default SideNav