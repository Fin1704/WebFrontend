'use client'

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
    Center,
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    PhoneIcon,
} from '@chakra-ui/icons'
import Logo from "../asset/vnbnode.png"
import { FaGit, FaGithub, FaTelegram, FaTwitch, FaTwitter } from 'react-icons/fa'
export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Box >

            <Flex
                bg={useColorModeValue('#020617', '#020617')}
                color={useColorModeValue('white', 'white')}
               
                py={{ base:6 }}
                px={{ base: 4 }}


            >
                <Flex
                    flex={{ base: 'auto', md: 'auto' }}
                   
                    display={{ base: 'none', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 2 }} justify={{ base: 'center', md: 'center' }}>
                        <Image width={"50px"} src={Logo}></Image>

                    <Flex  display={{ base: 'none', md: 'flex' }}  ml={10} >

                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 1 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <IconButton

                        aria-label='Telegram'
                        fontSize='20px'
                        icon={<FaTelegram />}
                    />
                    <IconButton
                        aria-label='Github'
                        fontSize='20px'
                        icon={<FaGithub />}
                    />
                    <IconButton
                        aria-label='Twitter'
                        fontSize='20px'
                        icon={<FaTwitter />}
                    />
                    <Button
                        as={'a'}
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'#2563eb'}
                        href={'#'}
                        _hover={{
                            bg: '#2563eb',
                        }}>
                        Connect Wallet
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('white', 'white')
    const popoverContentBgColor = useColorModeValue('#020617', '#020617')

    return (
        <Stack direction={'row'} spacing={8} justifyContent={"center"} >
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Button
                                background={"#ca2626"}
                                size='md'
                                borderRadius={"full"}
                                border='4px'
                                borderColor='#ffa00b'
                                as="a"
                                p={4}
                                href={navItem.href ?? '#'}
                                fontSize={'xl'}
                                fontWeight={700}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Button>
                        </PopoverTrigger>

                      
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}

            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('#020617', '#020617') }}>
        </Box>
    )
}

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('#020617', '#020617')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}


const NAV_ITEMS = [

    {
        label: 'RollApp',
        href: '#',
    },
    {
        label: 'Buy',
        href: '#',
    },
    {
        label: 'Sell',
        href: '#',
    },
    {
        label: 'Faucet',
        href: '#',
    },
]