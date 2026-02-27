import customerModel from "../model/customerModel.js";

// To add customer
/**
 * - route /api/customer/add-customer 
 */
export async function createCustomer(req, res) {
    try {
        
        const { name, phoneNumber } = req.body

        //check all fields have data or not
        if (!name || !phoneNumber) {
            return res.status(400).json({
                message: "All fields are required",
                status: "Failed"
            })
        }

        // if user exist
        const isCustomerExist = await customerModel.findOne({ phoneNumber })

        if (isCustomerExist) {
            return res.status(422).json({
                message: "Customer already exists",
                status: "Failed"
            })
        }

        //check number
        if (!/^[0-9]{10}$/.test(phoneNumber)) {
            return res.status(422).json({
                message: "Invalid phone number",
                status: "Failed"
            })
        }

        // add/create customer
        const customer = await customerModel.create({ name, phoneNumber })

        res.status(201).json({
            message: "Customer Added successfully",
            customer,
            status: "Success"
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }

}

// to delete customer record
// DELETE
export async function deleteCustomer(req, res) {
    try {
        const { id } = req.params

        const customer = await customerModel.findByIdAndDelete(id)

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" })
        }

        res.status(200).json({ message: "Customer deleted" })

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

// export async function updateCustomer(req, res) {
//    try {
//         const {id} = req.param
//    } catch (error) {
    
//    }
// }




