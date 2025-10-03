// Picsum Photos API service for fetching random images
// No API key required - instant access to high-quality images!

export const imageService = {
    async getRandomImages(count = 3) {
        try {
            // Use Picsum Photos - no API key needed!
            const images = []
            for (let i = 0; i < count; i++) {
                const randomId = Math.floor(Math.random() * 1000) + 1
                const width = 500
                const height = 300
                images.push(`https://picsum.photos/${width}/${height}?random=${randomId}`)
            }
            return images
        } catch (error) {
            console.error('Error fetching images from Picsum:', error)
            console.log('Falling back to static images...')
            return this.getFallbackImages(count)
        }
    },

    getFallbackImages(count) {
        // Fallback images in case Picsum Photos is unavailable
        // These are verified working Unsplash URLs
        const imagePool = [
            // Business & Office
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop&q=80",
            
            // Technology
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop&q=80",
            
            // Design & Creative
            "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop&q=80",
            
            // Writing & Content
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop&q=80",
            
            // Video & Media
            "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=300&fit=crop&q=80",
            
            // Marketing & Social
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&q=80",
            
            // Additional variety
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&q=80",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop&q=80"
        ]
        
        // Return random selection of images
        const selectedImages = []
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * imagePool.length)
            selectedImages.push(imagePool[randomIndex])
        }
        
        return selectedImages
    }
}
