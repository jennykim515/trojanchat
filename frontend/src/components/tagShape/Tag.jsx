import React, {Component} from 'react';
import Logo from '../logo/logo';
import { useApp } from '../../App';
import randomColor from "randomcolor";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Tag(tagName){

    
    return(
        <>
            <Chip label={tagName} />
        </>
    ); 
}