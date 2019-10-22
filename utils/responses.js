function sendBadResponse({res, message, statusCode, data = []}) {
  res.status(statusCode).json({error: message, data, statusCode});
}
function sendGoodResponse({
  res,
  message,
  statusCode = 200,
  data = []
}) {
  res.status(statusCode).json({message, data});
}
module.exports = {sendBadResponse, sendGoodResponse};
