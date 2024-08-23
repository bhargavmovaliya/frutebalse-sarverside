const { Salespeople } = require("../models");

const listSales = async (req, res) => {
    try {
        const salespeople = await Salespeople.getSales();
        console.log(salespeople);
        res.status(200).json({
            success: true,
            data: salespeople,
            message: "Salespeople data fetched successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        });
    }
};

const insertSales = async (req, res) => {
    try {
        const { sname, city, comm, Active } = req.body;
        const result = await Salespeople.insertSalesperson(sname, city, comm, Active);
        res.status(201).json({
            success: true,
            data: { id: result.id, sname, city, comm, Active },
            message: "Salesperson added successfully"
        });
    } catch (error) {
        console.error("Error adding salesperson:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteSales = async (req, res) => {
    try {
        const { snum } = req.params;
        console.log(snum);
        const result = await Salespeople.deleteSalespeople(snum);
        console.log(result);
        res.status(200).json({
            success: true,
            data: result, 
            message: "Salesperson deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting salesperson:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        });
    }
};

const updateSales = async (req, res) => {
    try {
        const { snum } = req.params;
        const { sname, city, comm, Active } = req.body;
        const result = await Salespeople.updateSalespeople(snum, sname, city, comm, Active);
        res.status(200).json({
            success: true,
            data: result,
            message: "Salesperson updated successfully."
        });
    } catch (error) {
        console.error("Error updating salesperson:", error);
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        });
    }
};

module.exports = {
    listSales,
    insertSales,
    deleteSales,
    updateSales
};
