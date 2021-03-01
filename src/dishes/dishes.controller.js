const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
function dishExists(req, res, next) {
    const { dishId } = req.params
    const foundDish = dishes.find((dish) => dish.id === dishId);
    if(foundDish === undefined){
        next({
            status: 404,
            message: [`Dish id not found: ${dishId}`]
        })
    }
    res.locals.dish = foundDish;
    next();
}
function hasName(req, res, next) {
    const {data: { name } = {} } = req.body;
    if(name){
        next();
    }
    next({
        status: 400,
        message: `A "name" property is required`
    })
}
function hasDescription(req, res, next){
    const { data: { description } = {} } = req.body;
    if(description){
        next();
    }
    next({
        status: 400,
        message: `A 'description' property is required`
    })
}
function hasImageUrl(req, res, next) {
    const { data: { image_url } = {} } = req.body;
    if(image_url){
        next();
    }
    next({
        status: 400,
        message: `A 'image_url' property is required`
    })
}
function hasPrice(req, res, next){
    const { data: { price } = {} } = req.body;
    if(!price || price == "17"  || price <= 0 ) {
        next({
            status: 400,
            message: `A 'price' property is required`
        })
    }
    next();
}
// function nonMatchId(req, res, next){
//     const {dishId} = req.params;
//     const { data: {id} = {} } = req.body;
//     if(id === dishId){
//         next()
//     }
//     next({
//         status: 400,
//     });
// }

function list(req, res) {
    res.json({ data: dishes})
};


function create(req, res) {
    const { data: { id, name, description, price, image_url } = {} } = req.body;
    const newDish = {
        id: nextId(),
        name,
        description,
        price,
        image_url,
    }
    dishes.push(newDish);
    res.status(201).json({ data: newDish });
}

function read(req, res) {
    dish = res.locals.dish;
    res.json({ data: dish})
};

function update(req, res, next) {
    const {dishId} = req.params;
    const dish = res.locals.dish;
    const originalId = dish.id;
    const { data: { id, name, description, price, image_url } = {} } = req.body;
    
    
    dish.id = id;
    dish.name = name;
    dish.description = description;
    dish.price = price;
    dish.image_url = image_url;
    
    res.json({ data: { id, name, description, price, image_url } })
}

module.exports = {
    list,
    read: [dishExists, read],
    create: [ hasName, hasDescription, hasPrice, hasImageUrl,  create ],
    update: [ dishExists, hasName, hasDescription, hasImageUrl, hasPrice,  update,  ],
    dishExists,
}