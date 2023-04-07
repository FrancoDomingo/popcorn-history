const popcorn = require('../db')


const getAllHistory = async (req, res, next) => {
    try {
        const allHistory = await popcorn.query('SELECT * FROM history order by id ASC');
        res.json(allHistory.rows)
    } catch (error) {
        next(error);
    }
}

const getSpecificHistory = async(req, res, next) => {
    try {
        const {id} = req.params
        //let sql = 'SELECT * FROM history WHERE titulo_original LIKE \'%' + title + '%\' OR titulo_secundario LIKE \'%' + title + '%\''        
        let sql = 'SELECT * FROM history WHERE id = ' + id
        const result = await popcorn.query(sql)

        if(result.rowCount === 0){
            return res.status(404).json({
                message: "No se encontró búsqueda."
            })
        }

        res.json(result.rows)

    } catch (error) {
        next(error);
    }
};

const addHistory = async (req, res, next) => {
    try {        
        const { title, altTitle, hType, img, date, description, url } = req.body;
        const result = await popcorn.query(
            'INSERT INTO history (titulo_original, titulo_secundario, history_type, img, fecha, descripcion, url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
            [title, altTitle, hType, img, date, description, url]
        );  

        res.json(result.rows[0])

    } catch (error) {
        next(error);
    }    
}

const updateHistory = async (req, res, next) => {    
    try {
        const {id} = req.params
        const {title, altTitle, hType, img, date, description, url} = req.body
        const result = await popcorn.query(
            'UPDATE history SET titulo_original = $1, titulo_secundario = $2, history_type = $3, img = $4, fecha = $5, descripcion = $6, url = $7 WHERE id = $8 RETURNING *',
            [title, altTitle, hType, img, date, description, url, id]
        );
    
        if(result.rowCount === 0){
           return res.status(404).json({
                message: "Registro no encontrado" 
           }) 
        }    
        return res.json(result.rows[0])
        //mapear campos
    
    } catch (error) {
        next(error);
    }
}

const deleteHistory = async (req, res, next) => {
    try {        
        const {id} = req.params
        const exists = await popcorn.query('SELECT * FROM history WHERE ID = $1', [id])       

        if(exists.rowCount === 0){
            return res.status(404).json({
                message: "No se encontró registro a eliminar"
            })
        }else{
            await popcorn.query('DELETE FROM history WHERE id = $1', [id])
            return res.json(exists.rows[0]);
        }     
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllHistory,
    getSpecificHistory,
    addHistory,
    updateHistory,
    deleteHistory
}