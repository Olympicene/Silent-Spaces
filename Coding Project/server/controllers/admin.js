import Space from "../models/Space.js"

/**
 * @route POST admin/add-space-basic
 * @desc Adds a basic space (id, name, desc, coords, address) -- Annie's using this one 
 * @access Public
 */

export async function AddSpaceBasic(req, res) {
    try {
        const { id, name, img, desc, lat, lon, address } = req.body

        // create new user
        const newSpace = new Space({
            id: id,
            name: name,
            img: img,
            desc: desc,
            location: {
                type: "Point",
                coordinates: [lat, lon],
            },
            address: address,
        });

        // check if exists
        const existingSpace = await Space.findOne({ id });
        if (existingSpace) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Space with such ID already exists, try again.",    
            });
        }

        const savedSpace = await newSpace.save();
        const {role, ...space_data } = savedSpace._doc;
        res.status(200).json({
            status: "success",
            data: [space_data],
            message: "Space successfully added"
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }
}
