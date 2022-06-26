import './css/App.css';
import { Link, Route } from 'wouter'
import { Inventario } from './components/Inventario';
import { Inicio } from './components/Inicio';
import { Venta } from './components/Venta';
import { Clientes } from './components/Clientes';
import { Registros } from './components/Registros';


function App() {

  const cambiarEstado = e => {
    e.target.classList.add('active')
    const aElements = Array.from(e.nativeEvent.path[2].querySelectorAll('a'))
    aElements.forEach(a => {
      if(a !== e.target) {
        if(a.classList.contains('active'))
        {
          a.classList.remove('active')
        }
      }
    })
  }

  return (
    <div className="App">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom a-container">
        <ul className="nav nav-pills ul-listener" onClick={cambiarEstado}>
            <li className="nav-item"><Link to="/inicio" className="nav-link active" aria-current="page">Inicio</Link></li>
            <li className="nav-item"><Link to="/venta" className="nav-link">Venta</Link></li>
            <li className="nav-item"><Link to="/inventario" className="nav-link">Inventario</Link></li>
            <li className="nav-item"><Link to="/clientes" className="nav-link">Clientes</Link></li>
            <li className="nav-item"><Link to="/registros" className="nav-link">Registros</Link></li>
        </ul>
      </header>
      <main>
        <Route
          path="/"
          component={Inicio} />
        <Route 
          path="/inicio"
          component={Inicio} />
        <Route 
          path="/venta"
          component={Venta} />
        <Route 
          path="/inventario"
          component={Inventario} />
        <Route 
          path="/clientes"
          component={Clientes} />
        <Route 
          path="/registros"
          component={Registros} />
      </main>
      <footer className="text-center text-white" style={{'backgroundColor ' : '#f1f1f1'}}>
        {/* <!-- Grid container --> */}
        <div className="container pt-4">
          {/* <!-- Section: Social media --> */}
          <section className="mb-4">
            {/* <!-- Facebook --> */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-facebook-f"></i
            ></a>

            {/* <!-- Twitter --> */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-twitter"></i
            ></a>

            {/* <!-- Google --> */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-google"></i
            ></a>

            {/* <!-- Instagram --> */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-instagram"></i
            ></a>

            {/* <!-- Linkedin --> */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-linkedin"></i
            ></a>
            {/* <!-- Github --> */}
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
              ><i className="fab fa-github"></i
            ></a>
          </section>
          {/* <!-- Section: Social media --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <div className="text-center text-dark p-3" style={{"backgroundColor" : "rgba(0, 0, 0, 0.2)"}}>
          © 2022 Copyright: <a>Univalle - DS2</a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  )
}

export default App;
