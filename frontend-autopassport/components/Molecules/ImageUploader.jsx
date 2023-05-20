import React, { useRef, useState } from 'react';
import { Button, FormControl, FormLabel, Stack, Center, Avatar  } from '@chakra-ui/react'

function ImageUploader() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormControl id="userName">
      <FormLabel>Vehicle Image</FormLabel>
      <Stack direction={['column', 'row']} spacing={6}>
        <Center>
          <Avatar size="xl" src={selectedImage ? selectedImage : 'https://gateway.pinata.cloud/ipfs/QmcR6pJ4wMbp1JvSAWfDgkE8cehh9vZQkj7Vthe9sMEwFH'} alt="Preview"/>
        </Center>
        <Center w="full">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <Button w="full" onClick={handleButtonClick}>Select image</Button>
        </Center>
      </Stack>
    </FormControl>
  );
}

export default ImageUploader;
