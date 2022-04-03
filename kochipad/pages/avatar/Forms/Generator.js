/**
 * Code by ~Xipzer
 */

import React, { useEffect, useRef } from 'react';
import { Box, Button, Divider, Heading, Select, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import traits from './traits.json';

const imageDimensionsX = 512;
const imageDimensionsY = 512;
const customPicturePadding = 15;

let customPicture = null;

const choices = new Array(6).fill(0);

export function AvatarGenerator() {
  background;
  circle;
  body;
  mouth;
  eye;
  outfit;

  canvas;
  context;

  this.filePhotoRef = useRef(null);

  canvas = useRef(null);
  context = this.canvas.current.getContext('2d');

  function generate() {
    for (trait in traits.keys()) this[trait] = new Image();

    const current_traits = [background, circle, body, mouth, eye, outfit];

    for (let i = 0; i < current_traits.length; i++) {
      current_traits[i].onload = function () {};
      current_traits[i].setAttribute('crossOrigin', 'anonymous');
      current_traits[i].src = traits[i][choices[i]];
    }

    setTimeout(function () {
      buildAvatar();
    }, 100);
  }

  function buildAvatar() {
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
  }

  function setRandom() {
    for (let i = 0; i < choices.length; i++) choices[i] = Math.floor(Math.random() * traits[i].length);
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
                {traits.backgrounds.map((outfit, index) => (
                  <option value={index} style={{ color: 'black' }}>
                    {outfit.name}
                  </option>
                ))}
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
                {traits.bodies.map((outfit, index) => (
                  <option value={index} style={{ color: 'black' }}>
                    {outfit.name}
                  </option>
                ))}
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
            <canvas ref={this.canvas} id="canvas" width="512" height="512" style={{ transform: 'scale(0.7)' }} />
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
                {traits.mouth.map((outfit, index) => (
                  <option value={index} style={{ color: 'black' }}>
                    {outfit.name}
                  </option>
                ))}
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
                {traits.eyes.map((outfit, index) => (
                  <option value={index} style={{ color: 'black' }}>
                    {outfit.name}
                  </option>
                ))}
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
                {traits.outfits.map((outfit, index) => (
                  <option value={index} style={{ color: 'black' }}>
                    {outfit.name}
                  </option>
                ))}
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
}
