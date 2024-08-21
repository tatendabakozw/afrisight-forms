import { styled } from '@stitches/react';

export const Button = styled('button', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    paddingRight: '16px',
    paddingLeft: '16px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    '&:focus': {
        outline: '2px solid #2563EB',
    },
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },

    variants: {
        colorScheme: {
            action: {
                backgroundColor: '#121212',
                color: 'white',
                '&:hover': {
                    backgroundColor: '#010101',
                },
                boxShadow: '0 1px 2px rgb(0 0 0 / 5%)',


            },
            ghost: {
                backgroundColor: '#f0f0f0',
                color: '#121212',
                '&:hover': {
                    backgroundColor: '#e0e0e0',
                },
            }
        }
    }

});