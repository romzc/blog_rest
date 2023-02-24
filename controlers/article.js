const test = (req, res) => {
    return res.status(200).json({
        mensage: "Soy una accion dt test"
    })
}

const curso = (req, res) => {
    return res.status(200).json({hello:" adasd "})
}

module.exports = {test, curso}