

// const wrapAsync = (fn) => {
//   return function (req, res, next) {
//     fn(req, res, next).catch((err) => {
//       if (res.headersSent) return; // ✅ prevents double response
//       next(err);
//     });
//   };
// };







const wrapAsync = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if (res.headersSent) {
        console.warn("⚠️ Headers already sent, skipping errorHandler");
        return;
      }
      next(err);
    });
  };
};

export default wrapAsync;