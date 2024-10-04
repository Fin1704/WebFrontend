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
        image: 'https://cdn.discordapp.com/attachments/1289031386971377684/1291592673362444341/background.png?ex=6700a8e9&is=66ff5769&hm=70febce7adcdb117124d8c4696183a8e5d9387be98766a90beb1b82ee4381a73&',
        subtitle: "VNBnode Rollapp",
        subdescribe: " Visit our VNBnode's Rollapp to exchange tokens, providing liquidity and staking for more rewards.",
        subimage: "https://cdn.discordapp.com/attachments/1289031386971377684/1291592673362444341/background.png?ex=6700a8e9&is=66ff5769&hm=70febce7adcdb117124d8c4696183a8e5d9387be98766a90beb1b82ee4381a73&",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Visit",
        // iframe:`<iframe frameborder="0" src="https://itch.io/embed-upload/11556075?color=333333" allowfullscreen="" width="640" height="380"><a href="https://vnbnodegamefi.itch.io/chicken-war-game-dymension-3d">Play Chicken War Game - Dymension 3D on itch.io</a></iframe>`
    },
    {
        title: 'Chicken War',
        image: 'https://cdn.discordapp.com/attachments/1289031386971377684/1290191721421864980/thumb2.png?ex=67002d6c&is=66fedbec&hm=8b69ec5c13cd8f3e28fc4a268d05311ea249aaff005b08ae75947af9e2ccd545&',
        subtitle: "Chicken War",
        subdescribe: "The village of chickens is attacked by gangs of wolves and zombies. The chickens have to fight for their lives. Please play the game and help the chickens.",
        subimage: "https://cdn.discordapp.com/attachments/1289031386971377684/1290186393145966673/Logo2.png?ex=67002876&is=66fed6f6&hm=94eb4a8a164ba04a596362b8d7afda2e4ba085c75fe8673b57bd7c4e7c6a188f&",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Play Now",
        iframe:`<iframe frameborder="0" src="https://itch.io/embed-upload/11556075?color=333333" allowfullscreen="" width="640" height="380"><a href="https://vnbnodegamefi.itch.io/chicken-war-game-dymension-3d">Play Chicken War Game - Dymension 3D on itch.io</a></iframe>`
    },
    {
        title: 'Tower Defend',
        image: 'https://cdn.discordapp.com/attachments/1289031386971377684/1290191721166278749/thumb1.png?ex=67002d6c&is=66fedbec&hm=16df547520c8fb759d45ee67cb4b48b6d330dad857d587c0ffda26d9b38f89f1&',
        subtitle: "Tower Defend",
        subdescribe: "An ancient tower in the middle of the forest, is being attacked by ferocious beasts, you are the general leading the army, please fight with us.",
        subimage: "https://cdn.discordapp.com/attachments/1289031386971377684/1290191689683697715/banner_2.png?ex=67002d65&is=66fedbe5&hm=ab4269ae42e76c3000267f52686302378cc2994178543b70cf89823effd4894a&",
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
                bottom={"50px"}
                left="50%"
                transform="translate(-50%, -50%)"
                w={'full'}
                zIndex={2}
            >
                <Stack maxW={'3xl'} width={"70%"} >
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
