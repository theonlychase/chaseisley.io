var CommentsCtrl = require('./comments.server.controller');

module.exports = function (app) {

    app.route('/api/users')
        .get(CommentsCtrl.getAllUsers) // get all Users
        .post(CommentsCtrl.postNewUser); // post new User to db
    
    app.route('/api/users/trucks')
        .get(CommentsCtrl.getAllTrucks) // get all Users that contain a Food Truck (truck.truckName)
  
    
    app.route('/api/users/:id')
        .get(CommentsCtrl.getSpecificUser) // get a specific user
        .put(CommentsCtrl.updateSpecificUser) // update a specific User
        .put(CommentsCtrl.updateSpecificUser) // update a specific User
        .delete(CommentsCtrl.deleteSpecificUser); // delete a specific User
        
    app.route('/api/active')
        .get(CommentsCtrl.getActiveTrucks) // get only ACTIVE truck data
            
    app.route('/api/users/truck/:id')
        .get(CommentsCtrl.getOneTruckData) // get data for only one truck
    
    app.route('/api/users/favs/:id')
        .put(CommentsCtrl.addFavorite) // add truck to favorites array
    
    app.route('/api/users/favs/remove/:id')
        .put(CommentsCtrl.removeFavorite) // remove truck from favorites array
};