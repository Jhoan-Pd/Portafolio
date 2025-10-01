export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 bg-gray-100 px-6 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold mb-8 text-gray-900">Contacto</h2>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Si quieres colaborar o tienes algún proyecto en mente, no dudes en
        escribirme.
      </p>
      <a
        href="mailto:tuemail@ejemplo.com"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Escríbeme
      </a>
    </section>
  );
}
