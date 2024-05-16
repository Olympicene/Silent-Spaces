import Review from "../models/Review.js";
import Space from "../models/Space.js"

//-------------------------------------------------------//
//                  BASIC SPACE QUERIES                  //
//-------------------------------------------------------//

/**
 * @route GET /space/all-spaces
 * @desc Fetch all spaces summaries listed in the database
 * @access Public
 * 
 * @input user is logged in
 * @inputExample  -- GET http://localhost:5005/space/all-spaces
 * @outputExample -- next comment block
 */
/*
{
    "status": "success",
    "data": [
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -87.648167,
                    41.870278
                ]
            },
            "_id": "65f37ad4f16cf8c61893d072",
            "id": 0,
            "name": "WiCS Lounge",
            "img": [
                "https://today.uic.edu/wp-content/uploads/2020/01/CS-Lounge-WiCS_6x4.jpg"
            ],
            "rating": 4
        },
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -87.650503,
                    41.871707
                ],
                "_id": "65f391a5c18e8779421ce0be"
            },
            "_id": "65f391a5c18e8779421ce0bd",
            "id": 1,
            "name": "IDEA Commons",
            "img": [
                "https://library.uic.edu/wp-content/uploads/sites/196/2020/02/idea.jpg"
            ],
            "rating": 4.5
        }
    ],
    "message": "Spaces fetched successfully!"
}
*/
export async function AllSpacesSummary(req, res) {
    try {
        const spacesArray = await Space.find({}, {id:1, name:1, img:1, location:1, rating:1});
        // const spacesArray = await Space.aggregate([
        //     {
        //         $project: {
        //             id: 1,
        //             name: 1,
        //             location: 1,
        //             rating: 1,
        //             img: {
        //                 $cond: {
        //                     if: { $eq: [{ $size: "$img" }, 0] }, // Check if the img array is empty
        //                     then: [], // If img array is empty, pass an empty array
        //                     else: { $arrayElemAt: ["$img", 0] } // Otherwise, select the first item in the 'img' array
        //                 }
        //             }
        //         }
        //     }
        // ]);

        res.status(200).json({
            status: "success",
            data: spacesArray,
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
 * 
 * @input :id - id of space requested
 *        user is logged in
 * @inputExample  -- GET http://localhost:5005/space/space-info/0
 * @outputExample -- next comment block
 */
/*
{
    "status": "success",
    "data": [
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -87.648167,
                    41.870278
                ]
            },
            "reviews": [],
            "_id": "65f37ad4f16cf8c61893d072",
            "id": 0,
            "name": "WiCS Lounge",
            "img": "https://today.uic.edu/wp-content/uploads/2020/01/CS-Lounge-WiCS_6x4.jpg",
            "desc": "Study space for Women in Computer Science at UIC",
            "address": "SELE 2268, 950 S Halsted St, Chicago, IL 60607",
            "rating": 4
        }
    ],
    "message": "Space full information fetched successfully!"
}
*/

function round(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

export async function FullSpaceInfo(req, res) {
    try {
        var queryid = req.params.id;
        //const spaceInfo = await Space.find({id: queryid}, {});

        const reviews = await Review.findOne({space_id: queryid},{review_id:1, comment:1, email: 1}).sort({createdAt: -1})

        if(!reviews){
            const spaceUpdate = await Space.findOne({id: queryid}, {});

            console.log(spaceUpdate)

            res.status(200).json({
                status: "success",
                data: spaceUpdate,
                message: "Space full information fetched successfully!"
            });
        }
        else {
            const allinfoReviews = await Review.find({space_id: queryid});

            // Calculate the total sum of all Levels using an aggregate function 
            const total_noise = allinfoReviews.reduce((acc, review) => acc + review.statistics.noiseLevels, 0);
            const total_occ = allinfoReviews.reduce((acc, review) => acc + review.statistics.occupancy, 0);
            const total_connect = allinfoReviews.reduce((acc, review) => acc + review.statistics.connectivity, 0);

            // Calculate the average Levels
            const average_noise = (total_noise / allinfoReviews.length).toFixed(1);
            const average_occ = (total_occ / allinfoReviews.length).toFixed(1);
            const average_connect = (total_connect / allinfoReviews.length).toFixed(1);

            //round it off to the nearest half point
            const rounded_noise = round(average_noise, 0.5)
            const rounded_occ = round(average_occ, 0.5)
            const rounded_connect = round(average_connect, 0.5)

            let updateStats = {
                "noiseLevels": rounded_noise,
                "occupancy": rounded_occ,
                "connectivity": rounded_connect
            }
            console.log(updateStats)
            
            const sum = (parseFloat(average_noise) + parseFloat(average_occ) + parseFloat(average_connect)).toFixed(2);
            const overall_average = (parseFloat(sum) / 3.0).toFixed(1);

            const spaceUpdate = await Space.findOneAndUpdate({id: queryid}, {reviews: reviews, rating: overall_average, statistics: updateStats}, {new: true})

            console.log(spaceUpdate)

            res.status(200).json({
                status: "success",
                data: spaceUpdate,
                message: "Space full information fetched successfully!"
            });
    }

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

//-------------------------------------------------------//
//                   SORT SPACE QUERIES                  //
//-------------------------------------------------------//
/**
 * @generalRouteFormat GET /space/sort/
 * @desc get summary of spaces sorted in a specified way
 * @access Public
 * @outputExample -- next comment block
 */
/** OUTPUT EXAMPLE --
{
    "status": "success",
    "data": [
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -87.648167,
                    41.870278
                ]
            },
            "_id": "65f37ad4f16cf8c61893d072",
            "id": 0,
            "name": "WiCS Lounge",
            "img": [
                "https://today.uic.edu/wp-content/uploads/2020/01/CS-Lounge-WiCS_6x4.jpg"
            ],
            "rating": 4
        },
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -87.6479,
                    41.8719
                ]
            },
            "_id": "6606da6628c41e053b834b23",
            "id": 4,
            "name": "UIC Student Center East",
            "img": [
                "https://studentcenters.uic.edu/wp-content/uploads/sites/159/2017/12/SC_Slides_EastTerrace2.jpg"
            ],
            "rating": 4.3
        }
    ],
    "message": "Spaces fetched successfully!"
}
*/
//-------------------------------------------------------//

/**
 * @route GET /space/sort/overall-ratings
 * @desc by rating
 * @outputExample -- top of SORT SPACE QUERIES section
 */
export async function sortByRatings(req,res) {
    const order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        const spaces = await Space.find({}, {id:1, name:1, img:1, location:1, rating:1})
        if (order == 'asc'){
            spaces.sort((a,b) => a.rating - b.rating)
        }
        else{
            spaces.sort((a,b) => b.rating - a.rating)
        }
        res.status(200).json({
            status: "success",
            data: spaces,
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
 * @route GET /space/sort/noise-ratings
 * @desc by noise
 * @outputExample -- top of SORT SPACE QUERIES section
 */
export async function sortByNoise(req,res) {
    const order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        let spaces = await Space.find({}, {id:1, name:1, img:1, location:1, rating:1, statistics:1})

        //this will filter out spaces that have no statistics
        spaces = spaces.filter(space => space.statistics)
        if (order == 'asc'){
            spaces.sort((a,b) => a.statistics.noiseLevels - b.statistics.noiseLevels)
        }
        else{
            spaces.sort((a,b) => b.statistics.noiseLevels - a.statistics.noiseLevels)
        }
        res.status(200).json({
            status: "success",
            data: spaces,
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
 * @route GET /space/sort/occupancy-ratings
 * @desc by occupancy
 * @outputExample -- top of SORT SPACE QUERIES section
 */
export async function sortByOccupancy (req,res) {
    const order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        let spaces = await Space.find({}, {id:1, name:1, img:1, location:1, rating:1, statistics:1})

        //this will filter out spaces that have no statistics
        spaces = spaces.filter(space => space.statistics)

        if (order == 'asc'){
            spaces.sort((a,b) => a.statistics.occupancy - b.statistics.occupancy)
        }
        else{
            spaces.sort((a,b) => b.statistics.occupancy - a.statistics.occupancy)
        }
        res.status(200).json({
            status: "success",
            data: spaces,
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
 * @route GET /space/sort/connectivity-ratings
 * @desc by connectivity
 * @outputExample -- top of SORT SPACE QUERIES section
 */
export async function sortByConnectivity(req,res) {
    const order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        let spaces = await Space.find({}, {id:1, name:1, img:1, location:1, rating:1, statistics:1})

        //this will filter out spaces that have no statistics
        spaces = spaces.filter(space => space.statistics)

        if (order == 'asc'){
            spaces.sort((a,b) => a.statistics.connectivity - b.statistics.connectivity)
        }
        else{
            spaces.sort((a,b) => b.statistics.connectivity - a.statistics.connectivity)
        }
        res.status(200).json({
            status: "success",
            data: spaces,
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
 * @route GET /space/sort/alphabetical-order
 * @desc by name in alphabetical order 
 * @outputExample -- top of SORT SPACE QUERIES section
 */
export async function sortByLetter(req,res) {
    let order = req.query.order;

    if (order !== 'asc' && order !== 'desc'){
        order = 'asc'
    }

    try {
        var spaces;
        //const spaces = await Space.find({}).sort({name: -1})
        if (order === 'asc'){
            spaces = await Space.find({}, {id:1, name:1, img:1, location:1, rating:1}).sort({name: 1})
            spaces = spaces.filter(space => space.name)
        }
        else{
            spaces = await Space.find({}, {id:1, name:1, img:1, location:1, rating:1}).sort({name: -1})
            spaces = spaces.filter(space => space.name) 
        }
        //res.status(200).json({ spaces });
        res.status(200).json({
            status: "success",
            data: spaces,
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
 * @route GET /space/sort?lat=&lon=
 * @desc Fetch all spaces sorted by proximity to the user's location
 * 
 * @input lat=&lon= - current coordinates of the user 
 *        user is logged in
 * @inputExample  -- GET http://localhost:5005/space/sort?lat=41.8720&lon=-87.6479
 * @outputExample -- top of SORT SPACE QUERIES section
 */
export async function sortByProximity(req, res) {
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
          }, {id:1, name:1, img:1, location:1, rating:1});

        res.status(200).json({
            status: "success",
            data: sortedSpaces,
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

//-------------------------------------------------------//
//                 FILTER SPACE QUERIES                  //
//-------------------------------------------------------//

// GET a list of spaces based on amenities
/**
 * @route GET /space/filter/amenities?<param>=<value>&<param>=<value>
 * @desc will filter spaces based on the params we are searching for
 * 
 * @input all properties and the values you are requesting
 *        user is logged in
 * @inputExample  -- GET http://localhost:5005/space/filter/amenities?has_outlets=true&seating_type=group-seating
 * @outputExample -- next comment block
 */
/**
 * {
    "status": "success",
    "data": [
        [
            {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -74.006,
                        40.7128
                    ],
                    "_id": "66056abb634bddec4146daf3"
                },
                "_id": "66056abb634bddec4146daf2",
                "id": 24,
                "name": "New York City Hall",
                "img": [
                    "https://images.ctfassets.net/1aemqu6a6t65/4hwGvD49bq0K8BE7ye7ddn/80830227e48d18ece85a62b431d821f8/city_hall-33_sky_fixed?w=1200&h=800&q=75",
                    "https://www.nyc.gov/assets/dcas/images/business/manhattan-buildings/cityhall_1.jpg",
                    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/cf/41/9d/img-20180429-123049-largejpg.jpg?w=1200&h=-1&s=1"
                ],
                "rating": 4,
                "statistics": {
                    "noiseLevels": 3,
                    "occupancy": 4,
                    "connectivity": 4.5,
                    "_id": "66056abb634bddec4146daf4"
                }
            }
        ]
    ],
    "message": "Spaces found"
}
 */
export async function filterByAmenities (req,res) {
    const parameters = ['has_outlets', 'has_whiteboards', 'has_screen', 'is_food_beverage_friendly', 'has_printer', 'has_breakout_rooms', 'restrooms', 'seating_type']

    let filters = []
    for (const param of parameters){
        if(req.query[param] !== undefined){
            filters.push({[`amenities.${param}`]: req.query[param]})
        }
    }
    let finRequest = {'$and': filters}

    try {
        const spaces = await Space.find(finRequest, {id:1, name:1, img:1, location:1, rating:1, statistics:1})

        res.status(200).json({
            status: "success",
            data: spaces,
            message: "Spaces found"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error dingus' });
    }
}

//-------------------------------------------------------//
//                    SEARCH QUERIES                     //
//-------------------------------------------------------//
/**
 * @route POST /space/search
 * @desc Fetch a space that matches the name given in the body
 * 
 * @input ADD BODY: json object with the 'name' string to be search-queried for (example below)
 * @inputExample  -- POST http://localhost:5005/space/search
 * @requestBodymm -- { name: "library" }
 * @outputExample -- next comment block
 */
/*
{
    "status": "success",
    "data": [
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -87.632015,
                    41.853783
                ]
            },
            "_id": "660646d6fc4da9f5d39c60e0",
            "id": 2,
            "name": "Chinatown Branch, Chicago Public Library",
            "img": [
                "https://chipublib.bibliocommons.com/events/uploads/images/full/b4c2f1ea58572c02e4ed70cd0bb1a18f/chinatown.jpg",
                "https://map.lisc-cnda.org/static/1134931d9dca124162af89fe4b08a1a3/8e2a4/featured.jpg",
                "https://www.som.com/wp-content/uploads/fly-images/7623/chinatownlibrary_680x510_jonmiller_hedrichblessing_05-1366x1024-c.jpg"
            ],
            "rating": 3.5
        },
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -87.627907,
                    41.877129
                ]
            },
            "_id": "66064779fc4da9f5d39c60e1",
            "id": 3,
            "name": "Harold Washington Library Center, Chicago Public Library",
            "img": [
                "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/b8/2f/4a/winter-garden.jpg?w=1200&h=1200&s=1",
                "https://chipublib.bibliocommons.com/events/uploads/images/full/6314ef45d17ac782240765bc7e5489b8/harold-washington-library-center.jpg",
                "https://chicagoeventvenues.com/wp-content/uploads/2018/08/hwl9.jpg"
            ],
            "rating": 4.6
        },
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    -87.6605,
                    41.8696
                ]
            },
            "_id": "6606dc0b28c41e053b834b26",
            "id": 6,
            "name": "Little Italy Branch, Chicago Public Library",
            "img": [
                "https://www.som.com/wp-content/uploads/fly-images/41715/217138_000_N44_large-scaled-1366x910-c.jpg",
                "https://www.som.com/wp-content/uploads/2017/10/TSLA_SOM-c-Tom-Harris-1_large-1634315655-scaled.jpg",
                "https://www.som.com/wp-content/uploads/fly-images/57996/217138_000_N89_large-1631188551-scaled-1366x920-c.jpg"
            ],
            "rating": 4.6
        }
    ],
    "message": "Spaces fetched successfully!"
}
*/
export async function searchSpace(req, res) {
    try {
        const { name } = req.body;

        const resultSpaces = await Space
        .find({
            'name' : { '$regex' : name, '$options' : 'i'}
        }, {id:1, name:1, img:1, location:1, rating:1});

        res.status(200).json({
            status: "success",
            data: resultSpaces,
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

//-------------------------------------------------------//
//                    ADMIN QUERIES                      //
//-------------------------------------------------------//

/**
 * @route POST /space/add-space-basic
 * @desc Adds a basic space (id, name, desc, coords, address) -- Emily's using this one 
 * @access Public
 * 
 * @input id - id you want to associate the space with
 *              user is logged in
 * @inputExamples -- http://localhost:5005/space/ input json next comment block
 * 
 * @outputExamples -- second comment block
 */
/**
 * {
  "id": 22,
  "name": "Cozy Cafe",
  "desc": "Comfy comfy.",
  "coords": {
    "lat": 40.7128,
    "lon": -74.006
  },
  "address": "123 State Street, Chicago, IL 10001",
  "rating": 4.5,
  "statistics": {
    "noiseLevels": 3,
    "occupancy": 4,
    "connectivity": 4.5
  },
  "reviews": [
    {
      "user": "ayou1",
      "comment": "Smells!",
      "rating": 1
    },
    {
      "user": "nan1",
      "comment": "Could be cozier.",
      "rating": 3
    }
  ],
  "amenities": {
    "has_outlets": false,
    "has_whiteboards": true,
    "has_screen": false,
    "is_food_beverage_friendly": false,
    "has_printer": true,
    "has_breakout_rooms": false,
    "restrooms": false,
    "seating_type": "Individual Seating"
  }
}
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

    const review = await Space.findOneAndUpdate({id: id}, {
        ...req.body
    }, {new: true}) // you can set this to false to return the old document instead

    if (!review){
        return res.status(404).json({error: "No such space"})
    }

    res.status(200).json(review)
}