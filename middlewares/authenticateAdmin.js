module.exports = function(req,res,next){
  if(req.fullUser && req.fullUser.isAdmin) return next();
    
    next(new Error('No tienes permiso para estar aquí'));
}