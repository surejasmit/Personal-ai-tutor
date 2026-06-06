const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/me',authenticateToken, async (req, res) => {
    try{
        const result = await db.query(
            'select id,name,email,level,created_at from users where id = $13',
            [req.user.id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json({
            message: 'User profile retrieved successfully',
             user: result.rows[0]
        });
    }
    catch(error){
        console.error('Error fetching user profile:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

// Update name / email
router.put('/me',authenticateToken, async (req, res) => {
    const {name,email} = req.body;

    if(!name && !email){
        return res.status(400).json({
            message:'Name or email is required'
        });
    }
    try{
        const existingEmail = await db.query(
            'select id from users where email = $1 and id != $2'
            ,[email,req.user.id]
        );

        if(existingEmail.rows.length > 0){
            return res.status(400).json({
                message:'Email already exists'
            });
        }

        const result = await db.query(
            'update users set name = $1 , email = $2 where id = $3 returning id,name,email,level,created_at',
            [name,email,req.user.id]
        );

        return res.status(200).json({
            message: 'User profile updated successfully',
            user:result.rows[0],
        });
    }
    catch(error){
        console.error('Error updating user profile:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

// Change the password

router.put('/me/password',authenticateToken, async (req, res) => {
    const {currentPassword,newPassword,confirmPassword} = req.body;

    if(!currentPassword || !newPassword || !confirmPassword){
        return res.status(400).json({
            message:'All Password fields are required'
        });
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message:'New password and confirm password do not match'
        });
    }

    try{
        const  result = await db.query(
            'select id,password from users where id = $1'
            ,[req.user.id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({message: 'User not found'});
        }
        
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(currentPassword,user.password);

        if(!isMatch){
            return res.status(400).json({
                message:'Current password is incorrect'
            });
        }

        const hashednewPassword = await bcrypt.hash(newPassword,10);

        await db.query(
            'update users set password = $1 where id = $2',
            [hashednewPassword,req.user.id]
        );
        return res.status(200).json({
            message: 'Password updated successfully'
        });
    }
    catch(error){
        console.error('Error updating password:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

module.exports = router;