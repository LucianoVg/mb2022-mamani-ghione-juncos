export const Navbar = () => {
    return (
        <header className="header" id="header">
            <div className="header_toggle">
                <i className='bx bx-menu' id="header-toggle"></i>
            </div>
            <div className="header_img"> </div>
            <a href='/gestion/institucional' >
                Institucional
            </a>
        </header>
    )
}