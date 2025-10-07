# BACKEND FIX REQUIRED - User Endpoint Failing

## Issue
The endpoint `GET /api/user/get-user/:userId` is returning 400 Bad Request:

```
GET http://localhost:3030/api/user/get-user/68e06200aa7267c75611a660
Response: {"err":"Failed to get user"}
Status: 400 Bad Request
```

## Route Configuration (Verified)
The route exists and is correctly configured:
```javascript
router.get('/get-user/:id', getUser)
```

## Problem
The `getUser` controller function is throwing an error and catching it with a generic "Failed to get user" message.

## Required Fix

### Update the `getUser` controller function in `user.controller.js`:

```javascript
export async function getUser(req, res) {
  try {
    const { id } = req.params
    
    // Debug logging
    console.log('📥 GET user request - ID:', id)
    
    // Validate ID format (if using MongoDB ObjectId)
    if (!id || id.length !== 24) {
      console.error('❌ Invalid user ID format:', id)
      return res.status(400).send({ err: 'Invalid user ID format' })
    }
    
    // Fetch user from database
    const user = await userService.getById(id)
    
    if (!user) {
      console.error('❌ User not found with ID:', id)
      return res.status(404).send({ err: 'User not found' })
    }
    
    // Success - return user data
    console.log('✅ User found:', user.username || user.fullname, '- imgUrl:', user.imgUrl ? 'present' : 'missing')
    res.json(user)
    
  } catch (err) {
    console.error('❌ Error in getUser controller:', err)
    console.error('   Stack:', err.stack)
    res.status(500).send({ 
      err: 'Failed to get user', 
      details: err.message 
    })
  }
}
```

## Debug Steps

### Step 1: Check if the controller exists
Verify `user.controller.js` has the `getUser` function exported

### Step 2: Check the userService.getById method
The controller calls `userService.getById(id)`. Verify this method works:

```javascript
// In user.service.js
async function getById(userId) {
  try {
    console.log('UserService - Getting user by ID:', userId)
    
    // Example for MongoDB
    const user = await dbService.getCollection('user').findOne({ _id: ObjectId(userId) })
    
    if (!user) {
      console.log('UserService - User not found')
      return null
    }
    
    console.log('UserService - User found:', user.username)
    return user
    
  } catch (err) {
    console.error('UserService - Error in getById:', err)
    throw err
  }
}
```

### Step 3: Common Issues to Check

1. **ObjectId Import Missing:**
   ```javascript
   import { ObjectId } from 'mongodb'
   // or
   const { ObjectId } = require('mongodb')
   ```

2. **Wrong field name:**
   - Check if database uses `_id` (MongoDB) or `id` (some DBs)
   - Verify the query matches the actual field name

3. **Database connection:**
   - Ensure database is connected before query
   - Check if collection name is correct ('user' vs 'users')

4. **Try-catch is too broad:**
   - The current error message is too generic
   - Add specific error logging as shown above

### Step 4: Test the Fix

After implementing the fix, test with:
```bash
curl http://localhost:3030/api/user/get-user/68e06200aa7267c75611a660
```

**Expected Response:**
```json
{
  "_id": "68e06200aa7267c75611a660",
  "username": "alex_marketing",
  "fullname": "Alex Thompson",
  "imgUrl": "https://picsum.photos/200/200?random=5",
  "location": {
    "name": "United States",
    "format": "us"
  },
  "proffession": "Marketing Expert",
  "level": 2,
  "rate": 4.8,
  "languages": ["English", "Spanish"]
}
```

## What the Frontend Needs

The frontend fetches user data for reviews using `userId`. Each review stores:
```javascript
{
  userId: "68e06200aa7267c75611a660",  // This is used to fetch user data
  // ... other review fields
}
```

The frontend then calls `GET /api/user/get-user/:userId` to get:
- User's current `imgUrl` (profile picture)
- User's `fullname` or `username`
- User's `location`

This ensures reviews always show up-to-date user information from the user collection.

## Priority
**HIGH** - This breaks the review display functionality. Reviews need to fetch user data to show profile pictures and names.

