function standardizeElements(jsonArray) {
    console.log("jsonArray: ", jsonArray[0])

    // Check if array is valid
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
        throw new Error('Input must be a non-empty array');
    }

    // Get the structure of the first element
    const firstElement = jsonArray[0];
    const structure = getStructure(firstElement);

    // Standardize all elements except the first one
    return jsonArray.map((element, index) => {
        if (index === 0) return element; // Keep first element as is
        return standardizeToStructure(element, structure);
    });
}

function getStructure(obj) {
    const structure = {};

    // Handle arrays
    if (Array.isArray(obj)) {
        if (obj.length > 0) {
            structure.type = 'array';
            structure.items = getStructure(obj[0]); // Handle array elements
        } else {
            structure.type = 'array';
            structure.items = null; // Empty array has no items
        }
        return structure;
    }

    // Handle objects
    if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                structure[key] = getStructure(obj[key]); // Recursive call for nested objects
            }
        }
        return structure;
    }

    // Handle primitives
    return { type: typeof obj };
}


function standardizeToStructure(obj, structure) {
    console.log("obj: ", obj);

    // Handle arrays
    if (structure.type === 'array') {
        if (!Array.isArray(obj)) {
            return [];
        }
        return obj.map(item => standardizeToStructure(item, structure.items));
    }

    // Handle objects
    if (typeof structure === 'object' && structure !== null) {
        const result = {};
        // Add all required properties from structure
        for (const key in structure) {
            console.log("key: ", key);
            if (Object.prototype.hasOwnProperty.call(structure, key)) {
                result[key] = standardizeToStructure(
                    obj[key],
                    structure[key]
                );
            }
        }

        return result;
    }

    // Handle primitives
    if (structure.type === 'number' && typeof obj !== 'number') {
        return Number(obj) || 0;
    }
    if (structure.type === 'boolean' && typeof obj !== 'boolean') {
        return Boolean(obj);
    }
    return obj;
}

// Example usage with your data

// Save back to file
// const fs = require('fs');
import fs  from 'fs';
fs.readFile('./gigs.json', (async (err, data) => {
    if (err) {
        console.log('error');
    }
    const parsedData = JSON.parse(data); // Parse the JSON data into an array
    console.log("parsedData: ", parsedData);
    const standardizedArray = standardizeElements(parsedData);
    fs.writeFileSync('output.json', JSON.stringify(standardizedArray, null, 2));
}))
