const pinningFileToIPFS = async () => {
  const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NzE1YmE3OS1lNmY3LTRiZDgtOTUyZi02YTliMTI3ZDEzOTQiLCJlbWFpbCI6ImZyYW5jb3JvYi5nYXJjaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImVjZDJlYzNmYWM2MTcxNmU5OTEyIiwic2NvcGVkS2V5U2VjcmV0IjoiNjY0MGIzYzA3NzYwZTllMjMwOWEwZDVhZTAwMmRjMzYxYWFmZDM3NmM5Mjk0MDcyMWRkODA2ODBhNzFjOTNlYyIsImlhdCI6MTY4NTE1MzMxNn0.46qZ9W_SMH1D6rN084BG4LbhrfjCfosJK86He4p4fl8'

  const formData = new FormData();
  formData.append('file', formValues.file);
  const metadata = JSON.stringify({
    name: 'AutoPassport',
  });
  formData.append('pinataMetadata', metadata);
  const options = JSON.stringify({
    cidVersion: 0,
  })
  formData.append('pinataOptions', options);

  let ipfsHash;
  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS/", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: JWT
      }
    });
    console.log('IPFS File load succesfully');
    const pinataUrl = 'https://gateway.pinata.cloud/ipfs/'
    ipfsHash = pinataUrl + res.data.IpfsHash;
  } catch (error) {
    console.log('Error fetching IPFS file: ', error);
  }
  return ipfsHash;
}