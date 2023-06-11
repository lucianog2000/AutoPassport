## Inspiration
We gained the necessary inspiration to undertake this project because we have all experienced problems when buying used vehicles. So, we thought about the best way to have a comprehensive vehicle history and access its data in the most transparent manner possible, and blockchain technology provides us with this.

## What it does
AutoPassport is a prototype platform that allows your vehicle to be like an open book, serving as a valuable tool for owners to register all the maintenance and repairs of the vehicle since it leaves the factory.

It also benefits manufacturers, as the idea is that the update of each token can only be performed by authorized workshops appointed by the manufacturer. Therefore, if you want to keep your token up to date, you must visit them.

For this, we implemented a whitelist system to regulate access to specific smart contract functions. For example, only authorized manufacturers will be able to execute the token creation function, and only authorized workshops associated with each manufacturer will have editing privileges for tokens.

But why would you want to keep it updated as a vehicle owner and token holder? Because when it comes time to sell the vehicle, if all the maintenance has been performed on time, the potential buyer can verify that information on our platform. Additionally, the recorded repairs will guarantee that they were carried out with quality approved by the manufacturer. This is a great way to demonstrate the vehicle's integrity.

Our service operates by creating an NFT identified by the VIN and containing information about the vehicle, such as the brand, model, manufacturing date, performed maintenance, mileage, etc.

## How we built it
The code has been divided into two main directories for better organization during development.

- The front-end is a project created with React and Next.js, using the Chakra UI library for design. To interact with the smart contract, we utilize Ether.js.

- The backend consists of the Express framework, which we use to simulate a third-party API (government, state entities, or law enforcement). This API allows us to modify the token's state based on the obtained data. For example, if a vehicle has received a fine, we can update the token to indicate that it has at least one penalty. Additionally, the backend includes the development environment for the smart contract using Hardhat. The smart contract, AutoPassport, is implemented within this directory.

## Challenges we ran into
We are a team composed of members who were unfamiliar with smart contract development and had limited experience in software development. Therefore, we faced several challenges throughout the 6-week hackathon. Our challenges included learning the Solidity programming language, deploying a contract, interacting with it from the front-end using Ethers, and later incorporating the Hardhat environment and Chainlink services.

Despite our initial lack of expertise, we were determined to overcome these obstacles. We dedicated time to study Solidity and understand its syntax and concepts. We researched deployment strategies and learned how to configure and deploy contracts successfully. Interacting with the contract from the front-end involved integrating the Ethers library and understanding how to call contract functions and retrieve data.

As we progressed, we delved into the Hardhat development environment, which provided us with powerful tools for testing, debugging, and deploying contracts. Additionally, we explored the capabilities of Chainlink to connect our contract with real-world data sources, enhancing the functionality and reliability of our project.

Throughout this journey, we relied on extensive documentation, online resources, and community support to overcome each challenge. It was a rewarding experience to see our team grow and develop new skills in smart contract development and software engineering.

Another significant challenge we overcame was the utilization of the Piñata API. This tool was crucial for storing metadata on IPFS and subsequently sending it as a URI to be stored in the smart contract.

Lastly, we faced the challenge of learning how to use Chainlink. After extensive study and hard work, we successfully managed to interact with the Chainlink libraries by making API calls to retrieve information about traffic fines based on the vehicle's VIN.

These challenges pushed us to expand our knowledge and skill set, and we are proud of the solutions we developed to overcome them. Through perseverance and a collaborative effort, we were able to integrate these technologies into our project and create a functional system.

## Accomplishments that we're proud of and what we learned
- Achieving the functionality of our application prototype, ensuring that we can successfully create NFTs, modify them, and display them on our platform.
- Gaining a comprehensive understanding of the workflows involved in applications that interact with Web 3 through smart contracts.
- Mastering the fundamentals of Solidity and grasping the structure of a smart contract.

These accomplishments allowed us to overcome the initial challenges we faced and demonstrate our ability to develop a functional and efficient application within the given timeframe. By acquiring knowledge in areas such as smart contract development, Web 3 interactions, and Solidity programming, we strengthened our technical skills and expanded our understanding of blockchain technologies.

## What's next for AutoPassport
We will continue working to improve the platform through evolutionary changes. Some of the areas we aim to focus on include:

Code Optimization: Enhancing the codebase by implementing best practices and researching more efficient ways to perform existing functions. This includes optimizing gas usage, memory management, and execution time. We will also explore techniques to improve overall code quality and maintainability.

Self-hosted IPFS Node: Setting up our own IPFS node to manage metadata storage. Implementing IPNS will provide a fixed URI for each token, ensuring their availability and stability.

Expanded Chainlink Integration: Adding more services from Chainlink to enhance existing functionality and introduce new features to the platform. This will allow us to leverage the power of decentralized oracles for reliable and real-time data.

Improved User Experience: Enhancing the user experience, particularly for token creation. Considering that vehicle manufacturers produce thousands of units per day, we aim to automate or streamline this process to cater to industrial-scale operations. Simplifying the onboarding process and providing intuitive interfaces will be key priorities.

Business Model Development: Continuously refining our business model to ensure sustainability and profitability. This involves exploring new revenue streams, evaluating potential partnerships, and identifying opportunities for monetization within the platform.

Community, Marketing, and Sales: Building an active and engaged community around AutoPassport through various channels such as social media, forums, and educational content. Developing a comprehensive marketing strategy to increase brand visibility and attract a wider user base. Strengthening our sales efforts to acquire international clients and secure funding for further growth.

Our ultimate goal is to bring the benefits of Web 3 to the automotive industry on a global scale. By prioritizing platform improvements, refining our business model, fostering a vibrant community, and expanding our reach, we aim to secure funding, establish partnerships with international manufacturers, and deliver the advantages of Web 3 technology to automotive factories worldwide.


