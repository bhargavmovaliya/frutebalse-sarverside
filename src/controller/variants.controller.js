
const Variants = require("../models/variants.model");

const listVariants = async (req, res) => {
    try {
        const variants = await Variants.find();
        if (!variants || variants.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Variant data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Variant data fetched",
            data: variants,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const getVariant = async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: "Data not found",
            });
        }``
        res.status(200).json({
            success: true,
            message: "Variant data fetched",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const addVariant = async (req, res) => {
    try {
        const variant = await Variants.create({
            ...req.body,
            variants_img: {
                public_id: fileRes.public_id,
                url: fileRes.url
            }
        });
        res.status(201).json({
            success: true,
            message: "Variant added successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const updateVariant = async (req, res) => {
    try {
        const updatedVariant = await Variants.findByIdAndUpdate(
            req.params.variant_id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedVariant) {
            return res.status(400).json({
                success: false,
                message: "Bad request",
            });
        }
        res.status(200).json({
            success: true,
            message: "Variant updated successfully",
            data: updatedVariant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id);
        if (!variant) {
            return res.status(404).json({
                success: false,
                message: "Variant not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Variant deleted successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

module.exports={
    listVariants,
    getVariant,
    addVariant,
    updateVariant,
    deleteVariant
}