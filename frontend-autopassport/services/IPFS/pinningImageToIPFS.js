import axios from 'axios';

export const pinningImageToIPFS = async (file, PINATA_JWT) => {
  let ipfsUrl;
  const formData = new FormData();

  formData.append('file', file);
  const metadata = JSON.stringify({
    name: 'tokenImage',
  });
  formData.append('pinataMetadata', metadata);
  const options = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', options);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS/", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: PINATA_JWT
      }
    });
    console.log('IPFS image load succesfully');
    ipfsUrl = 'ipfs://' + res.data.IpfsHash;
  } catch (error) {
    console.log('Error fetching IPFS file: ', error);
  }
  return ipfsUrl;
}