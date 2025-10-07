# BACKEND FIX - Add reviewCount Field to Gigs

## Issue
The frontend now uses a separate review collection (not embedded in gigs). The `GigPreview` component needs to display the number of reviews for each gig.

## Current Problem
Frontend is trying to use:
```javascript
gig.reviewCount  // This field doesn't exist yet
```

Previously it used:
```javascript
gig.reviews?.length  // No longer works since reviews are separate
```

## Required Fix

### 1. Add reviewCount to Gig Model/Schema
```javascript
// In gig.schema.js or equivalent
{
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  owner: { type: ObjectId, ref: 'User' },
  // ... other fields ...
  reviewCount: { type: Number, default: 0 }  // ✅ ADD THIS
}
```

### 2. Update reviewCount When Reviews Change

#### When a review is ADDED:
```javascript
// In review.controller.js - addReview function
export async function addReview(req, res) {
  try {
    const reviewToAdd = req.body
    const loggedInUser = req.loggedInUser
    
    // Add review data
    reviewToAdd.userId = loggedInUser._id
    reviewToAdd.name = loggedInUser.fullname || loggedInUser.username
    reviewToAdd.img = loggedInUser.imgUrl
    reviewToAdd.location = loggedInUser.location || { name: 'Unknown', format: 'xx' }
    reviewToAdd.reviewedAt = Date.now()
    
    const addedReview = await reviewService.add(reviewToAdd)
    
    // ✅ INCREMENT reviewCount on the gig
    await gigService.incrementReviewCount(reviewToAdd.gigId)
    
    res.json(addedReview)
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}
```

#### When a review is DELETED:
```javascript
// In review.controller.js - removeReview function
export async function removeReview(req, res) {
  try {
    const { id } = req.params
    
    // Get review to find gigId before deleting
    const review = await reviewService.getById(id)
    
    if (!review) {
      return res.status(404).send({ err: 'Review not found' })
    }
    
    await reviewService.remove(id)
    
    // ✅ DECREMENT reviewCount on the gig
    await gigService.decrementReviewCount(review.gigId)
    
    res.json({ message: 'Review deleted' })
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}
```

### 3. Add Gig Service Methods

```javascript
// In gig.service.js

async function incrementReviewCount(gigId) {
  try {
    const collection = await dbService.getCollection('gig')
    await collection.updateOne(
      { _id: ObjectId(gigId) },
      { $inc: { reviewCount: 1 } }
    )
    console.log('✅ Incremented reviewCount for gig:', gigId)
  } catch (err) {
    console.error('Error incrementing reviewCount:', err)
    throw err
  }
}

async function decrementReviewCount(gigId) {
  try {
    const collection = await dbService.getCollection('gig')
    await collection.updateOne(
      { _id: ObjectId(gigId) },
      { $inc: { reviewCount: -1 }, $max: { reviewCount: 0 } }  // Don't go below 0
    )
    console.log('✅ Decremented reviewCount for gig:', gigId)
  } catch (err) {
    console.error('Error decrementing reviewCount:', err)
    throw err
  }
}

// Export these functions
module.exports = {
  query,
  getById,
  add,
  update,
  remove,
  incrementReviewCount,   // ✅ ADD
  decrementReviewCount    // ✅ ADD
}
```

### 4. Initialize reviewCount for Existing Gigs (Migration)

Run this once to populate `reviewCount` for all existing gigs:

```javascript
// Migration script or run once in backend
async function initializeReviewCounts() {
  try {
    const gigCollection = await dbService.getCollection('gig')
    const reviewCollection = await dbService.getCollection('review')
    
    const gigs = await gigCollection.find({}).toArray()
    
    for (const gig of gigs) {
      const reviewCount = await reviewCollection.countDocuments({ gigId: gig._id.toString() })
      await gigCollection.updateOne(
        { _id: gig._id },
        { $set: { reviewCount } }
      )
      console.log(`Updated gig ${gig._id}: ${reviewCount} reviews`)
    }
    
    console.log('✅ Review counts initialized for all gigs')
  } catch (err) {
    console.error('Migration error:', err)
  }
}
```

## Testing

1. **Add a review** - Check that `gig.reviewCount` increments by 1
2. **Delete a review** - Check that `gig.reviewCount` decrements by 1
3. **Get gig list** - Verify all gigs have `reviewCount` field
4. **Frontend display** - Verify review count shows correctly in GigPreview

## Expected Result

GET `/api/gig` or GET `/api/gig/:id` should return:
```json
{
  "_id": "68e19823f8874b640ea60fe5",
  "title": "I will create an amazing logo",
  "price": 50,
  "owner": {...},
  "reviewCount": 5,  // ✅ This field
  // ... other fields
}
```

## Priority
**MEDIUM** - Not blocking but important for good UX. Users need to see review counts to evaluate gigs.

