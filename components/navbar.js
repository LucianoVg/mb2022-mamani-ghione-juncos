import { useAuth } from "./context/authUserProvider"

export const Navbar = () => {
    const { loading, authUser } = useAuth()
    return (
        <header  className="header " id="header">
            <div className="header_toggle">
                <i className='bx bx-menu' id="header-toggle"></i>
            </div>
            <a href='/gestion/institucional' className="ms-auto p-2">
                Institucional
            </a>
            {
                !loading && authUser && (
                    <div onClick={(e) => console.log('Ir al perfil')} className="header_img bg-secondary" style={{ width: 30, height: 30, cursor: 'pointer' }}>
                        <i className='bx bx-user m-auto'></i>
                        {/* <span>
                            {authUser.email}
                        </span> */}
                    </div>
                )
            }
        </header>
    )
}