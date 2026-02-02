// It catches async errors and passes them to Express’s error handler automatically.
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler };