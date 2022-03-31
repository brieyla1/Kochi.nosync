/**
 * Code by ~Xipzer
 */

import React from 'react'
import { Center, SimpleGrid, Box, Image } from '@chakra-ui/react'
import Background from './Assets/background.png'
import Title from './Assets/logo.png'
import { Generator } from "./Forms/Generator";
import './index.css'


function App()
{
    const appStyle =
    {
        backgroundColor: 'black',
        backgroundImage: `url(${Background})`,
        width:'100vw',
        height: '100vh',
        zIndex:'-1',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position:'fixed',
        overflowY:'auto',
        fontFamily:'Mukta',
        fontWeight:'1000'
    }

    return (
        <>
            <div style={appStyle}>
                <SimpleGrid columns={1} spacingX={1} spacingY={1} height="100%">
                    <Center
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Box
                            display="flex"
                            borderRadius="lg"
                            border={1}
                            overflow="visible"
                            justifyContent="flex-start"
                            flexDirection="column"
                            alignItems="stretch"
                            p={5}
                            ml={5}
                            mr={5}
                            mt={5}
                        >
                            <Box>
                                <Center>
                                    <Image src={Title} maxH='150px' marginBottom='30px' />
                                </Center>
                            </Box>
                            <Generator />
                        </Box>
                    </Center>
                </SimpleGrid>
            </div>
        </>
    );
}

export default App;
