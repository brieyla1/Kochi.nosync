/**
 * Code by ~Xipzer
 */

import React, { useEffect, useRef } from 'react';
import { Box, Button, Divider, Heading, Select, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { backgrounds, circles, bodies, mouths, eyes, outfits } from '../Assets/Images';

const imageDimensionsX = 512;
const imageDimensionsY = 512;
const customPicturePadding = 15;

let canvas, context;
let background, circle, body, mouth, eye, outfit;
let customPicture = null;

const layerss = [backgrounds, circles, bodies, mouths, eyes, outfits];
const choices = new Array(6).fill(0);

export const Generator = () => {
  const filePhotoRef = useRef(null);

  useEffect(() => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    reset();
    generate();
  });

  function generate() {
    background = new Image();
    circle = new Image();
    body = new Image();
    mouth = new Image();
    eye = new Image();
    outfit = new Image();

    const layers = [background, circle, body, mouth, eye, outfit];

    for (let i = 0; i < layers.length; i++) {
      layers[i].onload = function () {};
      layers[i].setAttribute('crossOrigin', 'anonymous');
      layers[i].src = layerss[i][choices[i]];
    }

    setTimeout(function () {
      buildAvatar();
    }, 100);
  }

  const buildAvatar = () => {
    context.clearRect(0, 0, imageDimensionsX, imageDimensionsY);

    if (customPicture !== null) {
      context.drawImage(
        customPicture,
        customPicturePadding,
        customPicturePadding,
        imageDimensionsX - customPicturePadding,
        imageDimensionsY - customPicturePadding
      );
      context.globalCompositeOperation = 'destination-in';

      context.fillStyle = '#000';
      context.beginPath();
      context.arc(
        imageDimensionsX * 0.5, // x
        imageDimensionsY * 0.5, // y
        (imageDimensionsX - customPicturePadding) * 0.5, // radius
        0, // start angle
        2 * Math.PI // end angle
      );
      context.fill();
      context.globalCompositeOperation = 'source-over';

      context.drawImage(circle, 0, 0, imageDimensionsX, imageDimensionsY);
    } else {
      context.drawImage(background, 0, 0, imageDimensionsX, imageDimensionsY);
      context.drawImage(body, 0, 0, imageDimensionsX, imageDimensionsY);
      context.drawImage(mouth, 0, 0, imageDimensionsX, imageDimensionsY);
      context.drawImage(eye, 0, 0, imageDimensionsX, imageDimensionsY);
      context.drawImage(outfit, 0, 0, imageDimensionsX, imageDimensionsY);
      context.drawImage(circle, 0, 0, imageDimensionsX, imageDimensionsY);
    }

    context.width = 512;
    context.height = 512;
  };

  function setRandom() {
    for (let i = 0; i < choices.length; i++) choices[i] = Math.floor(Math.random() * layerss[i].length);
  }

  function reset() {
    for (let i = 0; i < choices.length; i++) choices[i] = 0;

    customPicture = null;
  }

  function download() {
    try {
      const link = document.createElement('a');

      link.download = 'Kochiken_Avatar.png';
      link.href = document.getElementById('canvas').toDataURL();

      link.click();
    } catch (error) {
      console.log('Please Refresh Your Page.');
    }
  }

  function uploadCustom() {
    filePhotoRef.current.click();
  }

  function onUploadPhoto(event) {
    if (event.target.files.length > 0) {
      let img = event.target.files[0];
      customPicture = new Image();
      customPicture.src = URL.createObjectURL(img);
      generate();
    }
  }

  return (
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
              Join The Kochi Clan Today! Generate your own custom profile picture and wear it on all your socials!
            </Text>
            <Box>
              <Text fontSize="md" color="#ffffff">
                Background
              </Text>
            </Box>
            <Box mb={5}>
              <Select
                icon={<ChevronDownIcon />}
                variant="outline"
                size="md"
                color="#fff"
                iconColor="#ff6d17"
                borderColor="#ffffff"
                focusBorderColor="#ff6d17"
                onChange={(e) => {
                  choices[0] = parseInt(e.target.value);
                  generate();
                }}
              >
                <option value="0" style={{ color: 'black' }}>
                  Blue
                </option>
                <option value="1" style={{ color: 'black' }}>
                  Bronze
                </option>
                <option value="2" style={{ color: 'black' }}>
                  Brown
                </option>
                <option value="3" style={{ color: 'black' }}>
                  Dark Green
                </option>
                <option value="4" style={{ color: 'black' }}>
                  Dark Purple
                </option>
                <option value="5" style={{ color: 'black' }}>
                  Green
                </option>
                <option value="6" style={{ color: 'black' }}>
                  Light Blue
                </option>
                <option value="7" style={{ color: 'black' }}>
                  Light Green
                </option>
                <option value="8" style={{ color: 'black' }}>
                  Light Purple
                </option>
                <option value="9" style={{ color: 'black' }}>
                  Light Red
                </option>
                <option value="10" style={{ color: 'black' }}>
                  Navy Blue
                </option>
                <option value="11" style={{ color: 'black' }}>
                  Ocean Blue
                </option>
                <option value="12" style={{ color: 'black' }}>
                  Purple
                </option>
                <option value="13" style={{ color: 'black' }}>
                  Red
                </option>
                <option value="14" style={{ color: 'black' }}>
                  Turquoise
                </option>
                <option value="15" style={{ color: 'black' }}>
                  Yellow
                </option>
              </Select>
            </Box>
            <Box>
              <Text fontSize="md" color="#ffffff">
                Border
              </Text>
            </Box>
            <Box mb={5}>
              <Select
                icon={<ChevronDownIcon />}
                variant="outline"
                size="md"
                color="#fff"
                iconColor="#ff6d17"
                borderColor="#ffffff"
                focusBorderColor="#ff6d17"
                onChange={(e) => {
                  choices[1] = parseInt(e.target.value);
                  generate();
                }}
              >
                <option value="0" style={{ color: 'black' }}>
                  🔥 Kochi Clan Member 🔥
                </option>
                <option value="1" style={{ color: 'black' }}>
                  Flat
                </option>
                <option value="2" style={{ color: 'black' }}>
                  Black
                </option>
                <option value="3" style={{ color: 'black' }}>
                  Blue
                </option>
                <option value="4" style={{ color: 'black' }}>
                  Green
                </option>
                <option value="5" style={{ color: 'black' }}>
                  Lime
                </option>
                <option value="6" style={{ color: 'black' }}>
                  Ocean Blue
                </option>
                <option value="7" style={{ color: 'black' }}>
                  Orange
                </option>
                <option value="8" style={{ color: 'black' }}>
                  Pink
                </option>
                <option value="9" style={{ color: 'black' }}>
                  Purple
                </option>
                <option value="10" style={{ color: 'black' }}>
                  Red
                </option>
                <option value="11" style={{ color: 'black' }}>
                  Violet
                </option>
                <option value="12" style={{ color: 'black' }}>
                  Yellow
                </option>
              </Select>
            </Box>
            <Box>
              <Text fontSize="md" color="#ffffff">
                Body
              </Text>
            </Box>
            <Box mb={5}>
              <Select
                icon={<ChevronDownIcon />}
                variant="outline"
                size="md"
                color="#fff"
                iconColor="#ff6d17"
                borderColor="#ffffff"
                focusBorderColor="#ff6d17"
                onChange={(e) => {
                  choices[2] = parseInt(e.target.value);
                  generate();
                }}
              >
                <option value="0" style={{ color: 'black' }}>
                  Black
                </option>
                <option value="1" style={{ color: 'black' }}>
                  Black-White
                </option>
                <option value="2" style={{ color: 'black' }}>
                  Brown
                </option>
                <option value="3" style={{ color: 'black' }}>
                  Fire
                </option>
                <option value="4" style={{ color: 'black' }}>
                  Grey
                </option>
                <option value="5" style={{ color: 'black' }}>
                  Lightgrey-Black
                </option>
                <option value="6" style={{ color: 'black' }}>
                  Purple
                </option>
                <option value="7" style={{ color: 'black' }}>
                  White
                </option>
              </Select>
            </Box>
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
            <canvas id="canvas" width="512" height="512" style={{ transform: 'scale(0.7)' }} />
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
            <Box>
              <Text fontSize="md" color="#ffffff">
                Mouth
              </Text>
            </Box>
            <Box mb={5}>
              <Select
                icon={<ChevronDownIcon />}
                variant="outline"
                size="md"
                color="#fff"
                iconColor="#ff6d17"
                borderColor="#ffffff"
                focusBorderColor="#ff6d17"
                onChange={(e) => {
                  choices[3] = parseInt(e.target.value);
                  generate();
                }}
              >
                <option value="0" style={{ color: 'black' }}>
                  Black 1
                </option>
                <option value="1" style={{ color: 'black' }}>
                  Black 2
                </option>
                <option value="2" style={{ color: 'black' }}>
                  Black 3
                </option>
                <option value="3" style={{ color: 'black' }}>
                  Black 4
                </option>
                <option value="4" style={{ color: 'black' }}>
                  Brown 1
                </option>
                <option value="5" style={{ color: 'black' }}>
                  Brown 2
                </option>
                <option value="6" style={{ color: 'black' }}>
                  Brown 3
                </option>
                <option value="7" style={{ color: 'black' }}>
                  Brown 4
                </option>
                <option value="8" style={{ color: 'black' }}>
                  Grey 1
                </option>
                <option value="9" style={{ color: 'black' }}>
                  Grey 2
                </option>
                <option value="10" style={{ color: 'black' }}>
                  Grey 3
                </option>
                <option value="11" style={{ color: 'black' }}>
                  Grey 4
                </option>
                <option value="12" style={{ color: 'black' }}>
                  Lightgrey 1
                </option>
                <option value="13" style={{ color: 'black' }}>
                  Lightgrey 2
                </option>
                <option value="14" style={{ color: 'black' }}>
                  Lightgrey 3
                </option>
                <option value="15" style={{ color: 'black' }}>
                  Lightgrey 4
                </option>
                <option value="16" style={{ color: 'black' }}>
                  Purple 1
                </option>
                <option value="17" style={{ color: 'black' }}>
                  Purple 2
                </option>
                <option value="18" style={{ color: 'black' }}>
                  Purple 3
                </option>
                <option value="19" style={{ color: 'black' }}>
                  Purple 4
                </option>
                <option value="20" style={{ color: 'black' }}>
                  White 1
                </option>
                <option value="21" style={{ color: 'black' }}>
                  White 2
                </option>
                <option value="22" style={{ color: 'black' }}>
                  White 3
                </option>
                <option value="23" style={{ color: 'black' }}>
                  White 4
                </option>
              </Select>
            </Box>
            <Box>
              <Text fontSize="md" color="#ffffff">
                Eyes
              </Text>
            </Box>
            <Box mb={5}>
              <Select
                icon={<ChevronDownIcon />}
                variant="outline"
                size="md"
                color="#fff"
                iconColor="#ff6d17"
                borderColor="#ffffff"
                focusBorderColor="#ff6d17"
                onChange={(e) => {
                  choices[4] = parseInt(e.target.value);
                  generate();
                }}
              >
                <option value="0" style={{ color: 'black' }}>
                  Black 1
                </option>
                <option value="1" style={{ color: 'black' }}>
                  Black 2
                </option>
                <option value="2" style={{ color: 'black' }}>
                  Black 3
                </option>
                <option value="3" style={{ color: 'black' }}>
                  Black 4
                </option>
                <option value="4" style={{ color: 'black' }}>
                  Brown 1
                </option>
                <option value="5" style={{ color: 'black' }}>
                  Brown 2
                </option>
                <option value="6" style={{ color: 'black' }}>
                  Brown 3
                </option>
                <option value="7" style={{ color: 'black' }}>
                  Brown 4
                </option>
                <option value="8" style={{ color: 'black' }}>
                  Grey 1
                </option>
                <option value="9" style={{ color: 'black' }}>
                  Grey 2
                </option>
                <option value="10" style={{ color: 'black' }}>
                  Grey 3
                </option>
                <option value="11" style={{ color: 'black' }}>
                  Grey 4
                </option>
                <option value="12" style={{ color: 'black' }}>
                  Lightgrey 1
                </option>
                <option value="13" style={{ color: 'black' }}>
                  Lightgrey 2
                </option>
                <option value="14" style={{ color: 'black' }}>
                  Lightgrey 3
                </option>
                <option value="15" style={{ color: 'black' }}>
                  Lightgrey 4
                </option>
                <option value="16" style={{ color: 'black' }}>
                  Purple 1
                </option>
                <option value="17" style={{ color: 'black' }}>
                  Purple 2
                </option>
                <option value="18" style={{ color: 'black' }}>
                  Purple 3
                </option>
                <option value="19" style={{ color: 'black' }}>
                  Purple 4
                </option>
                <option value="20" style={{ color: 'black' }}>
                  White 1
                </option>
                <option value="21" style={{ color: 'black' }}>
                  White 2
                </option>
                <option value="22" style={{ color: 'black' }}>
                  White 3
                </option>
                <option value="23" style={{ color: 'black' }}>
                  White 4
                </option>
              </Select>
            </Box>
            <Box>
              <Text fontSize="md" color="#ffffff">
                Outfit
              </Text>
            </Box>
            <Box mb={5}>
              <Select
                icon={<ChevronDownIcon />}
                variant="outline"
                size="md"
                color="#fff"
                iconColor="#ff6d17"
                borderColor="#ffffff"
                focusBorderColor="#ff6d17"
                onChange={(e) => {
                  choices[5] = parseInt(e.target.value);
                  generate();
                }}
              >
                <option value="0" style={{ color: 'black' }}>
                  Option 1
                </option>
                <option value="1" style={{ color: 'black' }}>
                  Option 2
                </option>
                <option value="2" style={{ color: 'black' }}>
                  Option 3
                </option>
                <option value="3" style={{ color: 'black' }}>
                  Option 4
                </option>
                <option value="4" style={{ color: 'black' }}>
                  Option 5
                </option>
                <option value="5" style={{ color: 'black' }}>
                  Option 6
                </option>
                <option value="6" style={{ color: 'black' }}>
                  Option 7
                </option>
                <option value="7" style={{ color: 'black' }}>
                  Option 8
                </option>
                <option value="8" style={{ color: 'black' }}>
                  Option 9
                </option>
                <option value="9" style={{ color: 'black' }}>
                  Option 10
                </option>
                <option value="10" style={{ color: 'black' }}>
                  Option 11
                </option>
                <option value="11" style={{ color: 'black' }}>
                  Option 12
                </option>
                <option value="12" style={{ color: 'black' }}>
                  Option 13
                </option>
                <option value="13" style={{ color: 'black' }}>
                  Option 14
                </option>
                <option value="14" style={{ color: 'black' }}>
                  Option 15
                </option>
                <option value="15" style={{ color: 'black' }}>
                  Option 16
                </option>
                <option value="16" style={{ color: 'black' }}>
                  Option 17
                </option>
                <option value="17" style={{ color: 'black' }}>
                  Option 18
                </option>
                <option value="18" style={{ color: 'black' }}>
                  Option 19
                </option>
                <option value="19" style={{ color: 'black' }}>
                  Option 20
                </option>
                <option value="20" style={{ color: 'black' }}>
                  Option 21
                </option>
                <option value="21" style={{ color: 'black' }}>
                  Option 22
                </option>
                <option value="22" style={{ color: 'black' }}>
                  Option 23
                </option>
                <option value="23" style={{ color: 'black' }}>
                  Option 24
                </option>
                <option value="24" style={{ color: 'black' }}>
                  Option 25
                </option>
                <option value="25" style={{ color: 'black' }}>
                  Option 26
                </option>
                <option value="26" style={{ color: 'black' }}>
                  Option 27
                </option>
                <option value="27" style={{ color: 'black' }}>
                  Option 28
                </option>
                <option value="28" style={{ color: 'black' }}>
                  Option 29
                </option>
                <option value="29" style={{ color: 'black' }}>
                  Option 30
                </option>
                <option value="30" style={{ color: 'black' }}>
                  Option 31
                </option>
                <option value="31" style={{ color: 'black' }}>
                  Option 32
                </option>
                <option value="32" style={{ color: 'black' }}>
                  Option 33
                </option>
                <option value="33" style={{ color: 'black' }}>
                  Option 34
                </option>
                <option value="34" style={{ color: 'black' }}>
                  Option 35
                </option>
                <option value="35" style={{ color: 'black' }}>
                  Option 36
                </option>
                <option value="36" style={{ color: 'black' }}>
                  Option 37
                </option>
                <option value="37" style={{ color: 'black' }}>
                  Option 38
                </option>
                <option value="38" style={{ color: 'black' }}>
                  Option 39
                </option>
                <option value="39" style={{ color: 'black' }}>
                  Option 40
                </option>
                <option value="40" style={{ color: 'black' }}>
                  Option 41
                </option>
                <option value="41" style={{ color: 'black' }}>
                  Option 42
                </option>
                <option value="42" style={{ color: 'black' }}>
                  Option 43
                </option>
                <option value="43" style={{ color: 'black' }}>
                  Option 44
                </option>
                <option value="44" style={{ color: 'black' }}>
                  Option 45
                </option>
                <option value="45" style={{ color: 'black' }}>
                  Option 46
                </option>
                <option value="46" style={{ color: 'black' }}>
                  Option 47
                </option>
                <option value="47" style={{ color: 'black' }}>
                  Option 48
                </option>
                <option value="48" style={{ color: 'black' }}>
                  Option 49
                </option>
                <option value="49" style={{ color: 'black' }}>
                  Option 50
                </option>
                <option value="50" style={{ color: 'black' }}>
                  Option 51
                </option>
                <option value="51" style={{ color: 'black' }}>
                  Option 52
                </option>
                <option value="52" style={{ color: 'black' }}>
                  Option 53
                </option>
                <option value="53" style={{ color: 'black' }}>
                  Option 54
                </option>
                <option value="54" style={{ color: 'black' }}>
                  Option 55
                </option>
                <option value="55" style={{ color: 'black' }}>
                  Option 56
                </option>
                <option value="56" style={{ color: 'black' }}>
                  Option 57
                </option>
                <option value="57" style={{ color: 'black' }}>
                  Option 58
                </option>
                <option value="58" style={{ color: 'black' }}>
                  Option 59
                </option>
                <option value="59" style={{ color: 'black' }}>
                  Option 60
                </option>
                <option value="60" style={{ color: 'black' }}>
                  Option 61
                </option>
                <option value="61" style={{ color: 'black' }}>
                  Option 62
                </option>
              </Select>
            </Box>
            <Box mb={4} display="flex" justifyContent="center" alignItems="center" mt={10}>
              <input
                type="file"
                id="file"
                name="file"
                style={{ display: 'none' }}
                onChange={onUploadPhoto}
                ref={filePhotoRef}
              />
              <Button
                variant="solid"
                size="md"
                textAlign="left"
                display="flex"
                minWidth={250}
                color="black"
                textTransform="uppercase"
                background="linear-gradient(180deg, rgba(254,241,23,0.9808298319327731) 0%, rgba(255,109,23,0.958420868347339) 70%)"
                transition="0.3s all"
                _hover={{
                  filter: 'brightness(130%)',
                }}
                onClick={() => {
                  uploadCustom();
                }}
              >
                (Opt.) Custom Photo
              </Button>
            </Box>
            <Box mb={4} display="flex" justifyContent="center" alignItems="center" mt={10}>
              <Button
                variant="solid"
                size="md"
                textAlign="left"
                display="flex"
                minWidth={250}
                color="black"
                textTransform="uppercase"
                background="linear-gradient(180deg, rgba(254,241,23,0.9808298319327731) 0%, rgba(255,109,23,0.958420868347339) 70%)"
                transition="0.3s all"
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
                variant="solid"
                size="md"
                textAlign="left"
                display="flex"
                minWidth={250}
                color="black"
                textTransform="uppercase"
                background="linear-gradient(180deg, rgba(254,241,23,0.9808298319327731) 0%, rgba(255,109,23,0.958420868347339) 70%)"
                transition="0.3s all"
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
                variant="solid"
                size="md"
                textAlign="left"
                display="flex"
                minWidth={250}
                color="black"
                textTransform="uppercase"
                background="linear-gradient(0deg, rgba(255,155,23,1) 0%, rgba(255,109,23,0.958420868347339) 100%)"
                transition="0.3s all"
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
  );
};
