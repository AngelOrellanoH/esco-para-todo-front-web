import { NavLink } from 'react-router-dom'

const AccountSection = () => {
  return (
    <section className="py-12 md:py-20 !bg-[#003060] !text-white rounded-lg my-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Regístrate hoy y empieza a explorar tus competencias y oportunidades laborales con ESCO para todos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink
            to="/register"
            className="!bg-white !text-[#003060] px-6 py-3 text-sm font-semibold rounded hover:!bg-gray-200 transition text-center no-underline"
          >
            Registrarse
          </NavLink>
          <NavLink
            to="/contact"
            className="border border-white !text-white px-6 py-3 text-sm font-semibold rounded hover:!bg-white hover:!text-[#003060] transition text-center no-underline"
          >
            Contáctanos
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default AccountSection
