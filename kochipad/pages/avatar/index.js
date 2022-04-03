import React from 'react';

import {
  ChakraProvider,
  extendTheme,
  Center,
  SimpleGrid,
  Box,
  Image,
  Button,
  Divider,
  Heading,
  Select,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import traits from './traits.json';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
});

function AvatarGenerator() {
  const filePhotoRef = React.useRef();
  const canvasRef = React.useRef(null);

  const [selectedTrait, setSelectedTrait] = React.useState(
    Object.keys(traits).map((key) => ({ key, value: traits[key][0] }))
  );

  function updateTrait(trait, value) {
    setSelectedTrait(selectedTrait.map((t) => (t.key === trait ? { key: t.key, value } : t)));
    // generateAvatar();
  }

  function createOptions(trait, index) {
    return (
      <>
        <Box>
          <Text fontSize="md" color="#ffffff">
            {trait}
          </Text>
        </Box>
        <Box key={index} md={5}>
          <Select
            {...styles.selectBox}
            onChange={(e) => {
              updateTrait(trait, e.target.value);
            }}
          >
            {Object.keys(traits[trait]).map((value) => (
              <option value={value}>{traits[trait][value]}</option>
            ))}
          </Select>
        </Box>
      </>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <div style={styles.appStyle}>
        <SimpleGrid columns={1} spacingX={1} spacingY={1} height="100%">
          <Center display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
            <Box {...styles.mainBox}>
              <Box>
                <Center>
                  <Image src="assets/avatar-generator/title.png" maxH="150px" marginBottom="30px" />
                </Center>
              </Box>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'row wrap',
                  borderRadius: 'lg',
                  border: '1px',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  width: 'auto',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    borderRadius: 'lg',
                    border: '1px',
                    justifyContent: 'center',
                    flexDirection: 'wrap',
                    alignItems: 'stretch',
                  }}
                >
                  <div>
                    <Box
                      p={6}
                      m={2}
                      minWidth={300}
                      maxWidth={300}
                      minHeight={550}
                      style={{
                        'border-image-source':
                          'linear-gradient(90deg, rgba(255,109,23,1) 0%, rgba(254,241,23,1) 50%, rgba(255,109,23,1) 100%)',
                        'border-image-slice': '1',
                      }}
                      borderWidth="1px"
                      boxShadow="0px 0px 30px #000"
                      bg="rgba(20, 20, 20, 0.80)"
                    >
                      <Box>
                        <Heading as="h2" size="lg" color="#ffffff">
                          Customization
                        </Heading>
                      </Box>
                      <Box mb={2}>
                        <Heading size="md" color="#ff6d17">
                          Customize Your Avatar
                        </Heading>
                        <Divider borderColor="#ffffff" mt={1} />
                      </Box>
                      <Text fontSize="sm" color="#ffffff" mb={5}>
                        Join The Kochi Clan Today! Generate your own custom profile picture and wear it on all your
                        socials!
                      </Text>
                      {Object.keys(traits)
                        .slice(0, 3)
                        .map((traits, index) => createOptions(traits, index))}
                    </Box>
                  </div>
                  <div>
                    <Box {...styles.canvasBox}>
                      <Box>
                        <Heading as="h2" size="lg" color="#ffffff">
                          View
                        </Heading>
                      </Box>
                      <Box mb={5}>
                        <Heading size="md" color="#ff6d17">
                          View Your Avatar
                        </Heading>
                        <Divider borderColor="#ffffff" mt={1} />
                      </Box>
                      <canvas ref={canvasRef} width="512" height="512" style={{ transform: 'scale(0.7)' }} />
                    </Box>
                  </div>
                  <div>
                    <Box
                      p={6}
                      m={2}
                      minWidth={300}
                      maxWidth="100%"
                      minHeight={550}
                      style={{
                        'border-image-source':
                          'linear-gradient(90deg, rgba(255,109,23,1) 0%, rgba(254,241,23,1) 50%, rgba(255,109,23,1) 100%)',
                        'border-image-slice': '1',
                      }}
                      borderWidth="1px"
                      boxShadow="0px 0px 30px #000"
                      bg="rgba(20, 20, 20, 0.80)"
                    >
                      {/* the rest of the traits */}
                      {Object.keys(traits)
                        .slice(3)
                        .map((traits, index) => createOptions(traits, index))}

                      {/* download and other custom buttons */}
                      <Box mb={4} display="flex" justifyContent="center" alignItems="center" mt={10}>
                        <input type="file" style={{ display: 'none' }} onChange={onUploadPhoto} ref={filePhotoRef} />
                        <Button
                          {...styles.button}
                          _hover={{ filter: 'brightness(130%)' }}
                          onClick={() => uploadCustom()}
                        >
                          (Opt.) Custom Photo
                        </Button>
                      </Box>
                      <Box mb={4} display="flex" justifyContent="center" alignItems="center" mt={10}>
                        <Button
                          {...styles.button}
                          _hover={{
                            filter: 'brightness(130%)',
                          }}
                          onClick={() => {
                            download();
                          }}
                        >
                          Download
                        </Button>
                      </Box>
                      <Box mb={4} display="flex" justifyContent="center" alignItems="center">
                        <Button
                          {...styles.button}
                          _hover={{
                            filter: 'brightness(130%)',
                          }}
                          onClick={() => {
                            setRandom();
                            generate();
                          }}
                        >
                          Randomize
                        </Button>
                      </Box>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <Button
                          {...styles.button}
                          _hover={{
                            filter: 'brightness(130%)',
                          }}
                          onClick={() => {
                            reset();
                            generate();
                          }}
                        >
                          Reset
                        </Button>
                      </Box>
                    </Box>
                  </div>
                </div>
              </div>
            </Box>
          </Center>
        </SimpleGrid>
      </div>
    </ChakraProvider>
  );

  function onUploadPhoto(event) {
    if (event.target.files.length > 0) {
      let img = event.target.files[0];
      customPicture = new Image();
      customPicture.src = URL.createObjectURL(img);
      generate();
    }
  }
}

