'use client'
import { Stack, Flex, Button, Text, VStack, Image, Box, Center, IconButton, Skeleton, Spinner } from '@chakra-ui/react'
import TransImageDown from "../asset/down-overlay.png"
import { useEffect, useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring';
import { CloseIcon } from '@chakra-ui/icons'
import json_config from '../asset/config.json';
import toast from 'react-hot-toast';

const _items = [
    {
        title: 'CHICKEN MERGE & WAR',
        image: 'https://testnet.mushiclub.app/banner/flappybird-thumb.jpg',
        subtitle: "Flappy Bird",
        subdescribe: "Flappy Bird: RollApp Edition - where superhero birds take flight! Dodge obstacles, battle villains, and flap to victory. Fly as Iron Bird, Captain Flutter, or Hawkeye Fly. Prepare for laughs and epic avian adventures!",
        subimage: "https://i.postimg.cc/7ZyDKM5s/chicken-war-3-D.webp",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Play Now wfwaf",
        iframe:`<iframe frameborder="0" src="https://itch.io/embed-upload/11556075?color=333333" allowfullscreen="" width="640" height="380"><a href="https://vnbnodegamefi.itch.io/chicken-war-game-dymension-3d">Play Chicken War Game - Dymension 3D on itch.io</a></iframe>`
    },
    {
        title: 'Flappy Bird 1',
        image: 'https://testnet.mushiclub.app/banner/flappybird-thumb.jpg',
        subtitle: "Flappy Bird 1",
        subdescribe: "Flappy Bird: RollApp Edition - where superhero birds take flight! Dodge obstacles, battle villains, and flap to victory. Fly as Iron Bird, Captain Flutter, or Hawkeye Fly. Prepare for laughs and epic avian adventures!",
        subimage: "https://testnet.mushiclub.app/banner/blackjack.jpg",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Play Now afaf",
        iframe:`<iframe frameborder="0" src="https://itch.io/embed-upload/11556075?color=333333" allowfullscreen="" width="640" height="380"><a href="https://vnbnodegamefi.itch.io/chicken-war-game-dymension-3d">Play Chicken War Game - Dymension 3D on itch.io</a></iframe>`
    },
]
const HorizontalNav = ({ currentIndex, setCurrentIndex, items }) => {
    const maxItemsToShow = 4;
    const itemRefs = useRef([]);

    useEffect(() => {
        if (itemRefs.current[currentIndex]) {
            itemRefs.current[currentIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }, [currentIndex]);

    return (
        
        <Flex alignItems="end" bottom={"0px"} justifyContent="center" mb={4} w="full" position="fixed" zIndex={3}>
            <Button
                onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)}
                isDisabled={currentIndex === 0}
            >
                &lt;
            </Button>
            <Flex
                w="full"
                overflow="hidden"
                justifyContent="flex-start"
                p={2}
            >
                <Stack direction="row" spacing={0} w="full" flexWrap="nowrap">
                    {items.map((item, index) => (
                        <Box
                            key={index}
                            ref={(el) => (itemRefs.current[index] = el)}
                            flexShrink={0} // Ngăn các mục co lại
                            width={`${100 / Math.min(items.length, maxItemsToShow)}%`} // Đặt chiều rộng cho các mục
                            bg={index === currentIndex ? 'gray.900' : 'black.300'}
                            color={index === currentIndex ? 'white' : 'white'}
                            borderRadius="md"
                            onClick={() => setCurrentIndex(index)}
                            cursor="pointer"
                            transition="background 0.2s"
                            padding={2}
                        >
                            <Flex alignItems="center" justifyContent="center">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    boxSize="50px"
                                    objectFit="cover"
                                    borderRadius="full"
                                    mr={2}
                                />
                                <Text display={{ base: 'none', md: 'block' }}>{item.title}</Text> {/* Show text only on md screens and up */}
                            </Flex>
                        </Box>
                    ))}
                </Stack>
            </Flex>
            <Button
                onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)}
                isDisabled={currentIndex >= items.length - 1}
            >
                &gt;
            </Button>
        </Flex>
    );
};

