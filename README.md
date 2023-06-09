AutoPassport

AutoPassport es un proyecto de historial de vehículos basado en tecnología blockchain. Permite el seguimiento y almacenamiento seguro del historial de un vehículo utilizando contratos inteligentes y tokens no fungibles (NFT).

El proyecto se divide en dos componentes principales:

frontend-autopassport

El frontend de AutoPassport es una interfaz de usuario interactiva que permite a los usuarios interactuar con el historial de vehículos y visualizar la información relevante. Utiliza tecnologías web modernas como React, Next, JavaScript y HTML/CSS.

Cómo empezar

Sigue los pasos a continuación para configurar y ejecutar el frontend de AutoPassport:

Clona este repositorio en tu máquina local.
Navega hasta la carpeta frontend-autopassport.
Instala las dependencias del proyecto ejecutando el siguiente comando:
npm install
Configura el archivo de configuración con la información necesaria para conectarte a la red blockchain deseada.
Ejecuta la aplicación con el siguiente comando:
npm run dev
Accede a la aplicación en tu navegador en la dirección http://localhost:3000.

backend-autopassport

El backend de AutoPassport es la parte del servidor en donde se llevó a cabo el desarrollo del smart contract empleando Node, Hardhat y también se realizó una API con Express para próximas implementaciones.

Cómo empezar

Sigue los pasos a continuación para hacer el despliegue y verificar el contrato inteligente de AutoPassport:

Clona este repositorio en tu máquina local.
Navega hasta la carpeta backend-autopassport.
Instala las dependencias del proyecto ejecutando el siguiente comando:
npm install
Configura el archivo de configuración con la información necesaria para desplegar el contrato en la red blockchain Mumbai.
Ejecuta el siguiente comando:
npx hardhat run scripts/deployAutoPassport.js --network <mumbai network>
Para llevar a cabo la verificación del contrato, se debe ejecutar el siguiente comando:
npx hardhat verify <contract address>
El contrato ya permitirá acceder a sus funciones de lectura y escritura desde Polygon Scan Testnet.
