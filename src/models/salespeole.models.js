const pool = require("../db/mysql");

const getSales = async () => {
    try {
        const [results, field] = await pool.execute("SELECT * FROM salespeople WHERE is_deleted = FALSE");
        console.log(results);
        return results;
    } catch (error) {
        throw new Error("Error getting salespeople: " + error.message);
    }
};


const insertSalesperson = async (sname, city, comm, Active) => {
    try {
        const sql = "INSERT INTO salespeople (sname, city, comm, Active) VALUES (?, ?, ?, ?)";
        const values = [sname, city, comm, Active];
        const [result] = await pool.execute(sql, values);
        console.log("Inserted:", result);
        return { id: result.insertId, sname, city, comm, Active };
    } catch (error) {
        throw new Error("Error inserting salesperson: " + error.message);
    }
};

const deleteSalespeople = async (snum) => {
    try {
        const [result] = await pool.execute("UPDATE salespeople SET is_deleted = TRUE WHERE snum=?", [snum]);
        console.log('Marked salesperson as deleted:', result);
        return result;
    } catch (error) {
        throw new Error("Error marking salesperson as deleted: " + error.message);
    }
};


const updateSalespeople = async (snum, sname, city, comm, Active) => {
    console.log(snum, sname, city, comm, Active);
    try {
        const [result] = await pool.execute("UPDATE salespeople SET sname=?, city=?, comm=?, Active=? WHERE snum=?", [sname, city, comm, Active, snum]);
        console.log(result);
        return result;
    } catch (error) {
        throw new Error("Error updating salespeople: " + error.message);
    }
};

module.exports = {
    getSales,
    insertSalesperson,
    deleteSalespeople,
    updateSalespeople
};