export default function WithBackgroundImage() {
    const [items, setItems] = useState(_items);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentItem, setCurrentItem] = useState(_items[0]);
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const [iframeContent, setIframeContent] = useState('');

    const fadeInProps = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(20px)' },
        reset: true,
        config: { duration: 500 },
    });

    const imageProps = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0.6, transform: 'translateY(10px)' },
        reset: true,
        config: { duration: 1000 },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(json_config.url + '/games');
                const data = await response.json();
                setItems(data);
                setCurrentItem(data[0]);
                setCurrentIndex(0);
                localStorage.setItem('gameListCache', JSON.stringify(data));
            } catch (error) {
               
                toast.error(String(error))
                let cache_data=localStorage.getItem('gameListCache');
                if (cache_data){
                    let data=JSON.parse(cache_data)
                    setItems(data);
                    setCurrentItem(data[0]);
                    setCurrentIndex(0);
                }
              
                
            }
        }

        // fetchData();
    }, []);

    useEffect(() => {
        setCurrentItem(items[currentIndex]);
    }, [currentIndex, items]);

    if (!currentItem) {
        return <Stack align={"center"}>
            
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
            <Text as='sup' padding={"13px"}></Text>
        </Stack>;
    }

    const handleButtonClick = () => {
        setIframeContent(currentItem.iframe);
        setIsBoxVisible(true);
    };

    return (
        <Flex
            w={'full'}
            h={'90vh'}
            position="fixed"
            backgroundSize={"cover"}
            backgroundPosition={'center center'}
        > 
            <Box
                width={"100vw"}
                alignContent={"center"}
                height={"100vh"}
                background={"rgba(0, 0, 0, 0.86)"}
                top={"0px"}
                zIndex={10}
                position={"fixed"}
                display={isBoxVisible ? "block" : "none"} // Conditionally render the box
            >
                <IconButton position={"fixed"} left={"0px"} top={"0px"}
                    variant='outline'
                    colorScheme='teal'
                    aria-label='Close'
                    icon={<CloseIcon />}
                    onClick={() => {
                        setIsBoxVisible(false)
                    }}
                />
                <Center>
                    <Box
                        dangerouslySetInnerHTML={{ __html: iframeContent }} // Render the iframe content
                    />
                </Center>
            </Box>

            <animated.div
                style={{
                    ...imageProps,
                    position: 'absolute',
                    bottom: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    backgroundImage: `url(${currentItem.subimage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}
            />
            <Image
                position="absolute"
                bottom="0"
                height={"100%"}
                width={"100%"}
                src={TransImageDown}
                zIndex={2}
                opacity={1}
            />
            <VStack
                position="absolute"
                bottom={{ base: "10%", xl: "3%" }}
                left="50%"
                transform="translate(-50%, -50%)"
                w={'full'}
                px={4} zIndex={2}
            >
                <Stack maxW={'3xl'} width={"70%"}>
                    <animated.div style={fadeInProps}>
                        <Text
                            color={"wheat"}
                            fontWeight={500}
                            lineHeight={1.5}
                            fontSize={{ base: "2xl", xl: "3xl" }}
                            style={{
                                textShadow: '2px 3px 4px rgba(0, 0, 0, 1)',
                            }}
                        >
                            {currentItem.title}
                        </Text>
                        
                        <Text
                            color={"gray.200"}
                            lineHeight={1.4}
                            fontSize={{ base: "m", xl: "xl" }}
                            style={{
                                textShadow: '2px 3px 4px rgba(0, 0, 0, 1)',
                            }}
                        >
                            {currentItem.subdescribe}
                        </Text>
                    </animated.div>
                    <Button
                        width={"40%"}
                        alignSelf={"center"}
                        background={"#ca2626"}
                        w={"60%"}
                        size='md'
                        borderRadius={"full"}
                        border='4px'
                        borderColor='#ffa00b'
                        fontWeight={"500px"}
                        fontSize={"23px"}
                        _hover={"none"}
                        onClick={handleButtonClick}
                    >
                        {currentItem.text_button}
                    </Button>
                </Stack>
            </VStack>
            {/* Pass items and currentIndex to HorizontalNav */}

            <HorizontalNav currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} items={items} />
            
        </Flex>
    );
}
