import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'   // icons for hamburger

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="bg-gray-400 shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-700">MyBlog</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-gray-700 font-medium rounded-full transition duration-200 hover:bg-blue-100 hover:text-blue-800"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <div className="px-4 py-2 bg-gray-500 text-amber-100 font-medium rounded-full transition duration-200 hover:bg-blue-100 hover:text-amber-900">
                  <LogoutBtn />
                </div>
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-gray-100 rounded-lg shadow-md p-4 mt-2 space-y-3">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug)
                    setMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 font-medium rounded-md hover:bg-blue-100 hover:text-blue-800"
                >
                  {item.name}
                </button>
              ) : null
            )}

            {authStatus && (
              <div className="px-4 py-2 bg-gray-500 text-amber-100 font-medium rounded-md hover:bg-blue-100 hover:text-amber-900">
                <LogoutBtn />
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
