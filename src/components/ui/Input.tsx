import { styled } from '@stitches/react';

export const Input = styled('input', {
    height: '40px',
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: 'white',
    border: '1px solid rgb(161 161 170 / 0.3)',
    boxShadow: '0 1px 2px rgb(0 0 0 / 5%)',
    '&:focus': {
        outline: '2px solid #2563EB',
    },
})

export const Textarea = styled('textarea', {
    padding: '10px',
    borderRadius: '6px',
    backgroundColor: 'white',
    border: '1px solid rgb(161 161 170 / 0.3)',
    boxShadow: '0 1px 2px rgb(0 0 0 / 5%)',
    '&:focus': {
        outline: '2px solid #2563EB',
    },
})