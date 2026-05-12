

const getUserProfileByJwt = async (req, res) => {
    try {
        const user = await req.user;
        return res.status(200).json(user);
    } catch (error) {
        handleErrors(error, res)
    }
}

const handleErrors = (error, res) => {
    if(error instanceof Error) {
        return res.status(404).json({message: error.message});
    }

    return res.status(500).json({message: 'Internal Server Error'})
}


module.exports = {
    getUserProfileByJwt,
}
