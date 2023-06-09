AUTOPASSPORT

AutoPassport is a blockchain-based project focused on vehicle history. It enables secure tracking and storage of a vehicle's history using smart contracts and non-fungible tokens (NFTs).

The project is divided into two main components:

frontend-autopassport

The frontend-autopassport folder contains the interactive user interface for AutoPassport. It allows users to interact with vehicle history and view relevant information. The frontend utilizes modern web technologies such as React, Next.js, JavaScript, and HTML/CSS.

Getting Started

To set up and run the frontend-autopassport component, follow these steps:

-Clone the repository to your local machine.
-Navigate to the frontend-autopassport folder.
-Install project dependencies by running the command: npm install.
-Configure the necessary information to connect to your desired blockchain network.
-Start the application with the command: npm run dev.
-Access the application in your browser at http://localhost:3000.
backend-autopassport

The backend-autopassport folder contains the server-side component of AutoPassport. It includes the development of smart contracts using Node.js and Hardhat, as well as an Express API for future implementations.

Getting Started

To deploy and verify the backend-autopassport component, follow these steps:

- Clone the repository to your local machine.
- Navigate to the backend-autopassport folder.
- Install project dependencies by running the command: npm install.
- Configure the necessary information to deploy the contract on your desired blockchain network.
- Run the command: npx hardhat run scripts/deployAutoPassport.js --network <mumbai network>.
- To verify the contract, use the command: npx hardhat verify <contract address>.
- The contract will then provide access to its read and write functions from the Polygon Scan Testnet.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
AUTOPASSPORT

AutoPassport es un proyecto de historial de vehículos basado en tecnología blockchain. Permite el seguimiento y almacenamiento seguro del historial de un vehículo utilizando contratos inteligentes y tokens no fungibles (NFT).

El proyecto se divide en dos componentes principales:

frontend-autopassport

El frontend de AutoPassport es una interfaz de usuario interactiva que permite a los usuarios interactuar con el historial de vehículos y visualizar la información relevante. Utiliza tecnologías web modernas como React, Next, JavaScript y HTML/CSS.

Cómo empezar

Sigue los pasos a continuación para configurar y ejecutar el frontend de AutoPassport:

- Clona este repositorio en tu máquina local.
- Navega hasta la carpeta frontend-autopassport.
- Instala las dependencias del proyecto ejecutando el siguiente comando:
- npm install
- Configura el archivo de configuración con la información necesaria para conectarte a la red blockchain mumbai y las llaves privadas del servicio ipfs de pinata.
- Ejecuta la aplicación con el siguiente comando:
- npm run dev
- Accede a la aplicación en tu navegador en la dirección http://localhost:3000.

backend-autopassport

El backend de AutoPassport es la parte del servidor en donde se llevó a cabo el desarrollo del smart contract empleando Node, Hardhat y también se realizó una API con Express para próximas implementaciones.

Cómo empezar

Sigue los pasos a continuación para hacer el despliegue y verificar el contrato inteligente de AutoPassport:

- Clona este repositorio en tu máquina local.
- Navega hasta la carpeta backend-autopassport.
- Instala las dependencias del proyecto ejecutando el siguiente comando:
- npm install
- Configura el archivo de configuración con la información necesaria para desplegar el contrato en la red blockchain Mumbai.
- Ejecuta el siguiente comando:
- npx hardhat run scripts/deployAutoPassport.js --network <mumbai network>
- Para llevar a cabo la verificación del contrato, se debe ejecutar el siguiente comando:
- npx hardhat verify <contract address>
- El contrato ya permitirá acceder a sus funciones de lectura y escritura desde Polygon Scan Testnet.
  
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
