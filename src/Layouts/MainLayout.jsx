
import NavBar from '../Component/NavBar/NavBar'

function MainLayout({children}) {
  return (
    <div>
        <NavBar/>
        <main>
            {children}
        </main>
    </div>
  )
}

export default MainLayout