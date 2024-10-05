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
        title: 'VNBnode Rollapp',
        image: 'https://cdn.discordapp.com/attachments/1289031386971377684/1291592672938823690/background.jpg?ex=670151a9&is=67000029&hm=b20263c6022a93df44d49afbd10d15613d8eb28acc80bd940d80de6a9681f413&',
        subtitle: "VNBnode Rollapp",
        subdescribe: " Visit our VNBnode's Rollapp to exchange tokens, providing liquidity and staking for more rewards.",
        subimage: "https://cdn.discordapp.com/attachments/1289031386971377684/1291592672938823690/background.jpg?ex=670151a9&is=67000029&hm=b20263c6022a93df44d49afbd10d15613d8eb28acc80bd940d80de6a9681f413&",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Visit",
        // iframe:`<iframe frameborder="0" src="https://itch.io/embed-upload/11556075?color=333333" allowfullscreen="" width="640" height="380"><a href="https://vnbnodegamefi.itch.io/chicken-war-game-dymension-3d">Play Chicken War Game - Dymension 3D on itch.io</a></iframe>`
    },
    {
        title: 'Chicken War',
        image: 'https://cdn.discordapp.com/attachments/1289031386971377684/1290191721421864980/thumb2.png?ex=67017eec&is=67002d6c&hm=b0d091412051576ba1189dea66f94d9b47e38ce7f0fdb9a127efd8195201769f&',
        subtitle: "Chicken War",
        subdescribe: "The village of chickens is attacked by gangs of wolves and zombies. The chickens have to fight for their lives. Please play the game and help the chickens.",
        subimage: "https://cdn.discordapp.com/attachments/1289031386971377684/1290186393145966673/Logo2.png?ex=670179f6&is=67002876&hm=f1898491b2ae58503fd7d11a548b11ba14b37e4fb84ddf3d5ebbd156c06b9814&",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Play Now",
        iframe:`<iframe frameborder="0" src="https://itch.io/embed-upload/11556075?color=333333" allowfullscreen="" width="640" height="380"><a href="https://vnbnodegamefi.itch.io/chicken-war-game-dymension-3d">Play Chicken War Game - Dymension 3D on itch.io</a></iframe>`
    },
    {
        title: 'Tower Defend',
        image: 'https://cdn.discordapp.com/attachments/1289031386971377684/1290191721166278749/thumb1.png?ex=67017eec&is=67002d6c&hm=fb67bb551c9174a129b4f9d3b0c0f2f0f8bb095ca968766f0dcef3255df60d1e&',
        subtitle: "Tower Defend",
        subdescribe: "An ancient tower in the middle of the forest, is being attacked by ferocious beasts, you are the general leading the army, please fight with us.",
        subimage: "https://cdn.discordapp.com/attachments/1289031386971377684/1290191689683697715/banner_2.png?ex=67017ee5&is=67002d65&hm=b2139b05b225e073f60a093a0e57b758a4f6a7ea45d6478ee448c5d9879c1212&",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Play Now",
        iframe:`<iframe frameborder="0" src="https://itch.io/embed-upload/11578639?color=333333" allowfullscreen="" width="500" height="909"><a href="https://vnbnodegamefi.itch.io/3d-dymension-tower-defend">Play 3D Dymension Tower Defend on itch.io</a></iframe>`
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
            backgroundColor={"gray.700"} color={"white"}
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
                                    boxSize="30px"
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
            backgroundColor={"gray.700"} color={"white"}
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
        if(currentItem.iframe){
            setIframeContent(currentItem.iframe);
            setIsBoxVisible(true);
        }else{
            window.location.href =currentItem.link_btn
        }
        
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
                bottom={"35%"}
                left="50%"
                transform="translate(-50%, -50%)"
                w={'full'}
                zIndex={2}
            >
                
                <Stack maxW={'3xl'} width={"100%"} >
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
                        color={"white"}
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
