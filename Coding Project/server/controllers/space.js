import Review from "../models/Review.js";
import Space from "../models/Space.js"

/**
 * @route GET /space/all-spaces
 * @desc Fetch all spaces summaries listed in the database
 * @access Public
 */
export async function AllSpacesSummary(req, res) {
    try {
        const spacesArray = await Space.find({}, {id:1, name:1, img:1, coords:1, rating:1});

        res.status(200).json({
            status: "success",
            data: [spacesArray],
            message: "Spaces fetched successfully!"
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ 
            status: 'err',
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }
}

/**
 * @route GET /space/space-info/:id
 * @desc Get full information of a space given its ID
 * @access Public
 */
export async function FullSpaceInfo(req, res) {
    try {
        var queryid = req.params.id;
        const spaceInfo = await Space.find({id: queryid}, {});

        res.status(200).json({
            status: "success",
            data: spaceInfo,
            message: "Space full information fetched successfully!"
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ 
            status: 'err',
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }
}

/**
 * @route GET /space/sort?lat=&lon=
 * @desc Fetch all spaces sorted by user proximity
 * @access Public
 */
export async function SortedByProximity(req, res) {
    try {
        var latitude = req.query.lat;
        var longitude = req.query.lon;
        const sortedSpaces = await Space
        .find({
            location: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude],
                },
                $maxDistance: 100000000,
              },
            },
          }, {id:1, name:1, coords:1, rating:1});

        res.status(200).json({
            status: "success",
            data: [sortedSpaces],
            message: "Spaces fetched successfully!"
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ 
            status: err,
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }
}

/**
 * @route POST /space/add-space-basic
 * @desc Adds a basic space (id, name, desc, coords, address) -- Emily's using this one 
 * @access Public
 */
export async function createSpace (req, res) {

    try {
        const {id, name, img, desc, coords, address, rating, statistics, reviews, amenities} = req.body

        // create new user
        const newSpace = new Space({
            id: id,
            name: name,
            img: img,
            desc: desc,
            location: {
                type: "Point",
                coordinates: coords,
            },
            address: address,
            rating: rating,
            statistics: statistics,
            reviews: reviews,
            amenities: amenities,
        });

        // check if that id already exists
        const existingSpace = await Space.findOne({ id });
        if (existingSpace) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems that space already exists, try updating instead.",    
            })
        }

        const savedUser = await newSpace.save();
        const {...space_data } = newSpace._doc;
        res.status(200).json({
            status: "success",
            data: [space_data],
            message: "Thank you for registering with us. Your space has been successfully created."
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }
}

// delete a space
export async function deleteSpace (req, res) {
    const { id } = req.params

    // will check to see if the id is valid
    // if (!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: "No such review"})
    // }
    
    const review = await Review.findOneAndDelete({id: id})
    if (!review){
        return res.status(404).json({error: "No such space"})
    }

    res.status(200).json(review)
}

// update a space
export async function updateSpace (req, res) {
    const { id } = req.params
    //update the only the fields we need to update
    //
    const review = await Space.findOneAndUpdate({id: id}, {
        ...req.body
    }, {new: true}) // you can set this to false to return the old document instead

    if (!review){
        return res.status(404).json({error: "No such space"})
    }

    res.status(200).json(review)
}

// sort spaces based on ratings
export async function filterByRatings (req,res) {
    const order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        const spaces = await Space.find()
        if (order == 'asc'){
            spaces.sort((a,b) => a.rating - b.rating)
        }
        else{
            spaces.sort((a,b) => b.rating - a.rating)
        }
        res.status(200).json({ spaces });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error dingus' });
    }
}

export async function filterByNoise (req,res) {
    const order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        let spaces = await Space.find()

        //this will filter out spaces that have no statistics
        spaces = spaces.filter(space => space.statistics)
        if (order == 'asc'){
            spaces.sort((a,b) => a.statistics.noiseLevels - b.statistics.noiseLevels)
        }
        else{
            spaces.sort((a,b) => b.statistics.noiseLevels - a.statistics.noiseLevels)
        }
        res.status(200).json({ spaces });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error dingus' });
    }
}

export async function filterByOccupancy (req,res) {
    const order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        let spaces = await Space.find()

        //this will filter out spaces that have no statistics
        spaces = spaces.filter(space => space.statistics)

        if (order == 'asc'){
            spaces.sort((a,b) => a.statistics.occupancy - b.statistics.occupancy)
        }
        else{
            spaces.sort((a,b) => b.statistics.occupancy - a.statistics.occupancy)
        }
        res.status(200).json({ spaces });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error dingus' });
    }
}

export async function filterByConnectivity (req,res) {
    const order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        let spaces = await Space.find()

        //this will filter out spaces that have no statistics
        spaces = spaces.filter(space => space.statistics)

        if (order == 'asc'){
            spaces.sort((a,b) => a.statistics.connectivity - b.statistics.connectivity)
        }
        else{
            spaces.sort((a,b) => b.statistics.connectivity - a.statistics.connectivity)
        }
        res.status(200).json({ spaces });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error dingus' });
    }
}

// GET a list of spaces based on alphabetical order
export async function sortByLetter (req,res) {
    let order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        //const spaces = await Space.find({}).sort({name: -1})
        if (order === 'asc'){
            let spaces = await Space.find({}).sort({name: 1})
            spaces = spaces.filter(space => space.name)
            res.status(200).json({ spaces });
        }
        else{
            let spaces = await Space.find({}).sort({name: -1})
            spaces = spaces.filter(space => space.name)
            res.status(200).json({ spaces });
        }
        //res.status(200).json({ spaces });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error dingus' });
    }
}

// GET a list of spaces based on amenities
export async function filterByAmenities (req,res) {
    const filters = {}
    const parameters = ['has_outlets', 'has_whiteboards', 'has_screen', 'is_food_beverage_friendly', 'has_printer', 'has_breakout_rooms', 'restrooms']
    for (const param of parameters){
        if(req.query[param] !== undefined){
            filters['amenities.$(param)'] = Boolean(req.query[param])
            console.log(Boolean(req.query[param]))
        }
    }
    if(req.query.seating_type !== undefined){
        filters['amenities.seating_type'] = (req.query[seating_type])
    }

    try {
        const spaces = await Space.find(filters).sort()
        
        res.status(200).json({ spaces });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error dingus' });
    }
}

// GET a list of spaces based on distance