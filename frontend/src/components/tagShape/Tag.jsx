import React, { Component } from 'react';
import Logo from '../logo/logo';
import { useApp } from '../../App';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Tag({ props }) {
    const tagName = props;

    return (
        <>
            <Chip
                label={tagName}
                sx={{ marginRight: '7px', marginLeft: '-3px' }}
                style={
                    !tagName
                        ? {
                              backgroundColor: 'transparent',
                          }
                        : {}
                }
            />
        </>
    );
}
