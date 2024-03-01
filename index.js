//Importaciones de configuraciones de servidor
import { initServer } from "./configs/app.js"
import { connect } from "./configs/mongo.js"

//Ejecutar configuraciones para iniciar servidor
initServer()
connect()