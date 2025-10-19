import React from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";

export default function Terminos() {
  return (
    <Layout>
      <section className="login-section terminos spad">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="card shadow p-4 terminos-card">
                <h2 className="text-center mb-4">Términos y Condiciones</h2>

                <div className="terminos-content">
                  <p>
                    Bienvenido a FullSound. Al utilizar este sitio acepta cumplir
                    con los siguientes términos y condiciones. Lea atentamente
                    antes de continuar.
                  </p>

                  <h5>1. Uso del servicio</h5>
                  <p>
                    El servicio proporciona contenido musical y servicios
                    relacionados. Usted se compromete a usar el servicio de
                    acuerdo con la ley y a no realizar actividades que perjudiquen
                    a otros usuarios o a la plataforma.
                  </p>

                  <h5>2. Propiedad intelectual</h5>
                  <p>
                    Todo el contenido mostrado en el sitio (música, imágenes,
                    textos) puede estar protegido por derechos de autor. Queda
                    prohibida la reproducción no autorizada en caso de que su respectivo autor no lo permita.
                  </p>

                  <h5>3. Privacidad</h5>
                  <p>
                    La información recogida será usada según nuestra política de
                    privacidad. No compartiremos sus credenciales ni datos
                    sensibles con terceros sin su consentimiento.
                  </p>

                  <h5>4. Limitación de responsabilidad</h5>
                  <p>
                    El sitio no se hace responsable por daños indirectos o
                    pérdidas causadas por el uso del servicio. Consulte la
                    documentación para detalles.
                  </p>

                  <p>
                    Estos términos pueden actualizarse. La versión publicada en
                    esta página será la vigente.
                  </p>
                </div>

                <div className="mt-4 text-center">
                  <Link to="/registro" className="site-btn">
                    Volver al registro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
