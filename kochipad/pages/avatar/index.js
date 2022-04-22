import React, { useEffect } from "react";

import { ChakraProvider, extendTheme, Center, SimpleGrid, Box, Button, Divider, Heading, Select, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import traits from "./traits.json";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

const imageDimensionsX = 512;
const imageDimensionsY = 512;
const customPicturePadding = 15;

let current_traits = {};

function AvatarGenerator() {
  const filePhotoRef = React.useRef();
  const canvasRef = React.useRef(null);

  // selected trait: {trait: index}
  // traits object: {trait: {name: string}}}
  const [selectedTrait, setSelectedTrait] = React.useState({});
  const [customPicture, setCustomPicture] = React.useState(null);

  function updateTrait(trait, value) {
    setSelectedTrait({
      ...selectedTrait,
      [trait]: value,
    });
  }

  useEffect(() => {
    randomizeTraits();
  }, []);

  useEffect(() => {
    generateAvatar();
  }, [selectedTrait, customPicture]);

  async function generateAvatar() {
    // wait for file to be loaded using a resolve promise
    const loadImage = (trait) =>
      new Promise((resolve, reject) => {
        let img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => resolve(img);
        if (selectedTrait[trait] != undefined) {
          img.src = "assets/avatar-generator/traits/" + selectedTrait[trait] + ".png";
        }
      });

    // load all images
    for (let trait in traits) current_traits[trait] = await loadImage(trait);

    // update canvas
    buildAvatar();
  }

  function buildAvatar() {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, imageDimensionsX, imageDimensionsY);

    if (customPicture !== null) {
      context.drawImage(
        customPicture,
        customPicturePadding,
        customPicturePadding,
        imageDimensionsX - customPicturePadding,
        imageDimensionsY - customPicturePadding
      );
      context.globalCompositeOperation = "destination-in";

      context.fillStyle = "#000";
      context.beginPath();
      context.arc(
        imageDimensionsX * 0.5, // x
        imageDimensionsY * 0.5, // y
        (imageDimensionsX - customPicturePadding) * 0.5, // radius
        0, // start angle
        2 * Math.PI // end angle
      );
      context.fill();
      context.globalCompositeOperation = "source-over";

      context.drawImage(current_traits["Circle"], 0, 0, imageDimensionsX, imageDimensionsY);
    } else {
      for (const trait in traits) context.drawImage(current_traits[trait], 0, 0, imageDimensionsX, imageDimensionsY);
    }

    context.width = imageDimensionsX;
    context.height = imageDimensionsY;
  }

  function createOptions(trait, index) {
    return (
      <div key={index}>
        <Box>
          <Text fontSize="md" color="#ffffff">
            {trait}
          </Text>
        </Box>
        <Box key={index} md={5}>
          <Select
            {...styles.selectBox}
            value={selectedTrait[trait]}
            onChange={(e) => {
              updateTrait(trait, e.target.value);
            }}
          >
            {Object.keys(traits[trait]).map((value, i) => (
              <option key={i} value={value}>
                {traits[trait][value]}
              </option>
            ))}
          </Select>
        </Box>
      </div>
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
                  <img src="assets/avatar-generator/logo.png" />
                </Center>
              </Box>
              <div
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  borderRadius: "lg",
                  border: "1px",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "stretch",
                  width: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    borderRadius: "lg",
                    border: "1px",
                    justifyContent: "center",
                    flexDirection: "wrap",
                    alignItems: "stretch",
                  }}
                >
                  <div>
                    <Box {...styles.sidepanel}>
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
                        Join The Kochi Clan Today! Generate your own custom profile picture and wear it on all your socials!
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
                      <canvas ref={canvasRef} width="512" height="512" style={{ transform: "scale(0.7)" }} />
                    </Box>
                  </div>
                  <div>
                    <Box {...styles.sidepanel}>
                      {/* the rest of the traits */}
                      {Object.keys(traits)
                        .slice(3)
                        .map((traits, index) => createOptions(traits, index))}

                      {/* download and other custom buttons */}
                      <Box mb={4} display="flex" justifyContent="center" alignItems="center" mt={10}>
                        <input type="file" style={{ display: "none" }} onChange={onUploadPhoto} ref={filePhotoRef} />
                        <Button {...styles.button} _hover={{ filter: "brightness(130%)" }} onClick={() => filePhotoRef.current.click()}>
                          (Opt.) Custom Photo
                        </Button>
                      </Box>
                      <Box mb={4} display="flex" justifyContent="center" alignItems="center" mt={10}>
                        <Button {...styles.button} onClick={() => download()}>
                          Download
                        </Button>
                      </Box>
                      <Box mb={4} display="flex" justifyContent="center" alignItems="center">
                        <Button {...styles.button} onClick={() => randomizeTraits()}>
                          Randomize
                        </Button>
                      </Box>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <Button {...styles.button} onClick={() => randomizeTraits()}>
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
      let _img = event.target.files[0];
      const img = new Image();
      img.src = URL.createObjectURL(_img);

      setCustomPicture(img);
    }
  }

  function randomizeTraits() {
    setCustomPicture(null);

    // randomize all traits
    const randomTraits = {};
    Object.keys(traits).forEach((trait) => {
      const randomTrait = Object.keys(traits[trait])[Math.floor(Math.random() * Object.keys(traits[trait]).length)];
      randomTraits[trait] = randomTrait;
    });

    setSelectedTrait(randomTraits);
  }

  function download() {
    try {
      const link = document.createElement("a");

      link.download = "KochiKen_Avatar.png";
      link.href = canvasRef.current.toDataURL();

      link.click();
    } catch (error) {
      console.log("Please Refresh Your Page.");
    }
  }
}

