'use client'
import Web3 from 'web3';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
import { useEffect, useState } from 'react';
import { hover } from '@testing-library/user-event/dist/hover';
export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const [connected, setConnected] = useState(false);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          popup:"modal_sweetalert2",
          confirmButton:"btn_confrim_sweetalert2",
          cancelButton:"btn_confrim_sweetalert2",
          input:"input_sweetalert2"
        }
      });
    useEffect(() => {
        if (window.ethereum && connected) {
            // document.getElementById('game-links').style.display = 'block';
        }
    }, [connected]);

    async function connectMetaMask() {
        let web3;
        const chainIdDec = 10668;
        const chainData = {
            chainId: `0x${chainIdDec.toString(16)}`,
            chainName: 'VNBnode-Gamehub',
            nativeCurrency: {
                name: 'VBNODE',
                symbol: 'VBNODE',
                decimals: 18,
            },
            rpcUrls: ['https://evm-rpc.adam-vnbnode.site/'],
            blockExplorerUrls: ['https://explorer.vnbnode.xyz'],
        };
        if (connected){
            swalWithBootstrapButtons.fire({
                title: "Enter your EVM wallet address",
                input: "text",
             
                showCancelButton: false,
                confirmButtonText: "Claim",
                
                preConfirm: async (tokenaddress) => {
                    try {
                        const githubUrl = 'http://localhost:3003/claim';
                        
                       
                        const data = {
                            userAddress:tokenaddress
                        };
                    
                        const response = await fetch(githubUrl, {
                            method: 'POST', 
                            headers: {
                                'Content-Type': 'application/json', 
                            },
                            body: JSON.stringify(data), 
                        });
                    
                        if (!response.ok) {
                           let data=await response.json()
                            return Swal.showValidationMessage(`
                                ${data.details}
                            `);
                        }
                    
                    } catch (error) {
                        Swal.showValidationMessage(`
                            Request failed: ${error}
                        `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                if (result.isConfirmed) {
                toast("Thành công!")
         
                }
              });
        }else{
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    
                    const currentChainId = await web3.eth.getChainId();
                    if (currentChainId !== chainIdDec) {
                        try {
                           
                            await window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: chainData.chainId }],
                            });
                        } catch (switchError) {
                            if (switchError.code === 4902) {
                                await window.ethereum.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [chainData],
                                });
                            } else {
                                toast.error('Failed to switch chain');
                                return;
                            }
                        }
                    }
                    toast.success('MetaMask Connected');
                    setConnected(true);
                } catch (error) {
                    setConnected(false);
                    toast.error('User denied account access');
                }
            } else {
                setConnected(false);
                toast.error('MetaMask not detected');
            }
        }
      
    }

    return (
        <Box width={"100vw"}>
            <Flex bg={useColorModeValue('#020617', '#020617')} color={useColorModeValue('white', 'white')} py={6} px={ 4 }>
                
                <Flex flex={{ base: 2 }} justify={{ base: "start", md: 'start' }}>
                    <Image width={"50px"} src={Logo}></Image>
                    <Flex display={{ base: 'none', md: 'none' }} >
                        <DesktopNav />
                    </Flex>
                </Flex>
                <Stack flex={{ base: 1, md: 1 }} justify={'end'} direction={'row'} spacing={6}>
                    <IconButton aria-label='Telegram' fontSize='20px' as={'a'} href="https://t.me/VNBnodegroup" icon={<FaTelegram />} />
                    <IconButton aria-label='Github' fontSize='20px' as={'a'} href="https://x.com/vnbnode" icon={<FaGithub />} />
                    <IconButton aria-label='Twitter' fontSize='20px' as={'a'} href="https://x.com/vnbnode" icon={<FaTwitter />} />
                    <Toaster />
                    <Button
                        onClick={connectMetaMask}
                        id='connect'
                       
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={connected ?'gray':'#2563eb'}
                        _hover={{ bg: '#2563eb' }}>
                        {connected ? 'Faucet':'Connect MetaMask'}
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
    
    return (
        <Stack direction={'row'} spacing={8} justifyContent={"center"}  >
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
                                fontSize={'md'}
                                fontWeight={700}
                                color={linkColor}
                                >
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


]