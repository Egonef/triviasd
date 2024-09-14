import express from 'express';
import asyncHandler from 'express-async-handler';



//     /admin/test
export const test = asyncHandler(async(req, res) => {
    res.send('Admin Route')
})