// reduce repetition
const styles = {
  mainBox: {
    display: "flex",
    borderRadius: "lg",
    border: 1,
    overflow: "visible",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "stretch",
    p: 5,
    ml: 5,
    mr: 5,
    mt: 5,
  },
  appStyle: {
    backgroundColor: "black",
    backgroundImage: `url('assets/avatar-generator/background.png')`,
    width: "100vw",
    height: "100vh",
    zIndex: "-1",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "fixed",
    overflowY: "auto",
    fontFamily: "Mukta",
    fontWeight: "1000",
  },
  canvadBox: {
    p: 6,
    m: 2,
    minWidth: 300,
    maxWidth: "100%",
    minHeight: 550,
    style: {
      borderImageSource: "linear-gradient(90deg, rgba(255,109,23,1) 0%, rgba(254,241,23,1) 50%, rgba(255,109,23,1) 100%)",
      borderImageSlice: "1",
    },
    borderWidth: "1px",
    boxShadow: "0px 0px 30px #000",
    bg: "rgba(20, 20, 20, 0.80)",
  },
  selectBox: {
    icon: <ChevronDownIcon />,
    variant: "outline",
    size: "md",
    color: "#fff",
    iconColor: "#ff6d17",
    borderColor: "#ffffff",
    focusBorderColor: "#ff6d17",
  },
  button: {
    variant: "solid",
    size: "md",
    textAlign: "left",
    display: "flex",
    minWidth: 250,
    color: "black",
    textTransform: "uppercase",
    background: "linear-gradient(180deg, rgba(254,241,23,0.9808298319327731) 0%, rgba(255,109,23,0.958420868347339) 70%)",
    transition: "0.3s all",
    _hover: {
      filter: "brightness(130%)",
    },
  },
  sidepanel: {
    p: 6,
    m: 2,
    minWidth: 300,
    maxWidth: 300,
    minHeight: 550,
    style: {
      borderImageSource: "linear-gradient(90deg, rgba(255,109,23,1) 0%, rgba(254,241,23,1) 50%, rgba(255,109,23,1) 100%)",
      "borderImageSlice?": "1",
    },
    borderWidth: "1px",
    boxShadow: "0px 0px 30px #000",
    bg: "rgba(20, 20, 20, 0.80)",
  },
};

AvatarGenerator.metadata = {
  hidePanel: true,
};

export default AvatarGenerator;