// reduce repetition
const styles = {
  mainBox: {
    display: 'flex',
    borderRadius: 'lg',
    border: 1,
    overflow: 'visible',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'stretch',
    p: 5,
    ml: 5,
    mr: 5,
    mt: 5,
  },
  appStyle: {
    backgroundColor: 'black',
    backgroundImage: `url('assets/avatar-generator/background.png')`,
    width: '100vw',
    height: '100vh',
    zIndex: '-1',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'fixed',
    overflowY: 'auto',
    fontFamily: 'Mukta',
    fontWeight: '1000',
  },
  canvadBox: {
    p: 6,
    m: 2,
    minWidth: 300,
    maxWidth: '100%',
    minHeight: 550,
    style: {
      'border-image-source':
        'linear-gradient(90deg, rgba(255,109,23,1) 0%, rgba(254,241,23,1) 50%, rgba(255,109,23,1) 100%)',
      'border-image-slice': '1',
    },
    borderWidth: '1px',
    boxShadow: '0px 0px 30px #000',
    bg: 'rgba(20, 20, 20, 0.80)',
  },
  selectBox: {
    icon: <ChevronDownIcon />,
    variant: 'outline',
    size: 'md',
    color: '#fff',
    iconColor: '#ff6d17',
    borderColor: '#ffffff',
    focusBorderColor: '#ff6d17',
  },
  button: {
    variant: 'solid',
    size: 'md',
    textAlign: 'left',
    display: 'flex',
    minWidth: 250,
    color: 'black',
    textTransform: 'uppercase',
    background:
      'linear-gradient(180deg, rgba(254,241,23,0.9808298319327731) 0%, rgba(255,109,23,0.958420868347339) 70%)',
    transition: '0.3s all',
  },
};

AvatarGenerator.metadata = {
  hidePanel: true,
};

export default AvatarGenerator;
