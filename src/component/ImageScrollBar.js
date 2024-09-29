'use client'
import WatchingYou, { useWatchingYou } from 'react-watching-you';

import { Stack, Flex, Button, Text, VStack, useBreakpointValue, Image, Box } from '@chakra-ui/react'
import TransImageLeft from "../asset/left-overlay.png"
import TransImageRight from "../asset/right-overlay.png"
import TransImageDown from "../asset/down-overlay.png"
import TransImageTop from "../asset/top-overlay.png"
import Game1 from "../asset/blackjack.jpg"
import { useEffect, useRef, useState } from 'react'
const items = [
    {
        title: 'CHICKEN MERGE & WAR',
        image: 'https://testnet.mushiclub.app/banner/flappybird-thumb.jpg',
        subtitle: "Flappy Bird",
        subdescribe: "Flappy Bird: RollApp Edition - where superhero birds take flight! Dodge obstacles, battle villains, and flap to victory. Fly as Iron Bird, Captain Flutter, or Hawkeye Fly. Prepare for laughs and epic avian adventures!",
        subimage: "https://i.postimg.cc/7ZyDKM5s/chicken-war-3-D.webp",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Play Now wfwaf",
    },
    {
        title: 'Flappy Bird 1',
        image: 'https://testnet.mushiclub.app/banner/flappybird-thumb.jpg',
        subtitle: "Flappy Bird 1",
        subdescribe: "Flappy Bird: RollApp Edition - where superhero birds take flight! Dodge obstacles, battle villains, and flap to victory. Fly as Iron Bird, Captain Flutter, or Hawkeye Fly. Prepare for laughs and epic avian adventures!",
        subimage: "https://testnet.mushiclub.app/banner/blackjack.jpg",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Play Now afaf",
    },
    {
        title: 'Flappy Bird 2',
        image: 'https://testnet.mushiclub.app/banner/flappybird-thumb.jpg',
        subtitle: "Flappy Bird 2",
        subdescribe: "Flappy Bird: RollApp Edition - where superhero birds take flight! Dodge obstacles, battle villains, and flap to victory. Fly as Iron Bird, Captain Flutter, or Hawkeye Fly. Prepare for laughs and epic avian adventures!",
        subimage: "https://testnet.mushiclub.app/banner/highlow.jpg",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Play Now haha",
    },
    {
        title: 'Flappy Bird',
        image: 'https://testnet.mushiclub.app/banner/flappybird-thumb.jpg',
        subtitle: "Flappy Bird",
        subdescribe: "Flappy Bird: RollApp Edition - where superhero birds take flight! Dodge obstacles, battle villains, and flap to victory. Fly as Iron Bird, Captain Flutter, or Hawkeye Fly. Prepare for laughs and epic avian adventures!",
        subimage: "https://testnet.mushiclub.app/banner/flappybird.jpg",
        link_btn:"https://playground.dymension.xyz/rollapps/vnbnodegamehub_10668-1/dashboard",
        text_button:"Play Now wfwaf",
    },

];
const HorizontalNav = ({ currentIndex, setCurrentIndex }) => {
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
                                <Text>{item.title}</Text>
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentItem, setCurrentItem] = useState(items[0]); // Lưu trữ mục hiện tại

    useEffect(() => {
        setCurrentItem(items[currentIndex]); // Cập nhật mục hiện tại khi chỉ số thay đổi
    }, [currentIndex]);

    return (
        <Flex
            w={'full'}
            h={'90vh'}
            position="fixed"
            backgroundImage={currentItem.subimage} // Thay đổi hình nền
            backgroundSize={"cover"}
            backgroundPosition={'center center'}
        >
     <WatchingYou>
      <div>O</div>
    </WatchingYou>
            <Image
                position="absolute"
                bottom="0"
                height={"100%"}
                width={"100%"}
                src={TransImageDown}
                zIndex={1}
                opacity={1}
            />
            <Image
                position="absolute"
                top="0"
                height={"20%"}
                width={"100%"}
                src={TransImageTop}
                zIndex={1}
                opacity={0}
            />
            <VStack
                position="absolute"
                bottom="5%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={'full'}
                px={useBreakpointValue({ base: 4, md: 8 })} zIndex={2}
               
            >
                <Stack maxW={'3xl'}>
                    <Text
                        color={"wheat"}
                        fontWeight={500}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '1xl', md: '5xl' })}
                        style={{
                            textShadow: '2px 3px 4px rgba(0, 0, 0, 1)', // Tạo viền bóng cho chữ
                        }}
                    >
                        {currentItem.title} 
                    </Text>
                    <Text
                        color={"gray.200"}
                        fontWeight={500}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: 'm',md: 'xl'})}
                        paddingBottom={"16px"}
                    >
                        {currentItem.subdescribe} 
                    </Text>
                    <Button 
                
                        width={"40%"} 
                        alignSelf={"center"} 
                        background={"#ca2626"}
                        size='md'
                        borderRadius={"full"}
                        border='4px'
                        borderColor='#ffa00b'
                        fontWeight={"500px"} 
                        fontSize={"23px"}
                        onClick={() => window.open(currentItem.link_btn, "_blank")} 
                    >
                        {currentItem.text_button} {/* Thay đổi văn bản nút */}
                    </Button>
                </Stack>
            </VStack>
            <HorizontalNav currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
           
        </Flex>
    );
}